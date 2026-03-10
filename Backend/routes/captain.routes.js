const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");


router.post(
  "/register",
  uploadMiddleware.single("profileImage"),
  [
    body("firstname")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),

    body("email")
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),

    body("color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters"),

    body("plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle plate must be at least 3 characters"),

    body("capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),

    body("vehicleType")
      .isIn(["bus", "auto", "car", "moto"])
      .withMessage("Invalid vehicle type")
  ],

  captainController.registerCaptain
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
  captainController.loginCaptain,
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile,
);

router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain,
);
module.exports = router;
