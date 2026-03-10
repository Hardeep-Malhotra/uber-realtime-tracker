// const axios = require("axios");
// const captainModel = require('../models/captain.model')
// module.exports.getAddressCoordinate = async (address) => {
//   const apiKey = process.env.GOOGLE_MAPS_API_KEY;

//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     console.log(response.data);
//     if (response.data.status === "OK") {
//       const location = response.data.results[0].geometry.location;

//       return {
//         lat: location.lat,
//         lng: location.lng,
//       };
//     } else {
//       throw new Error("Unable to fetch coordinates");
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// module.exports.getDistanceTime = async (origin, destination) => {
//   if (!origin || !destination) {
//     throw new Error("Origin and destination required");
//   }

//   const apiKey = process.env.GOOGLE_MAPS_API_KEY;

//   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     console.log("GOOGLE RESPONSE:", response.data);
//     if (response.data.status === "OK") {
//       if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
//         throw new Error("No routes found");
//       }

//       return response.data.rows[0].elements[0];
//     } else {
//       throw new Error("Unable to fetch distance and time");
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };



// // module.exports.getAutoCompleteSuggestions = async (input) => {
// //   if (!input) {
// //     throw new Error("Query is required");
// //   }

// //   const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// //   const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

// //   try {
// //     const response = await axios.get(url);

// //     if (response.data.status === "OK") {
// //       return response.data.predictions;
// //     } else {
// //       throw new Error("Unable to fetch suggestions");
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     throw error;
// //   }
// // };




// module.exports.getAutoCompleteSuggestions = async (input) => {

//   if (!input) {
//     throw new Error("Query is required");
//   }

//   const apiKey = process.env.GOOGLE_MAPS_API_KEY;

//   const url =
//     `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
//     `input=${encodeURIComponent(input)}` +
//     `&location=30.7333,76.7794` +   // optional location bias
//     `&radius=50000` +
//     `&components=country:in` +
//     `&key=${apiKey}`;

//   try {

//     const response = await axios.get(url);

//     if (response.data.status !== "OK" && response.data.status !== "ZERO_RESULTS") {
//       throw new Error(response.data.error_message || "Google API error");
//     }

//     return response.data.predictions;

//   } catch (error) {

//     console.error("Autocomplete Error:", error.message);

//     throw error;

//   }

// };


// module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {

//     const captains = await captainModel.find({
//         location: {
//             $geoWithin: {
//                 $centerSphere: [[lng, lat], radius / 6371]
//             }
//         }
//     });

//     return captains;
// };



// 📡 Axios library – external APIs (Google Maps API) se HTTP request bhejne ke liye
const axios = require("axios");

// 📦 Captain MongoDB model – database se captains fetch karne ke liye
const captainModel = require('../models/captain.model')



// 🌍 FUNCTION: Convert Address → Latitude & Longitude
// Google Maps Geocoding API use karke address ko coordinates me convert karta hai
module.exports.getAddressCoordinate = async (address) => {

  // 🔑 Google Maps API KEY environment variable se fetch ho rahi hai
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  // 🌐 Google Geocoding API endpoint
  // Address ko lat/lng me convert karne ke liye
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {

    // 📡 External API Request → Google Maps API
    const response = await axios.get(url);

    console.log(response.data);

    // ✅ Agar Google API successful response deta hai
    if (response.data.status === "OK") {

      const location = response.data.results[0].geometry.location;

      // 📤 Latitude & Longitude return kar rahe hain
      return {
        lat: location.lat,
        lng: location.lng,
      };

    } else {

      // ❌ Agar Google API se location nahi mili
      throw new Error("Unable to fetch coordinates");
    }

  } catch (error) {

    console.error(error);
    throw error;
  }
};



// 🌍 FUNCTION: Calculate Distance & Time
// Google Maps Distance Matrix API use karke origin → destination ka distance aur travel time nikalta hai
module.exports.getDistanceTime = async (origin, destination) => {

  if (!origin || !destination) {
    throw new Error("Origin and destination required");
  }

  // 🔑 Google Maps API KEY environment variable se fetch ho rahi hai
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  // 🌐 Google Distance Matrix API endpoint
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {

    // 📡 External API Request → Google Maps Distance Matrix API
    const response = await axios.get(url);

    console.log("GOOGLE RESPONSE:", response.data);

    if (response.data.status === "OK") {

      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }

      // 📤 Distance aur travel time frontend ko return kar rahe hain
      return response.data.rows[0].elements[0];

    } else {

      throw new Error("Unable to fetch distance and time");
    }

  } catch (error) {

    console.log(error);
    throw error;
  }
};




// 🌍 FUNCTION: Location Autocomplete Suggestions
// Google Places Autocomplete API use karke user ke typed location ke suggestions deta hai
module.exports.getAutoCompleteSuggestions = async (input) => {

  if (!input) {
    throw new Error("Query is required");
  }

  // 🔑 Google Maps API KEY environment variable se fetch ho rahi hai
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  // 🌐 Google Places Autocomplete API endpoint
  const url =
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
    `input=${encodeURIComponent(input)}` +
    `&location=30.7333,76.7794` +   // 📍 Location bias (India region)
    `&radius=50000` +
    `&components=country:in` +
    `&key=${apiKey}`;

  try {

    // 📡 External API Request → Google Places API
    const response = await axios.get(url);

    if (response.data.status !== "OK" && response.data.status !== "ZERO_RESULTS") {
      throw new Error(response.data.error_message || "Google API error");
    }

    // 📤 Location suggestions return kar rahe hain
    return response.data.predictions;

  } catch (error) {

    console.error("Autocomplete Error:", error.message);

    throw error;
  }

};



// 🚖 FUNCTION: Find Captains in Radius
// MongoDB Geo Query use karke nearby captains find karta hai
module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {

    // 📍 MongoDB geospatial query (GeoJSON)
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6371] // radius km → radians
            }
        }
    });

    // 📤 Nearby captains return kar rahe hain
    return captains;
};