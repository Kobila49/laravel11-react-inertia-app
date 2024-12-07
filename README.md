
## Installation
1. Clone the project
2. Navigate to the project's root directory using terminal
3. Create `.env` file - `cp .env.example .env`
4. Execute `composer install`
5. Execute `npm install`
6. Set application key - `php artisan key:generate --ansi`
7. Execute migrations and seed data - `php artisan migrate --seed`
8. Execute link for storage - `php artisan storage:link`
9. Start vite server - `npm run dev`
10. Start Artisan server - `php artisan serve`

## Additional Information
- To set up the project, you need to have PHP, Composer, Node.js and NPM installed on your machine.
- For verification of user email, you can use link from logs. Path to logs: `storage/logs/laravel.log`
- If you want to use email verification you need to set up mail server in `.env` file.
- You can use two users: igor@example.com(ADMIN) and john@example.com. They both use password Test1234
