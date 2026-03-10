const { isValidObjectId } = require("mongoose");
const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const distanceKm = distanceTime.distance.value / 1000;
  const durationMin = distanceTime.duration.value / 60;

  const baseFare = {
    auto: 20,
    car: 40,
    moto: 10,
  };

  const perKmRate = {
    auto: 8,
    car: 10,
    moto: 5,
  };

  const perMinuteRate = {
    auto: 0.5,
    car: 1,
    moto: 0.3,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
      distanceKm * perKmRate.auto +
      durationMin * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
      distanceKm * perKmRate.car +
      durationMin * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
      distanceKm * perKmRate.moto +
      durationMin * perMinuteRate.moto
    ),
  };

  return {
    distance: distanceKm,
    duration: durationMin,
    fare,
  };
}
module.exports.getFare = getFare;

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }

  return generateOtp(num);
}
module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  if (!isValidObjectId(user)) {
    throw new Error("Invalid user id");
  }

  const fareData = await getFare(pickup, destination);
  
  if (!fareData.fare[vehicleType]) {
    throw new Error("Invalid vehicle type");
  }

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    vehicleType,
    otp:getOtp(6),
    fare: fareData.fare[vehicleType],
    distance: fareData.distance,
    duration: fareData.duration,
  });

  return ride;
};
