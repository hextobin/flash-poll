# Use an official Node runtime as a base image
FROM node:18

# Create and set the working directory
WORKDIR /usr/flash-poll

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]
