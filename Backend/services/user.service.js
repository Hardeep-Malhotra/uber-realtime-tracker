const userModel = require("../models/user.model");

module.exports.createUser = async ({ fullname, email, password }) => {
  if (!fullname || !email || !password) {
    throw new Error("All required fields must be provided");
  }

  const user = userModel({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password,
  });
  return user;
};
