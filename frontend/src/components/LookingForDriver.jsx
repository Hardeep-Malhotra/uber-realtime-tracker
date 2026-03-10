

import React from "react";

function LookingForDriver({ ride, setvehicleFound }) {
  const vehicleImages = {
    car: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n",
    moto: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setvehicleFound(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src={vehicleImages[ride?.vehicleType]}
          alt="vehicle"
        />

        <div className="w-full mt-5">
          {/* PICKUP */}

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>

            <div>
              <h3 className="text-lg font-medium">{ride?.pickup}</h3>

              <p className="text-sm -mt-1 text-gray-600">Pickup Location</p>
            </div>
          </div>

          {/* DESTINATION */}

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-user-location-line"></i>

            <div>
              <h3 className="text-lg font-medium">{ride?.destination}</h3>

              <p className="text-sm -mt-1 text-gray-600">Destination</p>
            </div>
          </div>

          {/* PRICE */}

          <div className="flex items-center gap-5 p-3">
            <i className="ri-money-rupee-circle-fill"></i>

            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>

              <p className="text-sm -mt-1 text-gray-600">Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LookingForDriver;
