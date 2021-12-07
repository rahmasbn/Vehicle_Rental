const mysql = require("mysql");
const db = require("../config/db");

const postNewVehicle = (req, res) => {
  const {
    body: { name, capacity, stock, price, type_id, location_id, city_id },
  } = req;

  const sqlQuery = `INSERT INTO vehicles (name, capacity, stock, price, type_id, location_id, city_id) 
        VALUES ("${name}", ${capacity}, ${stock}, ${price}, ${type_id}, ${location_id}, ${city_id})`;
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(201).json({
      msg: "Data added successfully",
      result: {
        name,
        capacity,
        stock,
        price,
        type_id,
        location_id,
        city_id,
        id: result.insertId,
      },
    });
  });
};

const updateVehicleById = (req, res) => {
  const {
    body: { id, name, capacity, stock, price, type_id, location_id, city_id },
  } = req;

  const sqlQuery = `UPDATE vehicles SET name = "${name}", capacity = ${capacity}, stock = ${stock}, price = ${price}, type_id = ${type_id}, 
        location_id = ${location_id}, city_id = ${city_id} WHERE id = ${id}`;
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    if (result.affectedRows == 0)
      return res.status(404).json({ msg: "User tidak ditemukan", result: [] });
    res.status(201).json({
      msg: "Data updated successfully",
      result: {
        name,
        capacity,
        stock,
        price,
        type_id,
        location_id,
        city_id,
        id: result.insertId,
      },
    });
  });
};

const getVehicleByName = (req, res) => {
  const { query } = req;
  const order = query.order;

  let keyword = "";
  if (query.name) keyword = `%${query.name}%`;
  const sqlQuery = `SELECT vehicles.id, vehicles.name, vehicles.type_id, location.name AS "location", cities.name AS "city", vehicles.capacity,
        vehicles.stock, vehicles.price FROM vehicles  JOIN location ON vehicles.location_id = location.id JOIN cities ON vehicles.city_id = cities.id 
        WHERE vehicles.name LIKE ? ORDER BY vehicles.name ?`;

  db.query(sqlQuery, [keyword, mysql.raw(order)], (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    console.log(result);
    return res.status(200).json({ result });
  });
};

const getVehicleByType = (req, res) => {
  const { query } = req;
  const order = query.order;

  const sqlQuery = `SELECT vehicles.id, vehicles.name, vehicles.type_id, location.name AS "location", cities.name AS "city", vehicles.capacity,
        vehicles.stock, vehicles.price FROM vehicles  JOIN location ON vehicles.location_id = location.id JOIN cities ON vehicles.city_id = cities.id
        WHERE type_id = ${query.type_id} ORDER BY name ?`;

  db.query(sqlQuery, [mysql.raw(order)], (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(200).json({ result });
  });
};

const getVehicleByRating = (req, res) => {
  const { query } = req;
  const order = query.order;

  const sqlQuery = `SELECT vehicles.id AS "id", vehicles.name AS "vehicle", types.name AS "type", location.name AS "location",
        cities.name AS "city", vehicles.price AS "price", transaction.rating AS "rating" FROM transaction JOIN users ON transaction.user_id = users.id 
        JOIN vehicles ON transaction.vehicle_id = vehicles.id JOIN location ON transaction.location_id = location.id JOIN cities ON transaction.city_id = cities.id
        JOIN types ON transaction.type_id = types.id ORDER BY rating ?`;

  db.query(sqlQuery, [mysql.raw(order)], (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(200).json({ result });
  });
};

const getAllVehicles = (req, res) => {
  const sqlQuery = "SELECT * FROM vehicles";
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(200).json({
      result,
    });
  });
};

const getDetailVehicleById = (req, res) => {
  const { params } = req;
  const pathParams = params.id;

  const sqlQuery = `SELECT vehicles.id, vehicles.name, types.name AS "type", location.name AS "location", cities.name AS "city", vehicles.capacity,
        vehicles.stock, vehicles.price FROM vehicles JOIN types ON vehicles.type_id = types.id JOIN location ON vehicles.location_id = location.id
        JOIN cities ON vehicles.city_id = cities.id WHERE vehicles.id = ${pathParams}`;
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    if (result.length == 0)
      return res.status(404).json({ msg: "Kendaraan tidak ditemukan", result });
    res.status(200).json({ result });
  });
};

const deleteVehicleById = (req, res) => {
  const { query } = req;
  const sqlQuery = `DELETE FROM vehicles WHERE id = ${query.id}`;
  db.query(sqlQuery, (err) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(200).json({ msg: "Data berhasil dihapus" });
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
