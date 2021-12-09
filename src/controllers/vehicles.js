const vehicleModel = require("../models/vehicles");
const responseHelper = require("../helpers/sendResponse");

const postNewVehicle = (req, res) => {
  const { body } = req;

  vehicleModel
    .postNewVehicle(body)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {
        msg: "Data added successfully",
        result: {
          ...body,
          id: result.insertId,
        },
      });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
    });
};

const updateVehicleById = (req, res) => {
  const { body } = req;
  const { params } = req;
  const vehicleId = params.id;

  vehicleModel.updateVehicleById(body, vehicleId).then(({ status, result }) => {
    if (status == 404)
      return responseHelper.success(res, status, { msg: "User tidak ditemukan", result });
      responseHelper.success(res, status, {
        msg: "Data updated successfully",
        result: {
          ...body,
          id: result.insertId,
        },
      })
      .catch(({ status, err }) => {
        responseHelper.error(res, status, { msg: "Terjadi Error", err });
      });
  });
};

const getVehicleByName = (req, res) => {
  const { query } = req;
  const order = query.order;
  let keyword = "";
  if (query.name) keyword = `%${query.name}%`;

  vehicleModel
    .getVehicleByName(keyword, order)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {result});
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err })
    });
};

const getVehicleByType = (req, res) => {
  const { query } = req;
  const order = query.order;
  const typeId = query.type_id;

  vehicleModel
    .getVehicleByType(typeId, order)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {result});
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
    });
};

const getVehicleByRating = (req, res) => {
  const { query } = req;
  const order = query.order;

  vehicleModel
    .getVehicleByRating(order)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {result});
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
    });
};

const getAllVehicles = (req, res) => {
  vehicleModel
    .getAllVehicles()
    .then(({ status, result }) => {
      responseHelper.success(res, status, {result});
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
    });
};

const getDetailVehicleById = (req, res) => {
  const { params } = req;
  const vehicleId = params.id;

  vehicleModel
    .getDetailVehicleById(vehicleId)
    .then(({ status, result }) => {
      if (status == 404)
        return responseHelper.success(res, status, { msg: "Kendaraan tidak ditemukan", result });
        responseHelper.success(res, status, { result });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
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
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
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
