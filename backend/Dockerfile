FROM node:20-alpine

WORKDIR /app

# Copy package descriptors and install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy source code and data files
COPY . .

# Set default environment variables
ENV PORT=5000 \
    NODE_ENV=production

# Expose backend API port
EXPOSE 5000

# Healthcheck on Express API
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/v1/health || exit 1

# Launch backend application
CMD ["npm", "start"]
