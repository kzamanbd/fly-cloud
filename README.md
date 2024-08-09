# 🧑‍💻 FlyWP DNS Portal

This is a simple DNS portal for FlyWP that allows you to manage your DNS records for your FlyWP apps.

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18.x or higher
- NPM 8.x or higher
- pnpm 6.x or higher
- MySQL 5.7 or higher
- Required PHP Extensions
  - BCMath
  - Ctype
  - Fileinfo
  - JSON
  - Mbstring
  - OpenSSL
  - PDO
  - Tokenizer
  - XML
  - GD
  - Zip

- Or Full Laravel Requirements [here](https://laravel.com/docs/8.x/deployment#server-requirements)

## Installation and Setup Laravel App Running

1. Clone the repository
2. Change into the working directory
3. `cd apps/dns-portal`
4. Install composer dependencies
5. `composer install or composer update`
6. Copy the `.env.example` file to `.env`
7. Generate a new application key
8. `php artisan key:generate`
9. Setup the database connection in the `.env` file
10. Run the migrations
11. `php artisan migrate`
12. Run the server
13. `php artisan serve --port=8001`
14. Visit the site at `http://localhost:8001`

## Installation Node Dependencies and Build

1. After completing the above steps, you can now build the frontend assets by following the steps below.
2. Change into the working directory if you are not already in the `root` directory.
3. `pnpm install`
4. `pnpm run build`

## Run SSH Socket Server

1. `pnpm ssh:start`

## If you want to run both app development mode just run this command

 `pnpm app:dev`

## Setup ENV Variables

- `REVERB_APP_KEY` - The APP key to laravel reverb
- `REVERB_APP_SECRET` - The APP secret to laravel reverb
- `REVERB_HOST` - "localhost"
- `REVERB_PORT` - 8080
- `REVERB_SCHEME` - http or https
- `CLOUDFLARE_DNS_TOKEN` - Cloudflare API Token (DNS Edit)

## Others Project Requirements

- [WP Magic Plugin](https://github.com/kzamanbd/wp-magic-login)
- [Fly CLI](https://github.com/kzamanbd/fly-cli)
