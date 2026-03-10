
import React from "react";

const CaptainDetails = ({ captain }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={
              captain?.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="captain"
          />

          <div>
            <h4 className="text-lg font-semibold">
              {captain?.fullname?.firstname} {captain?.fullname?.lastname}
            </h4>

            <p className="text-sm text-gray-600">
              {captain?.vehicle?.color} {captain?.vehicle?.vehicleType}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold">₹259.2</h4>
          <p className="text-sm text-gray-600">earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-8  bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
