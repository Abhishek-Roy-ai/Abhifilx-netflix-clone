# Stage 1: Build React application with Vite
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Accept build arguments for Vite environment variables
ARG VITE_API_BASE_URL=http://localhost:5000/api/v1
ARG VITE_TMDB_API_KEY=76ac5f7a345a3387df49e85db5230b29
ARG VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

# Pass build args to build environment
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY \
    VITE_TMDB_BASE_URL=$VITE_TMDB_BASE_URL

# Build static bundle
RUN npm run build

# Stage 2: Serve static files using Nginx
FROM nginx:1.25-alpine

# Copy built dist files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
