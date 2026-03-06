import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=" text-lg font-medium ri-home-heart-fill"></i>
        </Link>
       <div className='h-1/2'>
         <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber map"
        />
       </div>
       <div className='h-1/2 p-5'>
                  <div className="flex items-center justify-between">
        <img
          className="h-12 "
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt="car img"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">Driver</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">gadi ka number</h4>
          <p className="text-sm twxt-gray-600">gadi ka name</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
        
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-user-location-line"></i>
            <div>
              <h3 className="text-lg font-medium">user location</h3>
              <p className="text-sm -mt-1 text-grey-600">User location</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium">193.20</h3>
              <p className="text-sm -mt-1 text-grey-600">Payment</p>
            </div>
          </div>
        </div>
      </div>
            <button
            className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'
            >make a payment</button>
       </div>
    </div>
  )
}

export default Riding