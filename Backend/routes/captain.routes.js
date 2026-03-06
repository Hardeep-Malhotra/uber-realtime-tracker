const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/register",
  [
    // Email validation
    body("email")
      .isEmail()
      .withMessage("Invalid email address. Please enter a valid email."),

    // First name validation
    body("fullname.firstname")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long."),

    // Last name validation
    body("fullname.lastname")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long."),

    // Password validation
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),

    // Vehicle Color
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters long."),

    // Vehicle Plate
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle plate number must be at least 3 characters long."),

    // Vehicle Capacity
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1."),

    // Vehicle Type
    body("vehicle.vehicleType")
      .isIn(["bus", "auto", "car", "moto"])
      .withMessage("Invalid vehicle type. Allowed types: bus, auto, car, van"),
  ],

  captainController.registerCaptain,
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
