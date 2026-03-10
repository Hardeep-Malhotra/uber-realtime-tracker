// const mapsService = require("../services/maps.service");
// const { validationResult } = require("express-validator");

// module.exports.getCoordinates = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { address } = req.query;

//   try {
//     const coordinates = await mapsService.getAddressCoordinate(address);
//     res.status(200).json(coordinates);
//   } catch (error) {
//     res.status(404).json({ message: "Coordinates not found.....!" });
//   }
// };

// module.exports.getDistanceTime = async (req, res) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { origin, destination } = req.query;
//     const distanceTime = await mapsService.getDistanceTime(origin, destination);
//     res.status(200).json(distanceTime);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// // module.exports.getAutoCompleteSuggestions = async (req, res) => {
// //   const { input } = req.query;

// //   try {
// //     const suggestion = await mapsService.getAutoCompleteSuggestions(input);

// //     res.status(200).json(suggestion);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ message: error.message });
// //   }
// // };
// module.exports.getAutoCompleteSuggestions = async (req, res) => {
//   const { input } = req.query;

//   if (!input) {
//     return res.status(400).json({ message: "Input query required" });
//   }

//   try {
//     const suggestions = await mapsService.getAutoCompleteSuggestions(input);

//     res.status(200).json(suggestions);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to fetch suggestions",
//     });
//   }
// };



// 🌍 Maps Service import – yaha se Google Maps API / external map APIs call hoti hain
const mapsService = require("../services/maps.service");

const { validationResult } = require("express-validator");
// ✅ API request validation ke liye (incoming request parameters check karta hai)



// 🚀 API Endpoint: Get Coordinates from Address
// Frontend address bhejta hai aur backend Google Maps API se latitude & longitude fetch karta hai
module.exports.getCoordinates = async (req, res) => {

  // 📥 Request validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // ❌ Agar query parameters invalid hain to API error response bhejega
    return res.status(400).json({ errors: errors.array() });
  }

  // 📍 Frontend se address query parameter receive ho raha hai
  const { address } = req.query;

  try {

    // 🌍 External Maps API Call (Google Maps / Geocoding API)
    // Address ko latitude & longitude me convert karne ke liye
    const coordinates = await mapsService.getAddressCoordinate(address);

    // 📡 API response – frontend ko coordinates bhej rahe hain
    res.status(200).json(coordinates);

  } catch (error) {

    // ❌ Agar address ka location nahi milta
    res.status(404).json({ message: "Coordinates not found.....!" });
  }
};



// 🚀 API Endpoint: Get Distance & Time
// Frontend origin aur destination bhejta hai aur backend Maps API se distance & travel time fetch karta hai
module.exports.getDistanceTime = async (req, res) => {

  try {

    // 📥 Request validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 📍 Frontend se origin aur destination location receive ho rahi hai
    const { origin, destination } = req.query;

    // 🌍 External Maps API Call (Distance Matrix API)
    // Origin aur destination ke beech ka distance aur time calculate karne ke liye
    const distanceTime = await mapsService.getDistanceTime(origin, destination);

    // 📡 API response – frontend ko distance aur estimated time bhej rahe hain
    res.status(200).json(distanceTime);

  } catch (error) {

    console.log(error);

    // ❌ Server error handling
    throw error;
  }
};



// 🚀 API Endpoint: Get Location AutoComplete Suggestions
// Frontend jab user location type karta hai tab suggestions ke liye Maps API call hoti hai
module.exports.getAutoCompleteSuggestions = async (req, res) => {

  // 📥 Frontend se search input receive ho raha hai
  const { input } = req.query;

  if (!input) {
    return res.status(400).json({ message: "Input query required" });
  }

  try {

    // 🌍 External Maps API Call (Places Autocomplete API)
    // User input ke basis par location suggestions fetch kar rahe hain
    const suggestions = await mapsService.getAutoCompleteSuggestions(input);

    // 📡 API response – frontend ko suggestions bhej rahe hain
    res.status(200).json(suggestions);

  } catch (error) {

    console.error(error);

    // ❌ Error response agar suggestions fetch na ho paaye
    res.status(500).json({
      message: "Failed to fetch suggestions",
    });
  }
};