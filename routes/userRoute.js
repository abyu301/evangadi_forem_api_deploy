const express = require("express");
const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// user controllers
const { register, login, checkUser, logout } = require("../controller/userController");

// register route
router.post("/register", register);

// login user route
router.post("/login", login);

// logout user route
router.get("/logout", logout);

// check user route
router.get("/check", authMiddleware, checkUser);

module.exports = router;
