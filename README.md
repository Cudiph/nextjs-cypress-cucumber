Nextjs login + cypress-cucumber test

## API endpoints

- `/api/login` - API endpoint for signing in. [POST]
- `/api/register` - API endpoint for signing up. [POST]
- `/api/logout` - Logging out. [GET, POST]

## Pages

- `/` - landing page.
- `/login` - Contains form for signing in.
- `/register` - Contains form for signing up.
- `/profile` - Show who you are.

## End-to-end testing

1. Run next.js app with `npm run dev` and keep it in the background.
2. Open cypress with running `npm run test`, cypress window will open and choose E2E Testing.
3. Choose your favorite browser and click the feature that you want to test.
4. Enjoy automatic testing!
