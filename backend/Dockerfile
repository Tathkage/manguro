# Use official Node.js image as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon  # Install nodemon globally

# Copy the rest of the application
COPY . .

# Expose the backend port
EXPOSE ${BACKEND_PORT}

# Start the backend server with nodemon for live reload
CMD ["nodemon", "index.js"]
