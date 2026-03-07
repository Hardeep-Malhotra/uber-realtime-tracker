import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className=" text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl fint-semibold mb-5">Choose a Vehicle</h3>
      <div onClick={() => {
        props.setconfirmRidePanel(true)
        props.setVehiclePanel(false);
      }} className="flex border-2 active:border-black rounded-xl p-3 pl-3 mt-2 w-full  items-center justify-between">
        <img
          className="h-10"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt="uber car"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Uber Go{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-gray-600 text-xs ">
            {" "}
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold mr-4">$20</h2>
      </div>
      <div onClick={() => {
        props.setconfirmRidePanel(true)
        props.setVehiclePanel(false);
      }} className="flex border-2 active:border-black rounded-xl p-3 pl-3 mt-2 w-full  items-center justify-between">
        <img
          className="h-16"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
          alt="uber car"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-fill"></i>2
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-gray-600 text-xs ">
            {" "}
            Affordable, Moter Cycle ride rides
          </p>
        </div>
        <h2 className="text-lg font-semibold mr-4">$11</h2>
      </div>
      <div onClick={() => {
        props.setconfirmRidePanel(true)
        props.setVehiclePanel(false);
      }} className="flex border-2 active:border-black rounded-xl p-3 pl-3 mt-2 w-full  items-center justify-between">
        <img
          className="h-12"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt="uber car"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-gray-600 text-xs ">
            {" "}
            Affordable, Auto cycle ride rides
          </p>
        </div>
        <h2 className="text-lg font-semibold mr-4">$9</h2>
      </div>
    </div>
  )
}

export default VehiclePanel