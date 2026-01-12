# Use Node.js 18 slim as base image (resolves DNS/SRV issues found on Alpine)
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose port (default for the backend)
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
