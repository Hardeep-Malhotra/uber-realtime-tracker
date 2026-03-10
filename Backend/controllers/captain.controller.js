// const captainModel = require("../models/captain.model");
// const captainService = require("../services/captain.service");
// const { validationResult } = require("express-validator");
// const blackListTokenModel = require("../models/blacklistToken.model");

// module.exports.registerCaptain = async (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   console.log("BODY:", req.body);
//   console.log("FILE:", req.file);

//   const {
//     firstname,
//     lastname,
//     email,
//     password,
//     color,
//     plate,
//     capacity,
//     vehicleType,
//   } = req.body;

//   const image = req.file ? req.file.path : "";

//   const isCaptainAlreadyExist = await captainModel.findOne({ email });

//   if (isCaptainAlreadyExist) {
//     return res.status(409).json({
//       message: "Captain with this email already exists",
//     });
//   }

//   const captain = await captainService.createCaptain({
//     firstname,
//     lastname,
//     email,
//     password,
//     color,
//     plate,
//     capacity,
//     vehicleType,
//     profileImage: image,
//   });

//   await captain.save();

//   const token = captain.generateAuthToken();

//   captain.password = undefined;

//   res.status(201).json({
//     token,
//     captain,
//   });
// };
// module.exports.loginCaptain = async (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, password } = req.body;

//   const captain = await captainModel.findOne({ email }).select("+password");

//   if (!captain) {
//     return res.status(401).json({
//       message: "Invalid credentials. Please check your email and password.",
//     });
//   }

//   const isMatch = await captain.comparePassword(password);

//   if (!isMatch) {
//     return res.status(401).json({
//       message: "Invalid credentials. Please check your email and password.",
//     });
//   }

//   const token = captain.generateAuthToken();

//   res.cookie("token", token, {
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000,
//   });

//   captain.password = undefined;

//   res.status(200).json({ token, captain });
// };

// module.exports.getCaptainProfile = async (req, res) => {
//   const captain = req.captain;
//   captain.password = undefined;

//   res.status(200).json({
//     captain: captain,
//   });
// };

// module.exports.logoutCaptain = async (req, res) => {
//   try {
//     const token =
//       req.cookies.token ||
//       (req.headers.authorization && req.headers.authorization.split(" ")[1]);

//     if (!token) {
//       return res.status(400).json({
//         message: "Authentication token missing",
//       });
//     }

//     // Check if token already blacklisted
//     const isBlacklisted = await blackListTokenModel.findOne({ token });

//     if (!isBlacklisted) {
//       await blackListTokenModel.create({ token });
//     }

//     // Clear cookie
//     res.clearCookie("token");

//     res.status(200).json({
//       message: "Captain logged out successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Logout failed",
//     });
//   }
// };






const captainModel = require("../models/captain.model"); 
// 📦 MongoDB model import – database se captain data read/write karne ke liye

const captainService = require("../services/captain.service"); 
// ⚙️ Service layer – captain create karne ka business logic yaha se call hoga

const { validationResult } = require("express-validator"); 
// ✅ Request validation ke liye (API par aane wale data ko validate karta hai)

const blackListTokenModel = require("../models/blacklistToken.model"); 
// 🚫 Logout ke baad token blacklist karne ke liye database model


// 🚀 API Endpoint: Register Captain
// Frontend se captain signup ka data yaha receive hota hai
module.exports.registerCaptain = async (req, res) => {

  // 📥 Request validation check (API request me koi error to nahi)
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // ❌ Agar request data invalid hai to API error response bhejega
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  // 📥 Frontend API request se data destructure kar rahe hain
  const {
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
  } = req.body;

  // 📷 Image upload (multer middleware se file aa rahi hai)
  const image = req.file ? req.file.path : "";

  // 🔎 Database query – check kar rahe hain ki captain already exist karta hai ya nahi
  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    // ❌ Agar email already database me hai to API error return karega
    return res.status(409).json({
      message: "Captain with this email already exists",
    });
  }

  // ⚙️ Captain create karne ke liye service call (Database operation)
  const captain = await captainService.createCaptain({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
    profileImage: image,
  });

  // 💾 Database me captain save kar rahe hain
  await captain.save();

  // 🔑 JWT Auth Token generate ho raha hai (frontend authentication ke liye)
  const token = captain.generateAuthToken();

  captain.password = undefined;

  // 📡 API response – frontend ko token + captain data bhej rahe hain
  res.status(201).json({
    token,
    captain,
  });
};


// 🚀 API Endpoint: Captain Login
// Frontend se login request aati hai
module.exports.loginCaptain = async (req, res) => {

  // 📥 API request validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // 📥 Frontend se email/password receive kar rahe hain
  const { email, password } = req.body;

  // 🔎 Database query – email ke basis par captain find kar rahe hain
  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({
      message: "Invalid credentials. Please check your email and password.",
    });
  }

  // 🔐 Password verification
  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials. Please check your email and password.",
    });
  }

  // 🔑 Login successful hone par JWT token generate ho raha hai
  const token = captain.generateAuthToken();

  // 🍪 Token ko cookie me store kar rahe hain (authentication ke liye)
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  captain.password = undefined;

  // 📡 API response – frontend ko login data bhej rahe hain
  res.status(200).json({ token, captain });
};


// 🚀 API Endpoint: Get Captain Profile
// Authentication ke baad frontend yaha se captain profile data fetch karta hai
module.exports.getCaptainProfile = async (req, res) => {

  // 📥 Middleware se authenticated captain data mil raha hai
  const captain = req.captain;

  captain.password = undefined;

  // 📡 API response – captain profile frontend ko bhej rahe hain
  res.status(200).json({
    captain: captain,
  });
};


// 🚀 API Endpoint: Captain Logout
// User logout request frontend se yaha aati hai
module.exports.logoutCaptain = async (req, res) => {
  try {

    // 🔑 Token cookie ya authorization header se read kar rahe hain
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(400).json({
        message: "Authentication token missing",
      });
    }

    // 🚫 Token blacklist check (logout ke baad reuse na ho)
    const isBlacklisted = await blackListTokenModel.findOne({ token });

    if (!isBlacklisted) {
      // 💾 Token blacklist database me save kar rahe hain
      await blackListTokenModel.create({ token });
    }

    // 🍪 Cookie clear kar rahe hain
    res.clearCookie("token");

    // 📡 API response – logout success
    res.status(200).json({
      message: "Captain logged out successfully",
    });
  } catch (error) {

    // ❌ Server error response
    res.status(500).json({
      message: "Logout failed",
    });
  }
};