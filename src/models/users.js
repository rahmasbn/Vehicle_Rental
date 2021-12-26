const db = require("../config/db");

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
    const sqlQuery = `UPDATE users SET password = ? WHERE id = ?`;
    db.query(sqlQuery, [body, id], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
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
    const sqlQuery = `SELECT u.name, u.email, u.dob, gender.name AS 'gender', u.address, u.phone_number, u.image 
    FROM users u JOIN gender ON u.gender_id = gender.id WHERE u.id = ?`;
    db.query(sqlQuery, id, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const deleteUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM users WHERE id = ${userId}`;
    db.query(sqlQuery, (err) => {
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
  deleteUserById,
  updateProfile
};
