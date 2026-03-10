const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: "dsc4cqkdd",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "captains",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Multer upload
const upload = multer({ storage });

module.exports = upload;
