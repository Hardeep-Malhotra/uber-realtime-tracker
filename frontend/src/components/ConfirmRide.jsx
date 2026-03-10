
import React from "react";

const ConfirmRide = (props) => {
  const vehicleImages = {
    car: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n",
    moto: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Confirm your ride</h3>

      <div className="flex flex-col items-center">
        <img
          className="h-20"
          src={vehicleImages[props.vehicleType]}
          alt="vehicle"
        />

        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <div>
              <h3 className="text-lg font-medium">{props.pickup}</h3>
              <p className="text-sm text-gray-600">Pickup Location</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <div>
              <h3 className="text-lg font-medium">{props.destination}</h3>
              <p className="text-sm text-gray-600">Destination</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <div>
              <h3 className="text-lg font-medium">
                ₹{props.fare?.[props.vehicleType]}
              </h3>
              <p className="text-sm text-gray-600">Payment</p>
            </div>
          </div>
        </div>

        <button
          onClick={async () => {
            await props.createRide(props.vehicleType);

            props.setconfirmRidePanel(false);
            props.setvehicleFound(true);
          }}
          className="w-full mt-5 bg-green-600 text-white p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
