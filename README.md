# 🧑‍💻 FlyWP DNS Portal

This is a simple DNS portal for FlyWP that allows you to manage your DNS records for your FlyWP apps.

## Installation and Setup Laravel App Running

1. Clone the repository
2. Change into the working directory
3. `cd apps/dns-portal`
4. Install composer dependencies
5. `composer install`
6. Copy the `.env.example` file to `.env`
7. Generate a new application key
8. `php artisan key:generate`
9. Setup the database connection in the `.env` file
10. Run the migrations
11. `php artisan migrate`
12. Run the server
13. `php artisan serve`
14. Visit the site at `http://localhost:8000`

## Installation Node Dependencies and Build

1. After completing the above steps, you can now build the frontend assets by following the steps below.
2. Change into the working directory if you are not already in the `root` directory.
3. `pnpm install`
4. `pnpm run build`

## Run SSH Socket Server

1. `pnpm run ssh:start`

## Setup ENV Variables

- `REVERB_APP_KEY` - The APP key to laravel reverb
- `REVERB_APP_SECRET` - The APP secret to laravel reverb
- `REVERB_HOST` - "localhost"
- `REVERB_PORT` - 8080
- `REVERB_SCHEME` - http or https
- `CLOUDFLARE_DNS_TOKEN` - Cloudflare API Token (DNS Edit)
