# Use official Node.js image as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port (use a variable in the docker-compose file)
EXPOSE ${FRONTEND_PORT}

# Start the development server for live reload
CMD ["npm", "run", "dev"]
