# Base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package*.json ./
RUN pnpm install

# Copy application files
COPY . .

# Build the application
RUN pnpm run build

# Expose port and start the application
EXPOSE 3000
CMD ["node", "build/index.js"]
