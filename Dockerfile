# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install Prism CLI globally
RUN npm install -g @stoplight/prism-cli

# Copy the OpenAPI specification and components into the container
COPY openapi.yaml .
COPY components/ ./components/

# Expose the default port Prism runs on
EXPOSE 4010

# Command to start the Prism mock server in dynamic mode
CMD ["prism", "mock", "openapi.yaml", "-d"]