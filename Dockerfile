# =========================
# Stage 1: Build React App
# =========================
FROM node:20-alpine AS build

WORKDIR /app

# =========================
# Build-time arguments (IMPORTANT)
# =========================
ARG REACT_APP_API_URL
ARG REACT_APP_STORE_API

# Convert to environment variables for React build
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_STORE_API=$REACT_APP_STORE_API

# =========================
# Install dependencies
# =========================
COPY package*.json ./
RUN npm install

# =========================
# Copy source code
# =========================
COPY . .

# =========================
# Build React app
# =========================
RUN npm run build


# =========================
# Stage 2: Serve with Nginx
# =========================
FROM nginx:alpine

# Clean default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

# SPA routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

LABEL maintainer="Michael Antoni michaelantoni.tech@gmail.com"
LABEL version="1.0.0"
LABEL description="e-shop MERN Stack Project"

CMD ["nginx", "-g", "daemon off;"]


# build image and inject env to build time note 
# docker build --build-arg REACT_APP_API_URL=<BACKEND_URL/api> --build-arg REACT_APP_STORE_API=https://fakestoreapi.com/products -t michael0221/eshop-mern-frontend:latest .

# push the image to Docker Hub
# docker push <dockerhub-name>/<app-name>:latest