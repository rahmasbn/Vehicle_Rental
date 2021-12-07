const db = require("../config/db");

const postNewUser = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO users SET ?`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

const updateUserById = (body, userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users SET ? WHERE id = ${userId}`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.affectedRows == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const updatePasswordById = (newPass, userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users SET password = "${newPass}" WHERE id = ${userId}`;
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.affectedRows == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM users";
    db.query(sqlQuery, (err, result) => {
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
  updateUserById,
  updatePasswordById,
  getAllUsers,
  deleteUserById,
};
