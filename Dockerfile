# Stage 1: Build React App
FROM node:20-alpine AS build
WORKDIR /app

# Accept build arguments
ARG REACT_APP_API_URL
ARG REACT_APP_STORE_API

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_STORE_API=$REACT_APP_STORE_API

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy React build
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config to enable SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


########################################
# Deploy in render.com
########################################

# build image and inject env to build time note 
# docker build --build-arg REACT_APP_API_URL=<BACKEND_URL/api> --build-arg REACT_APP_STORE_API=https://fakestoreapi.com/products -t michael0221/eshop-mern-frontend:latest .

# push the image to Docker Hub
# docker push <dockerhub-name>/<app-name>:latest