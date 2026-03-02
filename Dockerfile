# =========================
# Stage 1: Build React App
# =========================

# Use Node 20 LTS Alpine for a lightweight, stable build environment
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# - Allows Docker to cache npm install if dependencies don't change
RUN echo "Copying package.json and installing dependencies..."
COPY package*.json ./

# Install all dependencies required to build the React app
RUN npm install
RUN echo "Dependencies installed."

# Copy the rest of the source code into the container
RUN echo "Copying React source code..."
COPY . .

# Build the React app for production
# - Output will go into /app/build
RUN echo "Building React app for production..."
RUN npm run build
RUN echo "React build completed."

# =========================
# Stage 2: Serve with Nginx
# =========================

# Use lightweight Nginx image for serving static files
FROM nginx:alpine

# Copy the build output from the previous stage into Nginx's HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Inform Docker the container listens on port 80
EXPOSE 80

# Add a simple health-check script to confirm Nginx is serving files
# - Prints a message every 5 seconds, useful for logs
RUN echo 'while true; do echo "React app is ready and served by Nginx"; sleep 5; done &' >> /usr/share/nginx/html/healthcheck.sh && \
    chmod +x /usr/share/nginx/html/healthcheck.sh

# Start Nginx in the foreground and run the health-check script
# - 'daemon off;' keeps Nginx in the foreground (required for Docker)
# - The health-check script runs in the background and logs to stdout
CMD ["sh", "-c", "/usr/share/nginx/html/healthcheck.sh && nginx -g 'daemon off;'"]