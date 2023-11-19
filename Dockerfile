# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json to the working directory
COPY package.json /app

# Install app dependencies
RUN npm install

# Copy the application code into the container
COPY . /app

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "server.js"]
