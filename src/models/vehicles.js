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

const getAllVehiclesWithOrder = (query, keyword, order) => {
  return new Promise((resolve, reject) => {
    // let sqlQuery = "SELECT * FROM vehicles";
    let sqlQuery = `SELECT v.id, v.name AS "vehicle", types.name AS "type", c.name AS "city", v.capacity, v.stock, 
    v.price FROM vehicles v JOIN types ON v.type_id = types.id JOIN cities c ON v.city_id = c.id`;
    const statement = [];

    let types = "";
    if (query.type && query.type.toLowerCase() == "car") types = "car";
    if (query.type && query.type.toLowerCase() == "motorbike") types = "motorbike";
    if (query.type && query.type.toLowerCase() == "bike") types = "bike";
    
    if (types) {
      sqlQuery += ` WHERE types.name = ?`;
      statement.push(types);
    }

    if (keyword) {
      sqlQuery += ` AND v.name LIKE ?`;
      statement.push(keyword);
    }
    let orderBy = "";
    if (query.by && query.by.toLowerCase() == "name") orderBy = "v.name";
    if (query.by && query.by.toLowerCase() == "price") orderBy = "v.price";
    if (query.by && query.by.toLowerCase() == "id") orderBy = "v.id";
    
    if (order && orderBy ){
      sqlQuery += ` ORDER BY ? ?`;
      statement.push(mysql.raw(orderBy), mysql.raw(order));
    }
    const countQuery = `SELECT COUNT(*) AS "count" FROM vehicles`;
    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err });

      // Paginasi
      let page = parseInt(query.page);
      let limit = parseInt(query.limit);
      const count = result[0].count;
       
      if (!query.page && !query.limit) {
        sqlQuery += " LIMIT ? OFFSET ?";
        page = 1; limit = 2;
        const offset = (page - 1) * limit;
        statement.push(limit, offset);
      }
      if (query.page && query.limit) {
        sqlQuery += " LIMIT ? OFFSET ?";
        const offset = (page - 1) * limit;
        statement.push(limit, offset);
      }
      const meta = {
        count,
        next: page == Math.ceil(count / limit) ? null : `/vehicles?page=${page + 1}&limit=${limit}`,
        prev: page == 1 ? null : `/vehicles?page=${page - 1}&limit=${limit}`,
      };
      db.query(sqlQuery, statement, (err, result) => {
        if (err) return reject({ status: 500, err });
        resolve({ status: 200, result: { data: result, meta } });
      });
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
  // getVehicleByName,
  // getVehicleByType,
  getVehicleByRating,
  getAllVehiclesWithOrder,
  getDetailVehicleById,
  deleteVehicleById,
};





// const getVehicleByName = (keyword, order) => {
//   return new Promise((resolve, reject) => {
//     const sqlQuery = `SELECT v.id, v.name, v.type_id, c.name AS "city", v.capacity, v.stock, v.price FROM vehicles v 
//     JOIN cities c ON v.city_id = c.id WHERE v.name LIKE ? ORDER BY v.name ?`;

//     db.query(sqlQuery, [keyword, mysql.raw(order)], (err, result) => {
//       if (err) return reject({ status: 500, err });
//       resolve({ status: 200, result });
//     });
//   });
// };

// const getVehicleByType = (typeId, order) => {
//   return new Promise((resolve, reject) => {
//     const sqlQuery = `SELECT vehicles.id, vehicles.name, vehicles.type_id, cities.name AS "city", vehicles.capacity, vehicles.stock, 
//     vehicles.price FROM vehicles JOIN cities ON vehicles.city_id = cities.id WHERE type_id = ${typeId} ORDER BY name ?`;

//     db.query(sqlQuery, [mysql.raw(order)], (err, result) => {
//       if (err) return reject({ status: 500, err });
//       resolve({ status: 200, result });
//     });
//   });
// };
