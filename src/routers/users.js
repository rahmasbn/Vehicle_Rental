const express = require("express");

const userController = require("../controllers/users");

const userRouter = express.Router();

// /classes
// post new users
userRouter.post("/", userController.postNewUser);

// update user data by id
userRouter.put("/:id", userController.updateUserById);

// update user password
userRouter.patch("/:id", userController.updatePasswordById);

// get All users
userRouter.get("/", userController.getAllUsers);

// delete user by id
userRouter.delete("/:id", userController.deleteUserById);

module.exports = userRouter;
