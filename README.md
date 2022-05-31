# Audiophile e-commerce.

![Design preview for the Audiophile e-commerce website coding challenge](./preview.jpg)

This project is developed as an assignment for the Codecademy Full Stack Engineering Path.

## Status

This project is deployed at https://audiophile-e-commerce.herokuapp.com

## Frontend libraries used:

- ReactJS
- Redux (State Management)
- React Router DOM
- Axios
- Material UI
- Stripe
- Moment
- SCSS

_Generated with [CRA](https://create-react-app.dev/) version 18.1.0_

## Backend libraries used:

- NodeJS
- Express
- PostgreSQL
- JSON Web Token
- Bcrypt
- Passport
- Stripe

### Installation instructions:

1. Clone repo
2. Create and start up a local postgres database and populate it with tables found in the following file: server/db/e-commerce.sql. You can use the file products.sql to add some products to the db.
3. Create a .env file in the /server directory with the following variables set to the values applying to your setup. If you don't plan on deploying then you can disable the variables related to deployed URLs.

DB_USER (your db username)
DB_PASSWORD (your db password)
DB_HOST=localhost
DB_PORT (postgres port, such as 5432)
DB_DATABASE (your database name)

JWT_KEY (random string, secret key used to verify JWT)

GOOGLE_CLIENT_ID (for Google OAuth - obtain from Google)
GOOGLE_CLIENT_SECRET (for Google OAuth - obtain from Google)
GOOGLE_CALLBACK_URL (deployed Google OAuth redirect URL for server)
GOOGLE_FRONT_END_REDIRECT_URL (deployed Google OAuth redirect URL for front-end)

CORS_ORIGIN (deployed URL for front-end using https)

STRIPE_KEY (for Stripe payments - obtain from Stripe)
PORT (I set this to 5010)

4. Create a .env file in the /client directory with the following variables (adjusted for your setup - dev environment or deployment). You can either remove the deployed URLs from the code or adjust them with your own deployed URL.

REACT_APP_SERVER_URL=http://localhost:5010/api
REACT_APP_DEV_URL=http://localhost:5010
REACT_APP_GOOGLE_URL=http://locahost:5010/api/auth/google

5. npm install in the server-directory and client-directory

The /api/auth/signup end-point signs up a user and creates a user entry in the database.
The /api/auth/login end-point takes an email/password combo and issues a JWT in a http-only cookie which is needed to access the other end-points.
The /api/auth/google end-point redirects to Google for OAuth login. You will need to create Stripe and Google Developer accounts in order to obtaint the credentials needed.

6. Start the server and client separately.

#### Enjoy!
