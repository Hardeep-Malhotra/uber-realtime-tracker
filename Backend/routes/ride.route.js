const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");


router.post(
  "/create",
  authMiddleware.authUser,

  body("pickup")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),

  body("destination")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),

  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),

  rideController.createRide,
);


router.get(
  "/get-fare",
  authMiddleware.authUser,

  query("pickup")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),

  query("destination")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),

  rideController.getFare
);
module.exports = router;
