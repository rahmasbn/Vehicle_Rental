const authModel = require("../models/auth");
const responseHelper = require("../helpers/sendResponse");

const register = (req, res) => {
  const { body } = req;

  authModel
    .register(body)
    .then(({ status, result }) => {
      const objResponse = {
        id: result.insertId,
        name: body.name,
        email: body.email,
        address: body.address,
        phone_number: body.phone_number,
      };
      responseHelper.success(res, status, objResponse);
    })
    .catch(({ status, err }) => {
      if (status == 400) return responseHelper.error(res, status, err);
      responseHelper.error(res, status, err);
    });
};

const login = (req, res) => {
  const { body } = req;

  authModel
    .login(body)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

module.exports = { register, login };
