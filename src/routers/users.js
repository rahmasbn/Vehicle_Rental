const express = require("express");

const userController = require("../controllers/users");

const userRouter = express.Router();

// /classes
// post new users
userRouter.post("/", userController.postNewUser);

// update user data by id
userRouter.put("/updateUser", userController.updateUserById);

// update user password
userRouter.patch("/update-pass", userController.updatePasswordById);

// get All users
userRouter.get("/", userController.getAllUsers);

// delete user by id
userRouter.delete("/", userController.deleteUserById);

module.exports = userRouter;
