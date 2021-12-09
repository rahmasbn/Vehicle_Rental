const db = require("../config/db");

const postNewCity = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO cities SET ?`;
    db.query(sqlQuery, [body], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const getAllCities = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM cities";
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

module.exports = {
  postNewCity,
  getAllCities,
};
