# Use an official Node.js runtime as the base image
FROM node:19-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Run the build command
RUN yarn build

# Define the command to start your application
CMD ["yarn", "start"]
