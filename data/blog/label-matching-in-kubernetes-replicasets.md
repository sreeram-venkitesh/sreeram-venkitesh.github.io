---
title: "Label matching in ReplicationControllers and ReplicaSets"
summary: "Understanding how ReplicaSets work in Kubernetes"
tags: ["kubernetes","software-engineering" ]
draft: false
date: "2024-09-06"
---

ReplicationController was the legacy API for managing multiple replicas of Pods. ReplicaSets and Deployments replaced the ReplicationController.

While learning about these three resources and how they work, I made an interesting observation.

ReplicationControllers and ReplicaSets manage a group of Pods based on the labels of the Pods. This means that if you create a Pod manually with the same label that the ReplicaSet is tracking, the ReplicaSet would count the new manually created Pod to its total Pod count as well. This doesn't happen with ReplicaSets managed by Deployments however.

We can demonstrate this by creating a ReplicaSet like so:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-replicaset
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21.6
        ports:
        - containerPort: 80
```

Once you apply this ReplicaSet to your cluster, you'll have 3 Pods running with the nginx image. Now if you manually create a 4th nginx Pod with the same label of `app: nginx`, the ReplicaSet's current count will be 4 instead of 3. The ReplicaSet controller will then delete the newly created Pod to bring down the total count to 3 as well.

You can create the 4th Pod manually with the following manifest:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-manual-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
	image: nginx:1.21.6
	ports:
	- containerPort: 8
```

A good way to observe this behaviour is to use `kubectl get` with the watch flag, `-w`. Notice how the ReplicaSet shows a current count of 4, after which the newly created Pod is terminated. This is done by the ReplicaSet controller to match the current count with the desired count of Pods as defined in the ReplicaSet. The ReplicaSet controller looks at all the Pods with the label defined in the ReplicaSet spec. 

![Terminal output of running teh above commands](/static/images/replication/terminal-output.png)

Reading further about this topic I realized that this behaviour is described in the official documentation for ReplicaSets [here](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/#non-template-pod-acquisitions).

ReplicaSets doesn't support rolling updates on their own. For this we need to use Deployments. We can delete a ReplicaSet without deleting the Pods associated with the ReplicaSet by passing `--cascade=orphan` option when deleting the ReplicaSet. We can create another ReplicaSet which would track these Pods after the original one is deleted. We just need to use the same selector that we had used with the original ReplicaSet. This however does not do anything to update the older Pods with the new spec that the new ReplicaSet might have. This is because ReplicaSets do not support rolling updates. We need to do the update manually. Deployments on the other hand do this on their own and makes things easy for us.
