const mysql = require("mysql");
const db = require("../config/db");

const postNewTransaction = (req, res) => {
  const {
    body: {
      user_id,
      vehicle_id,
      type_id,
      location_id,
      city_id,
      quantity,
      start_date,
      return_date,
      total_price,
      status,
      rating,
    },
  } = req;

  const sqlQuery = `INSERT INTO transaction (user_id, vehicle_id, type_id, location_id, city_id, quantity, start_date, return_date, total_price, status, rating) 
        VALUES (${user_id}, ${vehicle_id}, ${type_id}, ${location_id}, ${city_id}, ${quantity}, "${start_date}", "${return_date}", ${total_price}, "${status}", ${rating})`;

  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(201).json({
      msg: "Data added successfully",
      result: {
        user_id,
        vehicle_id,
        type_id,
        location_id,
        city_id,
        quantity,
        start_date,
        return_date,
        total_price,
        status,
        rating,
        id: result.insertId,
      },
    });
  });
};

const updateTransactionById = (req, res) => {
  const {
    body: {
      id,
      user_id,
      vehicle_id,
      type_id,
      location_id,
      city_id,
      quantity,
      start_date,
      return_date,
      total_price,
      status,
      rating,
    },
  } = req;

  const sqlQuery = `UPDATE transaction SET user_id = ${user_id}, vehicle_id = ${vehicle_id}, type_id = ${type_id}, location_id = ${location_id}, 
        city_id = ${city_id}, quantity = ${quantity}, start_date = "${start_date}", return_date = "${return_date}", total_price = ${total_price}, 
        status = "${status}", rating = ${rating} WHERE id = ${id}`;

  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(201).json({
      msg: "Data updated successfully",
      result: {
        user_id,
        vehicle_id,
        type_id,
        location_id,
        city_id,
        quantity,
        start_date,
        return_date,
        total_price,
        status,
        rating,
        id: result.insertId,
      },
    });
  });
};

const getTransactionByVehicleType = (req, res) => {
  const { query } = req;
  const order = query.order;

  const sqlQuery = `SELECT transaction.id, users.name AS "name", users.email AS "email", users.phone_number AS "phone_number",
        users.address AS "address", vehicles.name AS "vehicle", types.name AS "type", location.name AS "location",cities.name AS "city", 
        vehicles.price AS "price", transaction.quantity AS "qty", transaction.total_price AS "total price", transaction.start_date AS "start date", 
        transaction.return_date AS "return date", transaction.status AS "status", transaction.rating AS "Rating" FROM transaction 
        JOIN users ON transaction.user_id = users.id JOIN vehicles ON transaction.vehicle_id = vehicles.id JOIN types ON transaction.type_id = types.id 
        JOIN location ON transaction.location_id = location.id JOIN cities ON transaction.city_id = cities.id WHERE transaction.type_id = ${query.type_id} 
        ORDER BY start_date ?`;

  db.query(sqlQuery, [mysql.raw(order)], (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    res.status(200).json({ result });
  });
};

const getAllTransaction = (req, res) => {
  const sqlQuery = `SELECT transaction.id, users.name AS "name", users.address AS "address", vehicles.name AS "vehicle", transaction.type_id, 
        transaction.location_id, transaction.city_id, vehicles.price AS "price", transaction.quantity AS "qty", transaction.total_price AS "total price", 
        transaction.start_date AS "start date", transaction.return_date AS "return date", transaction.status AS "status", transaction.rating AS "Rating" 
        FROM transaction JOIN users ON transaction.user_id = users.id JOIN vehicles ON transaction.vehicle_id = vehicles.id`;
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(200).json({
      result,
    });
  });
};

const getDetailTransactionById = (req, res) => {
  const { params } = req;
  const pathParams = params.id;

  const sqlQuery = `SELECT transaction.id, users.name AS "name", users.email AS "email", users.phone_number AS "phone_number",
        users.address AS "address", vehicles.name AS "vehicle", types.name AS "type", location.name AS "location",cities.name AS "city", 
        vehicles.price AS "price", transaction.quantity AS "qty", transaction.total_price AS "total price", transaction.start_date AS "start date", 
        transaction.return_date AS "return date", transaction.status AS "status", transaction.rating AS "Rating" FROM transaction 
        JOIN users ON transaction.user_id = users.id JOIN vehicles ON transaction.vehicle_id = vehicles.id JOIN types ON transaction.type_id = types.id 
        JOIN location ON transaction.location_id = location.id JOIN cities ON transaction.city_id = cities.id WHERE transaction.id = ${pathParams}`;
  db.query(sqlQuery, (err, result) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    if (result.length == 0)
      return res.status(404).json({ msg: "Transaksi tidak ditemukan", result });
    res.status(200).json({ result });
  });
};

const deleteTransactionById = (req, res) => {
  const { query } = req;
  const sqlQuery = `DELETE FROM transaction WHERE id = ${query.id}`;
  db.query(sqlQuery, (err) => {
    if (err) return res.status(500).json({ msg: "Terjadi Error", err });
    return res.status(200).json({ msg: "Data berhasil dihapus" });
  });
};

module.exports = {
  postNewTransaction,
  updateTransactionById,
  getTransactionByVehicleType,
  getAllTransaction,
  getDetailTransactionById,
  deleteTransactionById,
};
