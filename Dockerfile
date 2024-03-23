# Use an official Node.js runtime as the base image
FROM node:19-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

COPY . .

CMD ["yarn", "start"]
