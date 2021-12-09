const mysql = require("mysql");
const db = require("../config/db");

const postNewVehicle = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO vehicles SET ?`;
    db.query(sqlQuery, [body], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

const updateVehicleById = (body, vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE vehicles SET ? WHERE id = ${vehicleId}`;
    db.query(sqlQuery, [body], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.affectedRows == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const getVehicleByName = (keyword, order) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT v.id, v.name, v.type_id, c.name AS "city", v.capacity, v.stock, v.price FROM vehicles v 
    JOIN cities c ON v.city_id = c.id WHERE v.name LIKE ? ORDER BY v.name ?`;

    db.query(sqlQuery, [keyword, mysql.raw(order)], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const getVehicleByType = (typeId, order) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT vehicles.id, vehicles.name, vehicles.type_id, location.name AS "location", cities.name AS "city", vehicles.capacity,
    vehicles.stock, vehicles.price FROM vehicles  JOIN location ON vehicles.location_id = location.id JOIN cities ON vehicles.city_id = cities.id
    WHERE type_id = ${typeId} ORDER BY name ?`;

    db.query(sqlQuery, [mysql.raw(order)], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const getVehicleByRating = (order) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT v.id AS "id", v.name AS "vehicle", types.name AS "type", c.name AS "city", v.price AS "price", 
    avg(t.rating) AS "rating" FROM transaction t JOIN vehicles v ON t.vehicle_id = v.id JOIN cities c ON v.city_id = c.id
    JOIN types ON v.type_id = types.id GROUP BY t.vehicle_id ORDER BY rating ?`;

    db.query(sqlQuery, [mysql.raw(order)], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const getAllVehicles = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM vehicles";
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const getDetailVehicleById = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT v.id, v.name, types.name AS "type", c.name AS "city", v.capacity, v.stock, v.price 
    FROM vehicles v JOIN types ON vehicles.type_id = types.id JOIN cities c ON vehicles.city_id = cities.id 
    WHERE v.id = ${vehicleId}`;
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const deleteVehicleById = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM vehicles WHERE id = ${vehicleId}`;
    db.query(sqlQuery, (err) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200 });
    });
  });
};

module.exports = {
  postNewVehicle,
  updateVehicleById,
  getVehicleByName,
  getVehicleByType,
  getVehicleByRating,
  getAllVehicles,
  getDetailVehicleById,
  deleteVehicleById,
};
