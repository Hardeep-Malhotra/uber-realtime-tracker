const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Schema Definition
// This schema handles authentication, validation, and real-time socket tracking.

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [2, "First name must be at least 2 characters long"],
    },
    lastname: {
      type: String,
      minlength: [2, "Last name must be at least 2 characters long"],
    },
  },

  // Email with validation and formatting
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [5, "Email address must be at least 5 characters long"],
    match: [/^\S+@\S+\.\S+$/, "Invalid email address format"], // email format validation
  },

  // Password (hidden by default using select: false)
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
    select: false, // prevents password from being returned in queries
  },

  // Used for real-time tracking (Socket.io connection)
  socketId: {
    type: String,
  },
});
// ====================================================
// 🔐 Automatically hash password before saving
// ====================================================
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// =======================
// Generate JWT Token
// =======================
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id }, // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: "24h" }, // token expiry for security
  );
};

// =======================
// Compare Entered Password with Hashed Password
// =======================
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// =======================
// Static Method to Hash Password (optional use case)
// =======================
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
