import React from "react";

const VehiclePanel = ({
  fare,
  duration,
  setSelectedVehicle,
  createRide,
  setconfirmRidePanel,
  setVehiclePanel,
}) => {
  const time = duration ? Math.round(duration) : 0;

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setVehiclePanel(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

      {/* CAR */}

      <div
        onClick={() => {
          setSelectedVehicle("car");
          setconfirmRidePanel(true);
          setVehiclePanel(false);
        }}
        className="flex border-2 active:border-black rounded-xl p-3 mt-2 items-center justify-between"
      >
        <img
          className="h-10"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
        />

        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Uber Go <i className="ri-user-fill"></i>4
          </h4>

          <h5 className="text-sm">{time} mins away</h5>

          <p className="text-xs text-gray-600">Affordable compact rides</p>
        </div>

        <h2 className="text-lg font-semibold mr-4">₹{fare?.car || 0}</h2>
      </div>

      {/* MOTO */}

      <div
        onClick={() => {
          setSelectedVehicle("moto");
          setconfirmRidePanel(true);
          setVehiclePanel(false);
        }}
        className="flex border-2 active:border-black rounded-xl p-3 mt-2 items-center justify-between"
      >
        <img
          className="h-14"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
          alt="auto"
        />

        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Moto <i className="ri-user-fill"></i>2
          </h4>

          <h5 className="text-sm">{time} mins away</h5>

          <p className="text-xs text-gray-600">Affordable bike rides</p>
        </div>

        <h2 className="text-lg font-semibold mr-4">₹{fare?.moto || 0}</h2>
      </div>

      {/* AUTO */}

      <div
        onClick={() => {
          setSelectedVehicle("auto");
          setconfirmRidePanel(true);
          setVehiclePanel(false);
        }}
        className="flex border-2 active:border-black rounded-xl p-3 mt-2 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
        />

        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Uber Auto <i className="ri-user-fill"></i>3
          </h4>

          <h5 className="text-sm">{time} mins away</h5>

          <p className="text-xs text-gray-600">Affordable auto rides</p>
        </div>

        <h2 className="text-lg font-semibold mr-4">₹{fare?.auto || 0}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
