#!/bin/bash

set -e

echo "***********************************"
echo "Deploying FRONTEND"
echo "***********************************"

cd ~/deploy || exit 1

echo "Pulling frontend image..."
docker compose pull frontend

echo "Starting frontend..."
docker compose up -d frontend

echo "Pruning unused images..."
docker image prune -f

echo "***********************************"
echo "Frontend deployment complete"
echo "***********************************"