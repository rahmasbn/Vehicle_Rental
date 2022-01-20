const vehicleModel = require("../models/vehicles");
const responseHelper = require("../helpers/sendResponse");

const postNewVehicle = (req, res) => {
  const { body, files } = req;
  const imgVehicle = files;
  let images=[];

  for(let i = 0; i < imgVehicle.length; i++) {
    images += imgVehicle[i].filename + ","
  }
  console.log(images);

  const newBody = {
    ...body,
    images
  };

  vehicleModel
    .postNewVehicle(newBody)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {
        msg: "Data added successfully",
        result: {
          ...newBody,
          id: result.insertId,
        },
      });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
      console.log(err);
    });
};

const updateVehicleById = (req, res) => {
  const { body, params, files } = req;
  const vehicleId = params.id;
  // let imgVehicle = [];
  // let images = [];
  // for(let i = 0; i < imgVehicle.length; i++) {
  //   images += imgVehicle[i].filename + ","
  // }
  let newBody;

  if (files) {
    newBody = {
      ...body,
      id: vehicleId,
      images: files.filename
    };
  } else {
    newBody = { ...body, id: vehicleId, };
  }

  vehicleModel
    .updateVehicleById(newBody, vehicleId)
    .then(({ status }) => {
      if (status == 404)
        return responseHelper.success(res, status, {
          msg: "Id vehicle tidak ditemukan",
        });
      responseHelper.success(res, status, {
        msg: "Data added successfully",
        result: {
          ...newBody,
        },
      });
    })
    .catch(({ status, err }) => {
      console.log(err)
      responseHelper.error(res, status, err);
    });
};

const getVehicleByRating = (req, res) => {
  const { query } = req;
  const order = query.order;

  vehicleModel
    .getVehicleByRating(order, query)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getAllVehiclesWithOrder = (req, res) => {
  const { query } = req;
  const order = query.order;
  let keyword = "";
  if (query.name) keyword = `%${query.name}%`;
  vehicleModel
    .getAllVehiclesWithOrder(query, keyword, order)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getDetailVehicleById = (req, res) => {
  const { params } = req;
  const vehicleId = params.id;

  vehicleModel
    .getDetailVehicleById(vehicleId)
    .then(({ status, result }) => {
      if (status == 404)
        return responseHelper.success(res, status, {
          msg: "Kendaraan tidak ditemukan",
        });
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const deleteVehicleById = (req, res) => {
  const { params } = req;
  const vehicleId = params.id;

  vehicleModel
    .deleteVehicleById(vehicleId)
    .then(({ status }) => {
      responseHelper.success(res, status, { msg: "Data berhasil dihapus" });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

module.exports = {
  postNewVehicle,
  updateVehicleById,
  getVehicleByRating,
  getAllVehiclesWithOrder,
  getDetailVehicleById,
  deleteVehicleById,
};
