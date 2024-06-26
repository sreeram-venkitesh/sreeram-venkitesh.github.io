---
title: Understanding Kubernetes internals by building your own cluster
summary: Blog version of my talk at Kubernetes Community Days Kerala, 2024
draft: false
date: 2024-02-03
tags:
  - kubernetes
  - devops
---

# Introduction

This is the blog post version of the talk I gave at [Kubernetes Community Day Kerala](https://kcdkerala.in). I will add the video to the talk here once its up. 

Learning how Kubernetes works internally can be a highly rewarding exercise. It will make you more confident since the different components of Kubernetes are no longer a black box. Building and running Kubernetes locally is also the first step if you want to contribute to the Kubernetes code base. In this post, we go over how to setup a very minimal Kubernetes cluster in an AWS EC2 VM.

# Initial setup

Make sure you have essential toold like `curl`, `tmux` and anything else you might wanna use already installed.

Download and install kubectl

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Download the binaries for the Kubernetes components, `kube-apiserver`, `kube-controller-manager`, `kube-scheduler` and `kubelet`.

```bash
# Download the kube-apiserver binary
curl -LO "https://dl.k8s.io/v1.29.1/bin/linux/amd64/kube-apiserver"

# Download the kube-controller-manager binary
curl -LO "https://dl.k8s.io/v1.29.1/bin/linux/amd64/kube-controller-manager"

# Download the kube-scheduler binary
curl -LO "https://dl.k8s.io/v1.29.1/bin/linux/amd64/kube-scheduler"

# Download the kubelet binary
curl -LO "https://dl.k8s.io/v1.29.1/bin/linux/amd64/kubelet"
```

Download and install etcd

```bash
ETCD_VER=v3.4.29
GITHUB_URL=https://github.com/etcd-io/etcd/releases/download
DOWNLOAD_URL=${GITHUB_URL}

mkdir etcd
curl -L ${DOWNLOAD_URL}/${ETCD_VER}/etcd-${ETCD_VER}-linux-amd64.tar.gz -o etcd-${ETCD_VER}-linux-amd64.tar.gz
tar xzvf etcd-${ETCD_VER}-linux-amd64.tar.gz -C etcd --strip-components=1
rm etcd-v3.4.29-linux-amd64.tar.gz
```

Next we will setup the certificates needed to run the `kube-apiserver` locally. Using these certificates, we're also gonna setup the `kubeconfig` file which we'll use to interact with the cluster. I referred to [this article](https://nakamasato.medium.com/run-kubernetes-api-server-locally-64d56f6299ff) written by [Masato Naka](https://nakamasato.medium.com/) for preparing the certificates.

```bash
mkdir certs
cd certs

cat <<EOF >> csr.conf
[ req ]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[ dn ]
C = IN
ST = Kerala
L = Kochi
O = BB
OU = BB
CN = 127.0.0.1

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = kubernetes
DNS.2 = kubernetes.default
DNS.3 = kubernetes.default.svc
DNS.4 = kubernetes.default.svc.cluster
DNS.5 = kubernetes.default.svc.cluster.local
IP.1 = 127.0.0.1
IP.2 = 127.0.0.1

[ v3_ext ]
authorityKeyIdentifier=keyid,issuer:always
basicConstraints=CA:FALSE
keyUsage=keyEncipherment,dataEncipherment
extendedKeyUsage=serverAuth,clientAuth
subjectAltName=@alt_names
EOF

# Create the service accounts
openssl genrsa -out service-account-key.pem 4096
openssl req -new -x509 -days 365 -key service-account-key.pem -subj "/CN=test" -sha256 -out service-account.pem

# Certificates for kube-apiserver
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -subj "/CN=test" -days 10000 -out ca.crt
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -config csr.conf
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key \
    -CAcreateserial -out server.crt -days 10000 \
    -extensions v3_ext -extfile csr.conf

# Generating kubeconfig
kubectl config set-cluster local-apiserver \
  --certificate-authority=certs/ca.crt \
  --embed-certs=true \
  --server=https://127.0.0.1:6443 \
  --kubeconfig=kubeconfig

kubectl config set-credentials admin \
  --client-certificate=certs/server.crt \
  --client-key=certs/server.key \
  --embed-certs=true \
  --kubeconfig=kubeconfig

kubectl config set-context default \
  --cluster=local-apiserver \
  --user=admin \
  --kubeconfig=kubeconfig

kubectl config use-context default --kubeconfig=kubeconfig

mkdir /root/.kube
mv kubeconfig /root/.kube/config
```

# Getting the cluster up and running

Start the etcd server with the following command

```bash
./etcd/etcd
```

Start the kube-apiserver with the following command. Notice that we're passing in the etcd server url as well as the certificates we generated.

```bash
./kube-apiserver --etcd-servers http://localhost:2379 \
--service-account-key-file=certs/service-account-key.pem \
--service-account-signing-key-file=certs/service-account-key.pem \
--service-account-issuer=api \
--tls-cert-file=certs/server.crt \
--tls-private-key-file=certs/server.key \
--client-ca-file=certs/ca.crt
```

At this point if you run `kubectl create deployment nginx --image=nginx`, the Deployment will get created. The ReplicaSet won't be created at this point however. For this we need to start the kube-controller-manager

Start the kube-controller-manager with the following

```bash
./kube-controller-manager --kubeconfig=/root/.kube/config  
```

Now if you do `kubectl get all`, you can see that the ReplicaSet is created and the pods of your deployment are stuck in `Pending` state. This is because we don't have a kube-scheduler running that would schedule the pods to a node. We don't have a node either for that matter. Let's see how we can set these up.

Start the kube-scheduler like so

```bash
./kube-scheduler --kubeconfig=/root/.kube/config 
```
At this point, if you describe your pods, you can see that it says `FailedScheduling`. This is because we don't have a proper node. You can run `kubectl get nodes` and see that the node, aka the machine you're running all of this on will be listed, but the status will be `NotReady`. To fix this we can start a container runtime and start the kubelet process.

Run containerd

```bash
containerd
```

Now, start the kubelet

```bash
./kubelet --kubeconfig=kubeconfig
```

Now you can run `kubectl get nodes` again and you can see that the Node is shown as `Ready`. At this point your Pod would also be running if everything goes well.

# Common errors you might face

**Debugging issues with CNI**

You will probably face issues with CNI when setting up containerd and kubelet for the first time. If CNI is not configured properly, you might get a bunch of errors from containerd and kubelet. The Pods will be scheduled and will go into `ContainerCreating` state, but the container won't actually start because of the absence of CNI. I'm not entirely sure how CNI works. I plan to learn more about this and I'll write about what I learn here.

I installed flannel CNI 

```bash
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

**Installing CNI packages**

If you face any errors with CNI packages while running containerd, first confirm if the packages are present in the `/opt/cni/bin` directory. If not, you can download and install them like so:

```bash
sudo mkdir -p /opt/cni/bin
curl -LO https://github.com/containernetworking/plugins/releases/download/v0.8.3/cni-plugins-linux-amd64-v0.8.3.tgz
sudo tar -xvf cni-plugins-linux-amd64-v0.8.3.tgz -C /opt/cni/bin/
```

**Installing iptables**

If your containerd logs says something along the lines of the following, you probably don't have the `iptables` package installed in your machine. Try installing iptables and restarting `containerd` and `kubelet`.

```
Failed to destroy network for sandbox. Neither iptables nor ip6tables usable
```

---

This blog post is still evolving! I'm still learning about things like CNI etc. and I'll be continuing to update this blog post as I do. If you want to get updates on when the post is updated, you can follow me on X at [@sreeramvnkitesh](https://twitter.com/sreeramvnkitesh).



