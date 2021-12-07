const userModel = require("../models/users");

const postNewUser = (req, res) => {
  const { body } = req;

  userModel
    .postNewUser(body)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Data added successfully",
        result: {
          ...body,
          id: result.insertId,
        },
      });
    })
    .catch((status, err) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const updateUserById = (req, res) => {
  const { body } = req;
  const userId = body.id;
  userModel
    .updateUserById(body, userId)
    .then((status, result) => {
      if (status == 404)
        return res
          .status(status)
          .json({ msg: "User tidak ditemukan", result: [] });
      res.status(status).json({
        msg: "Data updated successfully",
        result: {
          ...body,
          id: result.insertId,
        },
      });
    })
    .catch((status, err) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const updatePasswordById = (req, res) => {
  const { body } = req;
  const newPass = body.password;
  const userId = body.id;

  userModel
    .updatePasswordById(newPass, userId)
    .then((status, result) => {
      if (status == 404)
        return res
          .status(status)
          .json({ msg: "User tidak ditemukan", result: [] });
      res.status(status).json({
        msg: "Password updated successfully",
        result: {
          newPass,
          changeRows: result.changedRows,
        },
      });
    })
    .catch((status, err) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const getAllUsers = (req, res) => {
  userModel
    .getAllUsers()
    .then((status, result) => {
      return res.status(status).json({
        result,
      });
    })
    .catch((status, err) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const deleteUserById = (req, res) => {
  const { query } = req;
  const userId = query.id;

  userModel
    .deleteUserById(userId)
    .then((status) => {
      res.status(status).json({ msg: "Data berhasil dihapus" });
    })
    .catch((status, err) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

module.exports = {
  postNewUser,
  updateUserById,
  updatePasswordById,
  getAllUsers,
  deleteUserById,
};
