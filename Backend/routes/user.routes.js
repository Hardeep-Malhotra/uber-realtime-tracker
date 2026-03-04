const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid credentials. Please check your email...!"),
    body("fullname.firstname")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  userController.registerUser,
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid credentials. Please check your email...!"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  userController.loginUser, // 🔥 YEH IMPORTANT HAI
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);
module.exports = router;
