---
title: "Layer 4 load balancing and TLS termination on Kubernetes"
summary: "Some notes on StartTLS, exposing PostgreSQL databases outside Kubernetes clusters at the TCP layer and TLS termination"
tags: ["software engineering", "devops", "kubernetes"]
draft: false
date: "2024-04-03"
---

Computer networking is always intriguing to me. Kubernetes networking has been one of my favourite topics to hack around with. This post is a collection of my notes about layer 4 load balancing, TLS termination in Kubernetes and how the PostgreSQL TLS handshake works.

## Exposing Services at the TCP level

If you want to make a TCP connection to a Pod running in your Kubernetes cluster from outside the cluster, you can expose it either as a `LoadBalancer` or a `NodePort` Service. LoadBalancer would give you an external URL, with which you can connect to whatever port you have exposed. If you have a PostgreSQL database running on Kubernetes on AWS EKS and have exposed it as a LoadBalancer it would look something like the following. Here we're using `psql` client to connect to the database. `psql` creates a TCP connection through our LoadBalancer's URL.

```yaml
# Create a LoadBalancer Service exposing your database
---
apiVersion: v1
kind: Service
metadata:
  name: postgresql-database
spec:
  selector:
    app: postgresql-db
  ports:
    - port: 5432
      targetPort: 5432
  type: LoadBalancer

# Connect to the LoadBalancer's URL using a PostgreSQL client
psql postgres://username:password@af13e5a4f95-fake-aws-url.us-east-1.elb.amazonaws.com:5432/postgres
```

You can also use a `NodePort` Service, which would expose a port in each of the nodes of the cluster. This works totally fine if you want to expose a handful of Deployments. You'll start facing bottlenecks when you want to scale this setup to accommodate hundreds or thousands of databases. In the case of LoadBalancers you'd have to pay your cloud provider for the resource. There could also be limits on the number of LoadBalancers you can create based on your cloud provider. For example, AWS has a [region specific limit](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-limits.html) on the number of application load balancers you can create. Basically only 50 load balancers can be created per region by default, after which you'd have to request for a limit increase I believe. If you're working with NodePorts, you'd mostly have to work with the default range of ports from 30000-32767. You can create 2768 NodePort services per cluster, if you haven't configured a higher limit while setting up your cluster. If you built your own cluster you would be able to expand this to whatever range that is supported by your firewall/networking configuration. But I haven't done something like this yet. The cluster I work with most of the time is the cluster we use for [neetodeploy.com](https://neetodeploy.com), which is running on AWS EKS.

## Traefik's TCP Router and the IngressRouteTCP CRD

For exposing our regular web applications, we use an ingress controller to manage our ingress traffic through a single load balancer. We were running [nginx ingress](https://docs.nginx.com/nginx-ingress-controller/) initially but later switched to [Traefik Proxy](https://traefik.io/traefik/). With these, we are able to route all the traffic to all the different apps hosted in neetoDeploy through a single application load balancer in AWS. An IngressRoute in Traefik would describe the hostname that we want to expose the application at, and the Service and the port to which the request should be routed to. All of this takes place at layer 7. While I first started going down this rabbit hole of layer 4 Services, I came across the [IngressRouteTCP](https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/#kind-ingressroutetcp) resource, a CRD implementation of Traefik's [TCP Router](https://doc.traefik.io/traefik/routing/routers/#configuring-tcp-routers). This was promising for exposing PostgreSQL databases since I could create an IngressRouteTCP for each database, similar to how I'd create an IngressRoute for each web application.

After some hacking around I was able to add a PostgreSQL entrypoint in Traefik which exposes port 5432 and create an IngressRouteTCP rule which would hopefully let me create a TCP connection to the right PostgreSQL service. The IngressRouteTCP accepted a `HostSNI` field, where I have a url like `db-1.neetodeployapp.com`, hoping to expose my database at this URL. I was able to expose PostgreSQL this way, but I wasn't able to connect to the database for some reason.

## SNI and the StartTLS handshake

Configuring SNI for exposing PostgreSQL databases was tricky since PostgreSQL uses the StartTLS protocol to establish TLS connections. Traefik needs to support the StartTLS handshake for you to be able to use it to expose PostgreSQL databases outside the cluster by multiplexing them over a single load balancer. SNI is required to route the traffic to the correct database since we don't have any information about the hostname of the database in our request otherwise. This is not required if each database is exposed with a LoadBalancer or a NodePort. In these cases, each database would be mapped to an external URL or an external URL + port pair. SNI is however required when we want to multiplex connections to multiple databases over a single 

The thing with PostgreSQL is that it performs a StartTLS handshake when a connection is being established. The handshake has to be completed before PostgreSQL sends a TLS header back to the client. Traefik has added support for StartTLS for handling PostgreSQL connections in [this PR](https://github.com/traefik/traefik/issues/7507), and it'll be released in Traefik v3. I haven't been able to test this out properly with the v3 release candidate builds since I'd also have to update all our existing IngressRoutes from v2 to v3 in the process. I'm looking forward to try this out later this year though. If Traefik's SNI support works out of the box, then its the perfect solution.

## The Kubernetes Gateway API and how it handles TLS termination

I've recently been exploring the [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/) and was pleasantly surprised to see that they have `TLSRoute` and `TCPRoute` route resources for handling layer 4 ingress, similar to the `HTTPRoute` resource they have for layer 7 ingress. The wonderful folks over at the [#sig-network-gateway-api](https://kubernetes.slack.com/archives/CR0H13KGA) channel in the [Kubernetes Slack](https://communityinviter.com/apps/kubernetes/community) were also really helpful and answered all the questions I had.

The Gateway API handles TLS from the client to the load balancer and from the load balancer to the Service separately. As per the Gateway API documentation [here](https://gateway-api.sigs.k8s.io/guides/tls/), TLSRoutes only supports TLS Passthrough right now and the TLS from the client is not terminated at the Gateway or the load balancer level. It is instead passed through the load balancer unencrypted to the Service. For all the other Routes, the TLS is terminated at the Gateway and for the upstream TLS (from the Gateway to the Service) can be configured using BackendTLSPolicy.

I was able to expose my PostgreSQL database using a TCPRoute successfully. I created a Gateway, which provisions an application load balancer in AWS and on each Gateway I'm able to expose upto port 65536. This is much better than being able to expose only 2768 ports with NodePort Services. The only catch would be that each addon would have its own unique port, and once I've ran out of ports on a particular Gateway I'll have to handle creating a new Gateway and switch to that.

I also tried using TLSRoutes and not terminating the TLS at the gateway to be able to multiplex connections to all the databases through a single port of a single load balancer. This approach lets us configure SNI in the TLSRoute and route the request to the correct database using SNI. I was able to configure everything properly, but still wasn't able to successfully create the connection to the database from my client, probably because of the StartTLS handshake not being handled properly in the Gateway API implementation I used (I tried this using Envoy). I could've used Traefik again, but Traefik only supports v0.4.0 of the Gateway API as of now, and TLSRoute and TCPRoutes are not fully supported in Traefik's implementation of the Gateway API yet.

I'm still learning about Gateway API and TLS and networking in general. I'm pretty sure that I have a lot of unknown unknowns and gaps in my mental models. I will definitely catch up with this topic again in a future blog post.