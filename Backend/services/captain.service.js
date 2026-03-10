const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
  profileImage,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All required fields must be provided");
  }

  const captain = new captainModel({
    fullname: {
      firstname,
      lastname,
    },

    email,
    password,
    profileImage,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
      location: {
    type: "Point",
    coordinates: [0, 0],
  },
  });

  return captain;
};
