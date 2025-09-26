# Digital Ecosystem API Platform

This project demonstrates a microservices‑based API platform deployed on Kubernetes, with CI/CD via GitHub Actions and Infrastructure as Code using Terraform.

## Stack

* Node.js (Express) microservices
* MongoDB (optional) or in-memory storage
* JWT authentication
* API Gateway (Express + http-proxy-middleware)
* Docker & Docker Compose
* Kubernetes (manifests under `k8s/`)
* Terraform (under `terraform/`)
* GitHub Actions CI/CD (`.github/workflows/ci-cd.yml`)

## Prerequisites

* Docker & Docker Compose
* kubectl & a Kubernetes cluster (e.g., kind, Minikube, EKS)
* Terraform >=1.4
* Node.js >=18 (for local development)

## Quick Start (Local)

```bash
# Clone the repo
git clone <your_repo_url>
cd digital-ecosystem-api-platform

# Copy env template
cp .env.example .env

# Start all services
docker compose up --build
```

The gateway will be available at `http://localhost:8080`.

## Endpoints

* `POST /auth/register` → create user  
* `POST /auth/login` → returns JWT token  
* `GET /data/items` → list items (requires Authorization header)  
* `POST /data/items` → create item  

## Kubernetes Deploy

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/
```

## Terraform

The `terraform/` folder contains example configuration to provision an EKS cluster.
Fill in the variables and run:

```bash
terraform init
terraform apply
```

## CI/CD

The GitHub Actions workflow builds and pushes container images to GHCR
and deploys manifests to your cluster on pushes to `main`.

Set the following repository secrets:

* `GHCR_PAT` – GitHub token with `packages:write`
* `KUBE_CONFIG` – base64‑encoded kubeconfig
