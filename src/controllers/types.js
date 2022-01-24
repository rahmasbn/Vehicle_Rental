const typeModel = require("../models/types");
const responseHelper = require("../helpers/sendResponse");

const getAllTypes = (req, res) => {
  typeModel
    .getAllTypes()
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
        console.log(err)
      responseHelper.error(res, status, err);
    });
};


module.exports = {
  getAllTypes,
};
