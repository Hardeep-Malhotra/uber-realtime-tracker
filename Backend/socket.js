const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // ===============================
    // JOIN EVENT (User / Captain)
    // ===============================

    socket.on("join", async (data) => {
      try {
        console.log("JOIN EVENT:", data);

        const { userId, userType } = data;

        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });

          console.log("User socket saved:", socket.id);
        }

        if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });

          console.log("Captain socket saved:", socket.id);
        }
      } catch (error) {
        console.log("Join Error:", error);
      }
    });

    // ===============================
    // CAPTAIN LOCATION UPDATE
    // ===============================

    socket.on("update-location-captain", async (data) => {
      try {
        const { userId, location } = data;

        if (!location || !location.lat || !location.lng) {
          return socket.emit("error", {
            message: "Invalid location data",
          });
        }

        await captainModel.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: [location.lng, location.lat],
          },
        });
      } catch (error) {
        console.log("Location Update Error:", error);
      }
    });

    // ===============================
    // USER CREATED NEW RIDE
    // ===============================

    socket.on("new-ride", async (data) => {
      console.log("New ride request:", data);

      const captains = await captainModel.find({
        // status: "active",
      });

      console.log("Active captains:", captains);

      captains.forEach((captain) => {
        console.log("Captain:", captain._id);
        console.log("Captain socket:", captain.socketId);

        if (captain.socketId) {
          console.log("Sending ride to captain:", captain.socketId);

          io.to(captain.socketId).emit("new-ride", data);
        }
      });
    });
    // ===============================
    // CAPTAIN ACCEPTED RIDE
    // ===============================

    socket.on("ride-accepted", async (data) => {
      try {
        console.log("Ride accepted:", data);

        const { userId, captain } = data;

        const user = await userModel.findById(userId);

        if (user?.socketId) {
          io.to(user.socketId).emit("ride-confirmed", {
            captain,
          });
        }
      } catch (error) {
        console.log("Ride Accept Error:", error);
      }
    });

    // ===============================
    // CAPTAIN REJECTED RIDE
    // ===============================

    socket.on("ride-rejected", async (data) => {
      console.log("Ride rejected:", data);
    });

    // ===============================
    // DISCONNECT
    // ===============================

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

// ==================================
// SEND MESSAGE TO SPECIFIC SOCKET
// ==================================

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log("Sending socket message:", messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
