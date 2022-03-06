const vehicleModel = require("../models/vehicles");
const responseHelper = require("../helpers/sendResponse");

const postNewVehicle = (req, res) => {
  const { body, files } = req;
  const { id } = req.userInfo;
  // console.log(id)
  const imgVehicle = files;
  let dataImg = [];
  let newBody;
  console.log(req.files);
  if (imgVehicle) {
    for (let i = 0; i < imgVehicle.length; i++) {
      dataImg.push(imgVehicle[i].filename);
    }
    let photos = JSON.stringify(dataImg);
    newBody = {
      ...body,
      images: photos,
    };
  }
  // if(dataImg.length !== 0) {
  //   const image = dataImg.map((item) => {
  //     const filePath = `${item}`
  //     return filePath
  //   })
  //   let images = JSON.stringify(image)
  // }
  // console.log(images);

  vehicleModel
    .postNewVehicle(newBody, id)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {
        msg: "Data added successfully",
        data: {
          id: result.insertId,
          ...newBody,
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
  const imgVehicle = files;
  let dataImg = [];
  let newBody;

  if (req.files) {
    for (let i = 0; i < imgVehicle.length; i++) {
      dataImg.push(imgVehicle[i].filename);
    }
    let photos = JSON.stringify(dataImg);
    newBody = {
      ...body,
      images: photos,
    };
  } else {
    newBody = { ...body, id: vehicleId };
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
          vehicleId,
        },
      });
    })
    .catch(({ status, err }) => {
      console.log(err);
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

const getVehicleByType = (req, res) => {
  const { type } = req.params;
  const { query } = req;

  vehicleModel
    .getVehicleByType(query, type)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getAllVehiclesWithOrder = (req, res) => {
  const { query } = req;
  const order = query.sort;
  let keyword = "";
  if (query.keyword) keyword = `%${query.keyword}%`;
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
      // console.log('result', result)
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
  getVehicleByType,
  getDetailVehicleById,
  deleteVehicleById,
};
