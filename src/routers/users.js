const express = require("express");

const userController = require("../controllers/users");

const userRouter = express.Router();
const authorize = require("../middlewares/authorize");

// /classes
// post new users
userRouter.post("/", authorize.authorizeAdminAndOwner, userController.postNewUser);

// update user data by id
userRouter.put("/:id", authorize.authorizeAdminAndOwner, userController.updateUserById);

// update user password
userRouter.patch("/:id", authorize.authorizeAdminAndOwner, userController.updatePasswordById);

// get All users
userRouter.get("/", authorize.authorizeAdminAndOwner, userController.getAllUsers);

// delete user by id
userRouter.delete("/:id", authorize.authorizeAdminAndOwner, userController.deleteUserById);

module.exports = userRouter;
