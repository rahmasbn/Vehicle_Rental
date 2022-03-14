const mysql = require("mysql");
const db = require("../config/db");
const getTimeStamp = require("../helpers/timeStamp");

const postNewVehicle = (newBody, id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO vehicles SET ?`;
    const timeStamp = getTimeStamp();
    // console.log(timeStamp);
    newBody = {
      ...newBody,
      date_added: timeStamp,
      user_id: id,
    };
    db.query(sqlQuery, [newBody], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

const updateVehicleById = (newBody, vehicleId) => {
  return new Promise((resolve, reject) => {
    const timeStamp = getTimeStamp();
    // console.log(timeStamp);
    newBody = {
      ...newBody,
      date_added: timeStamp,
    };
    const sqlQuery = `UPDATE vehicles SET ? WHERE id = ?`;
    db.query(sqlQuery, [newBody, vehicleId], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.affectedRows == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const getVehicleByRating = (order, query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT v.id AS "id", v.name, types.name AS "type", c.name AS "city", v.price AS "price", v.images, v.capacity, v.stock, v.status,
    CAST(AVG(t.rating) AS DECIMAL(2,1)) AS "rating" FROM transaction t JOIN vehicles v ON t.vehicle_id = v.id JOIN cities c ON v.city_id = c.id
    JOIN types ON v.type_id = types.id GROUP BY t.vehicle_id ORDER BY rating`;

    let prepStatement = [];
    let data = "";
    let page = parseInt(query.page);
    let limit = parseInt(query.limit);
    let offset = "";

    if (order) {
      sqlQuery += ` ?`;
      prepStatement.push(mysql.raw(order));
      data += `?order=${order}`;
    }

    // prepStatement.push([mysql.raw(order)]);

    const countQuery = `SELECT COUNT(*) AS "count" from (SELECT AVG(t.rating) AS "rating" from transaction t group by t.vehicle_id) as x`;
    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err });

      // Paginasi
      const totalData = result[0].count;

      // if (!query.page && !query.limit) {
      //   page = 1; limit = 4; offset = 0;
      //   sqlQuery += " LIMIT ? OFFSET ?";
      //   prepStatement.push(limit, offset);
      // } else
      // if (query.page && query.limit) {
      //   sqlQuery += " LIMIT ? OFFSET ?";
      //   const offset = (page - 1) * limit;
      //   prepStatement.push(limit, offset);
      //   data += `?page=${page + 1}&limit=${limit}`;
      // }
      if (!query.page && !query.limit) {
        page = 1;
        limit = 100;
        offset = 0;
        sqlQuery += " LIMIT ? OFFSET ?";
        prepStatement.push(limit, offset);
        data += `?page=${page + 1}&limit=${limit}`;
      } else {
        sqlQuery += " LIMIT ? OFFSET ?";
        offset = (page - 1) * limit;
        prepStatement.push(limit, offset);
        data += `?page=${page - 1}&limit=${limit}`;
      }

      const meta = {
        totalData,
        next:
          page == Math.ceil(totalData / limit)
            ? null
            : `/vehicles/popular` + data,
        prev: page == 1 ? null : `/vehicles/popular` + data,
      };
      db.query(sqlQuery, prepStatement, (err, result) => {
        if (err) return reject({ status: 500, err });
        resolve({ status: 200, result: { meta, data: result } });
      });
    });

    // db.query(sqlQuery, , (err, result) => {
    //   if (err) return reject({ status: 500, err });
    //   resolve({ status: 200, result });
    // });
  });
};

const getAllVehiclesWithOrder = (query, keyword, order) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT v.id, v.name, types.name AS "type", c.name AS "city", v.capacity, v.stock, v.status,
    v.price, v.images FROM vehicles v JOIN types ON v.type_id = types.id JOIN cities c ON v.city_id = c.id`;
    let countQuery = `SELECT COUNT(*) AS "count" FROM vehicles v JOIN types ON v.type_id = types.id JOIN cities c ON v.city_id = c.id`;
    const prepStatement = [];
    let data = "";
    let page = parseInt(query.page);
    let limit = parseInt(query.limit);
    let offset = "";

    // Filter berdasrkan tipe kendaraan
    let types = "";
    if (query.type && query.type.toLowerCase() === "car") types = "car";
    if (query.type && query.type.toLowerCase() === "motorbike") types = "motorbike";
    if (query.type && query.type.toLowerCase() === "bike") types = "bike";

    // if (types) {
    //   // sqlQuery += ` WHERE types.name = ?`;
    //   prepStatement.push(types);
    //   data += `&type=${types}`;
    // }

    // Filter berdasrkan kota/lokasi
    let cities = "";
    if (query.city && query.city.toLowerCase() == "jakarta") cities = "jakarta";
    if (query.city && query.city.toLowerCase() == "yogyakarta")
      cities = "yogyakarta";
    if (query.city && query.city.toLowerCase() == "bali") cities = "bali";
    if (query.city && query.city.toLowerCase() == "malang") cities = "malang";
    if (query.city && query.city.toLowerCase() == "bandung") cities = "bandung";
    if (query.city && query.city.toLowerCase() == "bogor") cities = "bogor";
    if (query.city && query.city.toLowerCase() == "medan") cities = "medan";

    // if (cities) {
    //   // sqlQuery += ` WHERE c.name = ?`;
    //   prepStatement.push(cities);
    //   data += `&city=${cities}`;
    // }

    if (types && cities) {
      sqlQuery += ` WHERE types.name = ? AND c.name = ?`;
      countQuery += ` WHERE types.name = ? AND c.name = ?`;
      prepStatement.push(types, cities);
      data += `&type=${types}&city=${cities}`;
    } else if (types) {
      sqlQuery += ` WHERE types.name = ?`;
      countQuery += ` WHERE types.name = ?`;
      prepStatement.push(types);
      data += `&type=${types}`;
    } else if (cities) {
      sqlQuery += ` WHERE c.name = ?`;
      countQuery += ` WHERE c.name = ?`;
      prepStatement.push(cities);
      data += `&city=${cities}`;
    }

    // Search by name
    if (keyword) {
      sqlQuery += ` AND v.name LIKE ?`;
      countQuery += ` AND v.name LIKE ?`;
      prepStatement.push(keyword);
      data += `&keyword=${keyword}`;
    }

    let orderBy = "";
    if (query.sort && query.sort.toLowerCase() == "name") orderBy = "v.name";
    if (query.sort && query.sort.toLowerCase() == "price") orderBy = "v.price";
    if (query.sort && query.sort.toLowerCase() == "id") orderBy = "v.id";

    if (order && orderBy) {
      sqlQuery += ` ORDER BY ? ?`;
      countQuery += ` ORDER BY ? ?`;
      prepStatement.push(mysql.raw(orderBy), mysql.raw(order));
      data += `&sort=${query.sort}&order=${order}`;
    }

    db.query(countQuery, prepStatement, (err, result) => {
      if (err) return reject({ status: 500, err });

      // Paginasi
      const totalData = result[0].count;

      if (!query.page && !query.limit) {
        page = 1;
        limit = 8;
        offset = 0;
        sqlQuery += " LIMIT ? OFFSET ?";
        prepStatement.push(limit, offset);
      } else {
        sqlQuery += " LIMIT ? OFFSET ?";
        offset = (page - 1) * limit;
        prepStatement.push(limit, offset);
      }

      // console.log("offset", offset);
      const meta = {
        totalData,
        next:
          page == Math.ceil(totalData / limit)
            ? null
            : `/vehicles?page=${page + 1}&limit=${limit}` + data,
        prev:
          page == 1 ? null : `/vehicles?page=${page - 1}&limit=${limit}` + data,
      };
      db.query(sqlQuery, prepStatement, (err, result) => {
        if (err) return reject({ status: 500, err });
        resolve({ status: 200, result: { meta, data: result } });
      });
    });
  });
};

const getVehicleByType = (query, type) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT v.id, v.name, types.name AS "type", c.name AS "city", v.capacity, v.stock, v.status,
    v.price, v.images FROM vehicles v JOIN types ON v.type_id = types.id JOIN cities c ON v.city_id = c.id WHERE types.name = ?`;

    const prepStatement = [type];
    let page = parseInt(query.page);
    let limit = parseInt(query.limit);
    let offset = "";

    const countQuery = `SELECT COUNT(*) AS "count" FROM vehicles v JOIN types ON v.type_id = types.id WHERE types.name = ?`;
    db.query(countQuery, type, (err, result) => {
      if (err) return reject({ status: 500, err });

      const totalData = result[0].count;

      if (!query.page && !query.limit) {
        page = 1;
        limit = 100;
        offset = 0;
        sqlQuery += " LIMIT ? OFFSET ?";
        prepStatement.push(limit, offset);
      } else {
        sqlQuery += " LIMIT ? OFFSET ?";
        offset = (page - 1) * limit;
        prepStatement.push(limit, offset);
      }

      const meta = {
        totalData,
        next:
          page == Math.ceil(totalData / limit)
            ? null
            : `/vehicles/${type}?page=${page + 1}&limit=${limit}`,
        prev:
          page == 1
            ? null
            : `/vehicles/${type}?page=${page - 1}&limit=${limit}`,
      };
      db.query(sqlQuery, prepStatement, (err, result) => {
        if (err) return reject({ status: 500, err });
        resolve({ status: 200, result: { meta, data: result } });
      });
    });
  });
};

const getDetailVehicleById = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT v.id, v.name, types.name AS "type", v.type_id, v.city_id, c.name AS "city", v.capacity, v.stock, v.price, v.images, v.status, v.date_added, v.user_id
    FROM vehicles v JOIN types ON v.type_id = types.id JOIN cities c ON v.city_id = c.id 
    WHERE v.id = ?`;
    db.query(sqlQuery, vehicleId, (err, result) => {
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
  getVehicleByRating,
  getVehicleByType,
  getAllVehiclesWithOrder,
  getDetailVehicleById,
  deleteVehicleById,
};
