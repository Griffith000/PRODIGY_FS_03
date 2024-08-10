const express = require("express");
const Router = express.Router();
const verifyToken = require("../utils/verifyUser");
const userController = require("../controllers/user-controller");

Router.get("/", userController.test);
Router.post("/update/:id",verifyToken, userController.updateUser);
Router.delete("/delete/:id", verifyToken,userController.deleteUser);

module.exports = Router;
