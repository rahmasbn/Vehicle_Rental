const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = (body) => {
  return new Promise((resolve, reject) => {
    const registerEmail = `SELECT email FROM users WHERE email = "${body.email}"`;
    db.query(registerEmail, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length >= 1)
        return reject({ status: 400, err: "Duplicated Email" });

      const sqlQuery = "INSERT INTO users SET ?";
      bcrypt
        .hash(body.password, 10)
        .then((hashedPassword) => {
          const newBody = {
            ...body,
            roles_id : 3,
            password: hashedPassword,
          };
          db.query(sqlQuery, [newBody], (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({ status: 201, result });
          });
        })
        .catch((err) => {
          reject({ status: 500, err });
        });
    });
  });
};

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const sqlQuery = "SELECT * FROM users WHERE ?";

    db.query(sqlQuery, [{email}], async (err, result) => {

      if (err) return reject({ status: 500, err });
      // untuk cek apakah emailnya ada di db
      if (result.length == 0)
        reject({ status: 401, err: "Invalid Email/Password" });

        const plainPassword = `${password}`;
        const hashedPassword = result[0].password;
        const checkPassword = await bcrypt.compare( plainPassword, hashedPassword );
      // untuk cek apakah password yang diinput sama dgn di db
      if (checkPassword) {
        const payload = {
          id: result[0].id,
          name: result[0].name,
          roles: result[0].roles_id
        };
        const jwtOptions = {
          expiresIn: "10m",
          issuer: process.env.ISSUER,
        };
        jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
          if (err) return reject({ status: 500, err });
          resolve({ status: 200, result: { token } });
        });
      } else {
      reject({ status: 401, err: "Invalid Email/Password" });
      }
    });
  });
};

module.exports = { register, login };
