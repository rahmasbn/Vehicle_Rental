const express = require("express");

const userController = require("../controllers/users");

const userRouter = express.Router();
const authorize = require("../middlewares/authorize");
const upload = require("../middlewares/upload");

// /users
// post new users
userRouter.post("/", authorize.checkToken, authorize.authorizeAdmin, userController.postNewUser);

// edit profile
userRouter.patch("/profile", authorize.checkToken, upload.multerHandler, userController.updateProfile);

// update user password
userRouter.patch("/edit-password", authorize.checkToken, userController.updatePassword);

// get All users
userRouter.get("/", authorize.checkToken, authorize.authorizeAdmin, userController.getAllUsers);

// get User by Id
// userRouter.get("/:id", userController.getUserById);

// get User by token
userRouter.get("/profile", authorize.checkToken, userController.getUserData);

// delete user by id
userRouter.delete("/:id", authorize.checkToken, authorize.authorizeAdmin, userController.deleteUserById);

module.exports = userRouter;
