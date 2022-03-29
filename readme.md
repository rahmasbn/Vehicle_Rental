# Vehicle Rental
[![express](https://img.shields.io/npm/v/express?label=express)](https://www.npmjs.com/package/express)
[![jsonwebtoken](https://img.shields.io/npm/v/jsonwebtoken?label=jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
[![bcrypt](https://img.shields.io/npm/v/bcrypt?label=bcrypt)](https://www.npmjs.com/package/bcrypt)
[![cors](https://img.shields.io/npm/v/cors?label=cors)](https://www.npmjs.com/package/cors)
[![multer](https://img.shields.io/npm/v/multer?label=multer)](https://www.npmjs.com/package/multer)
[![mysql2](https://img.shields.io/npm/v/mysql2?label=mysql2)](https://www.npmjs.com/package/mysql2)
[![nodemailer](https://img.shields.io/npm/v/nodemailer?label=nodemailer)](https://www.npmjs.com/package/nodemailer)

Vehicle Rental is a website that build using React JS providing service to make it easier for owners and users make transactions anywhere and anytime. This app also equipped with two role access for owner and user. This is the backend service for this app. You can see the frontend service [here](https://github.com/rahmasbn/Vehicle-Rental-React)


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
