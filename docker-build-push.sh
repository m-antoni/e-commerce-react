#!/bin/bash

set -e

# =========================
# CONFIGURATION
# =========================
DOCKER_USERNAME="michael0221"
IMAGE_NAME="eshop-mern-frontend"

# Version tag (git commit hash)
TAG=$(git rev-parse --short HEAD)

FULL_IMAGE="$DOCKER_USERNAME/$IMAGE_NAME:$TAG"
LATEST_IMAGE="$DOCKER_USERNAME/$IMAGE_NAME:ec2"

# =========================
# FRONTEND ENV (BUILD TIME)
# =========================
REACT_APP_API_URL="/api"
REACT_APP_STORE_API="https://fakestoreapi.com/products"

# =========================
# LOGIN TO DOCKER HUB
# =========================
echo "Logging in to Docker Hub..."
docker login -u "$DOCKER_USERNAME"

# =========================
# BUILD IMAGE LOCALLY (WITH ENV)
# =========================
echo "Building Docker image with build args..."

docker build \
  --build-arg REACT_APP_API_URL="$REACT_APP_API_URL" \
  --build-arg REACT_APP_STORE_API="$REACT_APP_STORE_API" \
  -t "$FULL_IMAGE" .

# =========================
# TAG IMAGE
# =========================
docker tag "$FULL_IMAGE" "$LATEST_IMAGE"

# =========================
# PUSH TO DOCKER HUB
# =========================
echo "Pushing versioned image..."
docker push "$FULL_IMAGE"

echo "Pushing latest image..."
docker push "$LATEST_IMAGE"

echo "Push complete."

# =========================
# CLEANUP LOCAL DOCKER IMAGES
# =========================
echo "Cleaning up local Docker images..."

docker rmi "$FULL_IMAGE" || true
docker rmi "$LATEST_IMAGE" || true

docker image prune -f

echo "Cleanup complete. Local Docker space freed."