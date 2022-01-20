const express = require("express");
const mainRouter = express.Router();

const userRouter = require("./users");
const vehicleRouter = require("./vehicles");
const transactionRouter = require("./transaction");
const cityRouter = require("./cities");
const authRouter = require("./auth");
const upload = require("../middlewares/upload");


// const upload = require("../middlewares/upload");

mainRouter.use("/users", userRouter)                // /users
mainRouter.use("/vehicles", vehicleRouter)          // /vehicles
mainRouter.use("/transaction", transactionRouter)   // /transaction
mainRouter.use("/cities", cityRouter)               // /cities
mainRouter.use("/auth", authRouter)                 // /auth

mainRouter.post("/upload", upload.multiUpload, (req, res) => {
    res.status(200).json({msg: "Upload berhasil", url: req.files });
    console.log(req.files[0].filename);
});

module.exports = mainRouter;








