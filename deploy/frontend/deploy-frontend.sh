#!/bin/bash

set -e

echo "***********************************"
echo "Deploying FRONTEND"
echo "***********************************"

cd ~/deploy/frontend || exit 1

echo "Removing old frontend container..."
docker rm -f mern-frontend 2>/dev/null || true

echo "Pulling frontend image..."
docker compose --project-name mern pull frontend

echo "Starting frontend..."
docker compose --project-name mern up -d frontend
docker compose --project-name mern up -d dozzle

echo "Saving frontend logs..."
LOGDIR=~/deploy/frontend/logs
mkdir -p "$LOGDIR"
docker logs mern-frontend > "$LOGDIR/frontend_$(date +%Y%m%d_%H%M%S).log" 2>&1

echo "Pruning unused images..."
docker image prune -f

echo "***********************************"
echo "Frontend deployment complete"
echo "***********************************"