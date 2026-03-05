const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");
// ===============================
// 📌 USER REGISTRATION CONTROLLER
// Route: POST /users/register
// ===============================
module.exports.registerUser = async (req, res) => {
  // 🔍 Step 1: Validate incoming request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  // 📦 Step 2: Extract required fields from request body
  const { fullname, email, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User with this email already exists",
    });
  }
  // 👤 Step 3: Create new user instance (password will be hashed via pre("save") middleware)
  const user = await userService.createUser({
    fullname,
    email,
    password,
  });

  // 💾 Step 4: Save user to database
  await user.save();

  // 🔐 Step 5: Generate JWT token for authentication
  const token = user.generateAuthToken();

  // 🚫 Step 6: Remove password from response for security
  user.password = undefined;

  // 📤 Step 7: Send success response
  res.status(201).json({ token, user });
};

// ===============================
// 📌 USER LOGIN CONTROLLER
// Route: POST /users/login
// ===============================
module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials. Please check your email and password.",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials. Please check your email and password.",
    });
  }

  const token = user.generateAuthToken();

  const Data = res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  user.password = undefined;

  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  console.log("Logout token:", token); // debug

  if (!token) {
    return res.status(400).json({ message: "Token missing" });
  }

  await blackListTokenModel.create({ token });

  res.clearCookie("token");

  res.status(200).json({
    message: "User logged out successfully",
  });
};
