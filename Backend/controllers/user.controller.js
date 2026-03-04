const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

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
  // 🔍 Step 1: Validate login request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  // 📦 Step 2: Extract email and password from request body
  const { email, password } = req.body;

  // 🔎 Step 3: Find user by email (include password field for comparison)
  const user = await userModel.findOne({ email }).select("+password");

  // ❌ Step 4: If user not found
  if (!user) {
    return res
      .status(401)
      .json({
        message: "Invalid credentials. Please check your email and password.",
      });
  }

  // 🔐 Step 5: Compare entered password with hashed password
  const isMatch = await user.comparePassword(password);

  // ❌ Step 6: If password does not match
  if (!isMatch) {
    return res
      .status(401)
      .json({
        message: "Invalid credentials. Please check your email and password.",
      });
  }

  // 🎟 Step 7: Generate JWT token
  const token = user.generateAuthToken();

  // 🚫 Step 8: Remove password before sending response
  user.password = undefined;

  // 📤 Step 9: Send success response
  res.status(200).json({ token, user });
};
