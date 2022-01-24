const db = require("../config/db");

const getAllTypes = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM types";
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

module.exports = {
  getAllTypes,
};
