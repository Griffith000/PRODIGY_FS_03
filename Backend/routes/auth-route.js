// Initilize express router
const express = require("express");
const authRoutes = express.Router();

const authController = require("../controllers/auth-controller");

authRoutes.post("/signup", authController.signup);
authRoutes.post("/signin", authController.signin);
authRoutes.post("/google", authController.googleOAuth);
authRoutes.get("/signOut", authController.signOut);

module.exports = authRoutes;
