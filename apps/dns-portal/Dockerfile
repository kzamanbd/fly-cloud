# Base image for PHP and Node.js
FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    nodejs \
    npm

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy existing application directory contents
COPY . .

# Install PHP dependencies
RUN composer install

# Install pnpm
RUN npm install -g pnpm

# Install Node.js dependencies
RUN pnpm install

# Build assets
RUN pnpm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage
RUN chown -R www-data:www-data /var/www/html/bootstrap/cache

# Copy .env.example to .env
RUN cp .env.example .env

# Generate application key
RUN php artisan key:generate


# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
