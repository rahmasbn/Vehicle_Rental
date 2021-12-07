const db = require("../config/db");

const postNewLocation = (req, res) => {
  const {
    body: { name, city_id },
  } = req;
  const sqlQuery = `INSERT INTO location (name)
      VALUES ("${name}", ${city_id})`;
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(201).json({
      msg: "Data added successfully",
      result: {
        name,
        city_id,
        id: result.insertId,
      },
    });
  });
};

const getAllLocation = (req, res) => {
  const sqlQuery = "SELECT * FROM location";
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(200).json({
      result,
    });
  });
};

module.exports = {
  postNewLocation,
  getAllLocation,
};
