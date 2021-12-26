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
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const updateProfile = (req, res) => {
  const { body } = req;
  const { id } = req.userInfo;
  let data;

  if (req.file) {
    data = {
      ...body,
      image: req.file.path,
    };
  } else {
    data = { ...body };
  }

  userModel
    .updateProfile(data, id)
    .then(({ status }) => {
      responseHelper.success(res, status, {
        msg: "Data updated successfully",
        result: {
          ...data,
        },
      });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const updatePassword = (req, res) => {
  const { body } = req;
  const { id } = req.userInfo;

  userModel
    .updatePassword(body, id)
    .then(({ status }) => {
      responseHelper.success(res, status, {
        msg: "Password updated successfully",
      });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getAllUsers = (req, res) => {
  userModel
    .getAllUsers()
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getUserData = (req, res) => {
  const { id } = req.userInfo;
  userModel
    .getUserData(id)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
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
      responseHelper.error(res, status, err);
    });
};

module.exports = {
  postNewUser,
  updateProfile,
  updatePassword,
  getAllUsers,
  getUserData,
  deleteUserById,
};
