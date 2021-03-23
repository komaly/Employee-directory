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

# Listen for the react server at port 3000
EXPOSE 3000

# Set the env variable
ENV REACT_APP_NODE_URL="http://localhost:4000/employees"

CMD ["npm", "start", "--legacy-peer-deps"]