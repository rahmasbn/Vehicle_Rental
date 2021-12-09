const mysql = require("mysql");
const db = require("../config/db");

const postNewTransaction = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO transaction SET ?`;
    db.query(sqlQuery, [body], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

const updateTransactionById = (body, transactionId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE transaction SET ? WHERE id = ${transactionId}`;

    db.query(sqlQuery, [body], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const getTransactionByVehicleType = (order, typeId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT t.id, u.name AS "name", u.email AS "email", u.phone_number AS "phone_number", 
    u.address AS "address", v.name AS "vehicle", types.name AS "type", c.name AS "city", v.price AS "price", 
    t.quantity AS "qty", t.total_payment AS "total payment", t.start_date AS "start date", t.return_date AS "return date",
    t.status AS "status", t.rating AS "rating" FROM transaction t JOIN users u ON t.user_id = u.id 
    JOIN vehicles v ON t.vehicle_id = v.id JOIN types ON v.type_id = types.id JOIN cities c ON v.city_id = c.id 
    WHERE v.type_id = ${typeId} ORDER BY start_date ?`;

    db.query(sqlQuery, [mysql.raw(order)], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const getAllTransaction = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT t.id, u.name AS "name", u.address AS "address", v.name AS "vehicle", v.type_id, v.city_id, 
    v.price AS "price", t.quantity AS "qty", t.total_payment AS "total payment", t.start_date AS "start date", 
    t.return_date AS "return date", t.status AS "status", t.rating AS "rating" FROM transaction t 
    JOIN users u ON t.user_id = u.id JOIN vehicles v ON t.vehicle_id = v.id`;
    
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const getDetailTransactionById = (transactionId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT t.id, u.name AS "name", u.email AS "email", u.phone_number AS "phone_number", 
    u.address AS "address", v.name AS "vehicle", types.name AS "type", c.name AS "city", v.price AS "price", 
    t.quantity AS "qty", t.total_payment AS "total payment", t.start_date AS "start date", t.return_date AS "return date", 
    t.status AS "status", t.rating AS "rating" FROM transaction t JOIN users u ON t.user_id = u.id 
    JOIN vehicles v ON t.vehicle_id = v.id JOIN types ON v.type_id = types.id JOIN cities c ON v.city_id = c.id 
    WHERE t.id = ${transactionId}`;
    
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const deleteTransactionById = (transactionId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM transaction WHERE id = ${transactionId}`;
    db.query(sqlQuery, (err) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200 });
    });
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
