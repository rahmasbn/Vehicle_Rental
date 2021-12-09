const userModel = require("../models/users");
const responseHelper = require("../helpers/sendResponse");

const postNewUser = (req, res) => {
  const { body } = req;

  userModel
    .postNewUser(body)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {
        msg: "Data added successfully",
        result: {
          ...body,
          id: result.insertId,
        },
      });
    })
    .catch((status, err) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
    });
};

const updateUserById = (req, res) => {
  const { body } = req;
  const { params } = req;
  const userId = params.id;
  userModel
    .updateUserById(body, userId)
    .then(({ status, result }) => {
      if (status == 404)
        return responseHelper.success(res, status, {
          msg: "User tidak ditemukan",
          result,
        });
      responseHelper.success(res, status, {
        msg: "Data updated successfully",
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

const updatePasswordById = (req, res) => {
  const { body } = req;
  // const newPass = body.password;
  const { params } = req;
  const userId = params.id;

  userModel
    .updatePasswordById(body, userId)
    .then(({ status, result }) => {
      if (status == 404)
        return responseHelper.success(res, status, {
          msg: "User tidak ditemukan",
          result,
        });
      responseHelper.success(res, status, {
        msg: "Password updated successfully",
        result: {
          ...body,
          changeRows: result.changedRows,
        },
      });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
    });
};

const getAllUsers = (req, res) => {
  userModel
    .getAllUsers()
    .then(({ status, result }) => {
      responseHelper.success(res, status, { result });
    })
    .catch((status, err) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
    });
};

const deleteUserById = (req, res) => {
  const { params } = req;
  const userId = params.id;

  userModel
    .deleteUserById(userId)
    .then(({ status }) => {
      responseHelper.success(res, status, { msg: "Data berhasil dihapus" });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, { msg: "Terjadi Error", err });
    });
};

module.exports = {
  postNewUser,
  updateUserById,
  updatePasswordById,
  getAllUsers,
  deleteUserById,
};
