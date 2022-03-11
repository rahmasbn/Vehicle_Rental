const mysql = require("mysql");
const db = require("../config/db");
const getTimeStamp = require("../helpers/timeStamp");

const postNewTransaction = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO transaction SET ?`;
    const timeStamp = getTimeStamp();
    const newBody = {
      ...body,
      date_added: timeStamp,
    };
    db.query(sqlQuery, [newBody], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

const updateTransactionById = (body, transactionId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE transaction SET ? WHERE id = ?`;

    db.query(sqlQuery, [body, transactionId], (err, result) => {
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

// const getAllTransaction = (query) => {
//   return new Promise((resolve, reject) => {
//     let sqlQuery = `SELECT t.id, u.name AS "name", u.address AS "address", v.name AS "vehicle", v.type_id, v.city_id,
//     v.price AS "price", t.quantity AS "qty", t.total_payment AS "total payment", t.start_date AS "start date",
//     t.return_date AS "return date", t.status AS "status", t.rating AS "rating" FROM transaction t
//     JOIN users u ON t.user_id = u.id JOIN vehicles v ON t.vehicle_id = v.id`;

//     const prepStatement = [];
//     let data = '';

//     const countQuery = `SELECT COUNT(*) AS "count" FROM transaction`;
//     db.query(countQuery, (err, result) => {
//       if (err) return reject({ status: 500, err });

//       // Paginasi
//       let page = parseInt(query.page);
//       let limit = parseInt(query.limit);
//       let offset = '';
//       const count = result[0].count;

//       if (!query.page && !query.limit) {
//         page = 1; limit = 3; offset = 0;
//         sqlQuery += " LIMIT ? OFFSET ?";
//         prepStatement.push(limit, offset);
//       } else {
//         sqlQuery += " LIMIT ? OFFSET ?";
//         const offset = (page - 1) * limit;
//         prepStatement.push(limit, offset);
//       }
//       const meta = {
//         count,
//         next: page == Math.ceil(count / limit) ? null : `/vehicles?page=${page + 1}&limit=${limit}`+data,
//         prev: page == 1 ? null : `/vehicles?page=${page - 1}&limit=${limit}`+data,
//       };

//     db.query(sqlQuery, prepStatement, (err, result) => {
//       if (err) return reject({ status: 500, err });
//       resolve({ status: 200, result: { meta, data: result } });
//     });
//   });
// });
// };

const getTransaction = (query, id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT t.id, u.name AS "name", u.address AS "address", v.name AS "vehicle", v.type_id, v.city_id, v.images, 
    v.price AS "price", t.quantity AS "qty", t.total_payment, t.start_date,
    t.return_date, t.status, t.rating FROM transaction t 
    JOIN users u ON t.user_id = u.id JOIN vehicles v ON t.vehicle_id = v.id WHERE t.user_id = ${id} ORDER BY t.id DESC`;

    const prepStatement = [];
    let data = "";

    const countQuery = `SELECT COUNT(*) AS "count" FROM transaction WHERE user_id = ${id}`;
    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err });

      // Paginasi
      let page = parseInt(query.page);
      let limit = parseInt(query.limit);
      let offset = "";
      const count = result[0].count;

      if (!query.page && !query.limit) {
        page = 1;
        limit = 8;
        offset = 0;
        sqlQuery += " LIMIT ? OFFSET ?";
        prepStatement.push(limit, offset);
      } else {
        sqlQuery += " LIMIT ? OFFSET ?";
        const offset = (page - 1) * limit;
        prepStatement.push(limit, offset);
      }
      const meta = {
        count,
        next:
          page == Math.ceil(count / limit) || count == 0
            ? null
            : `/transaction?page=${page + 1}&limit=${limit}` + data,
        prev:
          page == 1
            ? null
            : `/transaction?page=${page - 1}&limit=${limit}` + data,
      };

      db.query(sqlQuery, prepStatement, (err, result) => {
        if (err) return reject({ status: 500, err });
        resolve({ status: 200, result: { meta, data: result } });
      });
    });
  });
};

const getDetailTransactionById = (transactionId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT t.id, u.name AS "name", u.email AS "email", u.phone_number AS "phone_number", 
    u.address AS "address", v.name AS "vehicle", types.name AS "type", c.name AS "city", v.price AS "price", 
    t.quantity AS "qty", t.total_payment, t.start_date, t.return_date, v.images, 
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
  // getAllTransaction,
  getTransaction,
  getDetailTransactionById,
  deleteTransactionById,
};
