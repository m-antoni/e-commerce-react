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

echo "Saving frontend logs..."
LOGDIR=~/deploy/frontend/logs
mkdir -p "$LOGDIR"
docker logs mern-frontend > "$LOGDIR/frontend_$(date +%Y%m%d_%H%M%S).log" 2>&1

echo "Pruning unused images..."
docker image prune -f

echo "***********************************"
echo "Frontend deployment complete"
echo "***********************************"