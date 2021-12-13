const cityModel = require("../models/cities");
const responseHelper = require("../helpers/sendResponse");

const postNewCity = (req, res) => {
  const { body } = req;

  cityModel
    .postNewCity(body)
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
      responseHelper.error(res, status,err);
    });
};

const getAllCities = (req, res) => {
  cityModel
    .getAllCities()
    .then(({ status, result }) => {
      responseHelper.success(res, status, { result });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};


module.exports = {
  postNewCity,
  getAllCities,
};
