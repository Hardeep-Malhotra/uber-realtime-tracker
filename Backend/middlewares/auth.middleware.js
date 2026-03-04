const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  try {
    // token header ya cookie se lo
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    console.log("Cookies:", req.cookies);
    console.log("Auth header:", req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    const user = await userModel.findById(decoded._id);
    console.log("Decoded:", decoded);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
  console.log("User:", user);
    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
