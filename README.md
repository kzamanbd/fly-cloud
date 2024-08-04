# FlyWP DNS Portal

This is a simple DNS portal for FlyWP that allows you to manage your DNS records for your FlyWP apps.

## Installation and Setup Laravel Local Development

1. Clone the repository
2. Change into the working directory
3. Run `composer install`
4. Run `cp .env.example .env`
5. Run `php artisan key:generate`
6. Run `php artisan migrate`
7. Run `php artisan serve`
8. Visit `http://localhost:8000` in your browser

## Setup ENV Variables

- `REVERB_APP_KEY` - The APP key to laravel reverb
- `REVERB_APP_SECRET` - The APP secret to laravel reverb
- `REVERB_HOST` - "localhost"
- `REVERB_PORT` - 8080
- `REVERB_SCHEME` - http or https
- `CLOUDFLARE_API_DNS_TOKEN` - Cloudflare API Token (DNS Edit)
