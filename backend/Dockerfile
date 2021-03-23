# Dockerfile for React client

FROM node:14.16.0-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local files to app folder
COPY . .

# Listen for the node server at port 4000
EXPOSE 4000

# Set the env variable
ENV MONGO_URL="mongodb://root:example@mongo:27017/employees?authSource=admin"

CMD ["npm", "start"]