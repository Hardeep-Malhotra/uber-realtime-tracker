const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");
module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(409).json({
      message: "Captain with this email already exists",
    });
  }

  // Create captain using service
  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  // Save captain to DB
  await captain.save();

  // Generate token
  const token = captain.generateAuthToken();

  // Hide password
  captain.password = undefined;

  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({
      message: "Invalid credentials. Please check your email and password.",
    });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials. Please check your email and password.",
    });
  }

  const token = captain.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  captain.password = undefined;

  res.status(200).json({ token, captain });
};


module.exports.getCaptainProfile = async (req, res) => {
  const captain = req.captain;
  captain.password = undefined;

  res.status(200).json(captain);
};

module.exports.logoutCaptain = async (req, res) => {
  try {

    const token =
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(400).json({
        message: "Authentication token missing",
      });
    }

    // Check if token already blacklisted
    const isBlacklisted = await blackListTokenModel.findOne({ token });

    if (!isBlacklisted) {
      await blackListTokenModel.create({ token });
    }

    // Clear cookie
    res.clearCookie("token");

    res.status(200).json({
      message: "Captain logged out successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
    });
  }
};