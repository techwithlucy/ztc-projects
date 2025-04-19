# Use Node.js as base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install simple server to serve static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "build", "-l", "3000"]
