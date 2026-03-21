# Stage 1: Build React App
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# install npm packages
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

# Expose port 80
EXPOSE 80

# Labels for metadata
LABEL maintainer="Michael Antoni michaelantoni.tech@gmail.com"
LABEL version="1.0.0"
LABEL description="e-shop MERN Stack Project"

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]



# build image and inject env to build time note 
# docker build --build-arg REACT_APP_API_URL=<BACKEND_URL/api> --build-arg REACT_APP_STORE_API=https://fakestoreapi.com/products -t michael0221/eshop-mern-frontend:latest .

# push the image to Docker Hub
# docker push <dockerhub-name>/<app-name>:latest