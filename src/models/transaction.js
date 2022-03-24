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

// const deleteTransaction = (req) => {
//   return new Promise((resolve, reject) => {
//     const { body, userInfo } = req;
//     const transactionId = body.id;
//     const role = userInfo.roles;
//     const userId = userInfo.id;
//     const timeStamp = getTimeStamp();
//     const prepare = [];
//     const sqlQuery = `UPDATE transaction, vehicles SET ? = ? WHERE ? = ? AND transaction.id IN (?)`;
//     let rolesId = "vehicles.user_id";

//     if (role === 2) {
//       prepare.push(mysql.raw("deleted_owner_at"));
//     } else if (role === 3) {
//       rolesId = "transaction.user_id";
//       prepare.push(mysql.raw("deleted_customer_at"));
//     } else {
//       return reject({ status: 403, err: "Unauthorize access." });
//     } 
//     prepare.push(timeStamp);
//     prepare.push(mysql.raw(rolesId));
//     prepare.push(userId);
//     console.log('roles id', rolesId)
//     let whereIn = '';
//     for (let i = 0; i < transactionId.length; i++) {
//       whereIn += i !== transactionId.length - 1 ? transactionId[i]+',' : transactionId[i]
//     }
//     prepare.push(mysql.raw(whereIn));

//     db.query(sqlQuery, prepare, (err, result) => {
//       console.log(sqlQuery)
//       if (err) return reject({ status: 500, err });
//       resolve({ status: 200, result });
//     });
//   });
// };

const deleteTransaction = (id, roles) => {
  return new Promise((resolve, reject) => {
    console.log('id, roles', id, roles);
    const timeStamp = getTimeStamp();
    const prepare = [];
    // const sqlDeleteTransaction = `UPDATE transaction SET ? = ? 
    // WHERE id IN (?)`;
    if (roles === 3) {
      prepare.push(mysql.raw('deleted_customer_at'));
    } else {
      prepare.push(mysql.raw('deleted_owner_at'));
    }
    prepare.push(timeStamp);
    // let whereIn = '';
    // for (let i = 0; i < ids.length; i++) {
    //   whereIn += i !== ids.length - 1 ? ids[i] + ',' : ids[i];
    // }
    // prepare.push(mysql.raw(whereIn));
    // db.query(sqlDeleteTransaction, prepare, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //     return reject({
    //       status: 500,
    //       result: {err: 'Something went wrong.'},
    //     });
    //   }
    //   console.log('result prepare', result, prepare);
    //   return resolve({
    //     status: 200,
    //     result: {msg: 'Transactions deleted.', data: ids},
    //   });
    // });
  });
};

module.exports = {
  postNewTransaction,
  updateTransactionById,
  getTransactionByVehicleType,
  // getAllTransaction,
  getTransaction,
  getDetailTransactionById,
  deleteTransaction,
};
