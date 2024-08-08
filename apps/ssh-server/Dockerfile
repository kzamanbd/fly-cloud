# Base Image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy Express app
COPY . .

# Install Node.js dependencies using pnpm
RUN npm install -g pnpm && pnpm install

# Expose port
EXPOSE 3000

# Start the app
CMD ["pnpm", "app:dev"]
