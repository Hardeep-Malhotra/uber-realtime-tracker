import React from "react";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const RidePopUP = ({ ride, setridePopupPanel, setConfirmRidePopUPPanel }) => {
  if (!ride) return null;

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setridePopupPanel(false)}
      >
        <i className=" text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

      {/* USER INFO */}

      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-xl mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-11 w-11 rounded-full object-cover"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          />

          <h2 className="text-lg font-medium">
            {ride.user?.fullname?.firstname} {ride.user?.fullname?.lastname}
          </h2>
        </div>

        <h5 className="text-lg font-semibold m-3">
          {ride.distance || "2.2"} km
        </h5>
      </div>

      {/* LOCATION */}

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>

            <div>
              <h3 className="text-lg font-medium">{ride.pickup}</h3>

              <p className="text-sm text-grey-600">Pickup Location</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-user-location-line"></i>

            <div>
              <h3 className="text-lg font-medium">{ride.destination}</h3>

              <p className="text-sm text-grey-600">Destination</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <i className="ri-money-rupee-circle-fill"></i>

            <div>
              <h3 className="text-lg font-medium">₹ {ride.fare}</h3>

              <p className="text-sm text-grey-600">Payment</p>
            </div>
          </div>
        </div>

        <div className="flex mt-5 w-full items-center justify-between">
          <button
            onClick={() => {
              socket.emit("ride-rejected", {
                rideId: ride._id,
              });

              setridePopupPanel(false);
            }}
            className="bg-gray-300 px-10 text-gray-700 font-semibold p-3 rounded-lg"
          >
            Ignore
          </button>

          <button
            onClick={() => {
              socket.emit("ride-accepted", {
                userId: ride.user,
                captain: captain,
              });

              setridePopupPanel(false);
              setConfirmRidePopUPPanel(true);
            }}
            className="bg-green-600 px-10 text-white font-semibold p-3 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUP;
