import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setconfirmRidePanel(false);
        }}
      >
        <i className=" text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl fint-semibold mb-5">Confirm your ride</h3>
      <div className='flex gap-2 justify-between flex-col items-center'>
        <img className='h-20 ' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" alt="car img" />
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>drive location</h3>
              <p className='text-sm -mt-1 text-grey-600'>drive location</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-user-location-line"></i>
            <div>
              <h3 className='text-lg font-medium'>user location</h3>
              <p className='text-sm -mt-1 text-grey-600'>User location</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>193.20</h3>
              <p className='text-sm -mt-1 text-grey-600'>Payment</p>
            </div>
          </div>
        </div>
        <button onClick={() => {
          props.setvehicleFound(true)
          props.setconfirmRidePanel(false)
        }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ConfirmRide