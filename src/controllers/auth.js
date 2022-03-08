const authModel = require("../models/auth");
const responseHelper = require("../helpers/sendResponse");

const register = (req, res) => {
  const { body } = req;
  const email = body.email;

  authModel
    .register(body, email)
    .then(({ status, result }) => {
      const objResponse = {
        id: result.insertId,
        name: body.name,
        email: body.email,
      };
      responseHelper.success(res, status, objResponse);
    })
    .catch(({ status, err }) => {
      console.log(err);
      if (status == 400) return responseHelper.error(res, status, { msg: err });
      responseHelper.error(res, status, err);
    });
};

const login = (req, res) => {
  const { body } = req;
  console.log(body);
  authModel
    .login(body)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      console.log("err", err);
      responseHelper.error(res, status, err);
    });
};

const logout = (req, res) => {
  const token = req.header("x-access-token");
  authModel
    .logout(token)
    .then(({ status }) => {
      return responseHelper.success(res, status, {
        msg: "Logout successful",
      });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

module.exports = { register, login, logout };
