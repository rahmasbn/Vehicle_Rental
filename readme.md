# Vehicle Rental
Vehicle Rental is a website that build using React JS providing service to make it easier for owners and users make transactions anywhere and anytime. This app also equipped with two role access for owner and user. This is the backend service for this app. You can see the frontend service [here](https://github.com/rahmasbn/Vehicle-Rental-React)

## Modules
1. [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
2. [Bcrypt](https://www.npmjs.com/package/bcrypt)
3. [Cors](https://www.npmjs.com/package/cors)
4. [Multer](https://www.npmjs.com/package/multer)
5. [Mysql2](https://www.npmjs.com/package/mysql2)
6. [Nodemailer](https://www.npmjs.com/package/nodemailer)

## HTTP API Including
- GET
- POST
- PATCH
- DELETE

## How to use
1. Clone this repository with `git clone https://github.com/rahmasbn/Vehicle_Rental`.
2. Run `npm i` to install all modules required.
3. Import database provided (`db_vehiclerental.sql`) to your SQL DBMS.
4. Set .env file in root:
    - `HOST` = fill with HOSTNAME in your database configuration.
    - `UNAME` = fill with USERNAME in your database configuration.
    - `PASS` = fill with PASSWORD in your database configuration.
    - `DB` = fill with NAME of your database.
    - `SECRET_KEY` = fill with the unique value due to signature verifier on JWT.
    - `ISSUER` = fill with the unique value.
    - `EMAIL_SENDER` = fill with EMAIL used to send otp for forgot password.
    - `PASSWORD_SENDER` = fill with PASSWORD used to send otp for forgot password
5. Run `npm start`.

## Documentation
- [Postman](https://documenter.getpostman.com/view/18599002/UVyoWJ9S)
- [Frontend](https://github.com/rahmasbn/Vehicle-Rental-React)
- [Deploy](https://vehicle-rental-react.netlify.app)
