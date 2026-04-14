# Stage 1: Build the Vite React application
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies first for caching layers
COPY package*.json ./
RUN npm ci

# Copy the rest of the files and build
COPY . .
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration for a Single Page App
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 for Google Cloud Run
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
