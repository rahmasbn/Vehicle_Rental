const transactionModel = require("../models/transaction");
const responseHelper = require("../helpers/sendResponse");

const postNewTransaction = (req, res) => {
  const { body, userInfo } = req;
  console.log("[DEBUG] userInfo", userInfo);

  transactionModel
    .postNewTransaction(body)
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

const updateTransactionById = (req, res) => {
  const { body } = req;
  const { params } = req;
  const transactionId = params.id;

  transactionModel
    .updateTransactionById(body, transactionId)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {
        msg: "Data updated successfully",
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

const getTransactionByVehicleType = (req, res) => {
  const { query } = req;
  const order = query.order;
  const typeId = query.type;

  transactionModel
    .getTransactionByVehicleType(order, typeId)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result );
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getAllTransaction = (req, res) => {
  transactionModel
    .getAllTransaction()
    .then(({ status, result }) => {
      responseHelper.success(res, status, result );
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getDetailTransactionById = (req, res) => {
  const { params } = req;
  const transactionId = params.id;

  transactionModel
    .getDetailTransactionById(transactionId)
    .then(({ status, result }) => {
      if (status == 404)
        return responseHelper.success(res, status, {
          msg: "Transaksi tidak ditemukan",
        });
      responseHelper.success(res, status, result );
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const deleteTransactionById = (req, res) => {
  const { params } = req;
  const transactionId = params.id;

  transactionModel
    .deleteTransactionById(transactionId)
    .then(({ status }) => {
      responseHelper.success(res, status, { msg: "Data berhasil dihapus" });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

module.exports = {
  postNewTransaction,
  updateTransactionById,
  getTransactionByVehicleType,
  getAllTransaction,
  getDetailTransactionById,
  deleteTransactionById,
};
