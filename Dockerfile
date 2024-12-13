# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate the combined OpenAPI spec and types
RUN npm run generate:api

# Validate types
RUN npm run test:types

# Expose the default port Prism runs on
EXPOSE 4010

# Command to start the Prism mock server in dynamic mode, listening on 0.0.0.0
CMD ["npx", "prism", "mock", "-h", "0.0.0.0", "openapi.combined.yaml", "-d"]