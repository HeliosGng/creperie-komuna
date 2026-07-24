# Use official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and dependency lock files first (for better caching)
COPY package*.json ./

# Install ALL dependencies (including devDependencies needed for Vite to build)
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Vite React frontend into the /dist folder
RUN npm run build

# Set Node environment to production
ENV NODE_ENV=production

# Expose port 8080 (the default port Google Cloud Run expects)
EXPOSE 8080

# Start the Express server using the start script
CMD ["npm", "run", "start"]
