const db = require("../config/db");
const bcrypt = require("bcrypt");

const postNewUser = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO users SET ?`;
    db.query(sqlQuery, [body], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

const updateProfile = (data, id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users SET ? WHERE id = ?`;

    db.query(sqlQuery, [data, id], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.affectedRows == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const updatePassword = (body, id) => {
  return new Promise((resolve, reject) => {
    const { currentPass, newPass } = body;
    const sqlQuery = `SELECT * FROM users WHERE id = ?`;
    db.query(sqlQuery, [id], async (err, result) => {
      // console.log(result);
      if (err) return reject({ status: 500, err });

      try {
        const hashedPassword = result[0].password;
        // console.log(hashedPassword)
        const checkPassword = await bcrypt.compare(currentPass, hashedPassword);
        // console.log('currentpass: ', currentPass, 'hashPassword: ',hashedPassword)
        console.log(checkPassword);
        if (!checkPassword) return reject({ status: 401, err });

        // if (checkPassword) {
        const sqlQuery = `UPDATE users SET password = ? WHERE id = ?`;
        bcrypt
          .hash(newPass, 10)
          .then((hashedPassword) => {
            const password = hashedPassword;
            // console.log(password)
            db.query(sqlQuery, [password, id], (err, result) => {
              if (err) return reject({ status: 500, err });
              return resolve({ status: 200, result });
            });
          })
          .catch((err) => {
            reject({ status: 500, err });
          });
        // }
        //
      } catch (err) {
        reject({ status: 500, err });
      }
    });
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT u.id, u.name, u.email, u.dob, g.name AS 'gender', u.address, u.phone_number, u.image, roles.name AS 'roles'
    FROM users u JOIN gender g ON u.gender_id = g.id JOIN roles ON u.roles_id = roles.id`;
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const getUserData = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT u.name, u.email, u.dob, u.gender_id, u.address, u.phone_number, u.image 
    FROM users u WHERE id = ?`;
    db.query(sqlQuery, id, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

// const getUserById = (userId) => {
//   return new Promise((resolve, reject) => {
//     const sqlQuery = `SELECT u.name, u.email, u.dob, gender.name AS 'gender', u.address, u.phone_number, u.image
//     FROM users u JOIN gender ON u.gender_id = gender.id WHERE u.id = ?`;
//     db.query(sqlQuery, userId, (err, result) => {
//       if (err) return reject({ status: 500, err });
//       if (result.length == 0) return reject({ status: 404, result });
//       // console.log(result[0].dob)
//       // const moment = require('moment');
//       // let dob = moment(result[0].dob).format('DD/MM/YYYY');
//       // result = {...result[0], dob};
//       resolve({ status: 200, result: { data: result } });
//     });
//   });
// };

const deleteUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM users WHERE id = ?`;
    db.query(sqlQuery, userId, (err) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200 });
    });
  });
};

module.exports = {
  postNewUser,
  updatePassword,
  getAllUsers,
  getUserData,
  // getUserById,
  deleteUserById,
  updateProfile,
};
