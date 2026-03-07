import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {

    const [FinishRidePanel, setFinishRidePanel] = useState(false)
    const FinishRideRef = useRef(null)

    useGSAP(
        function () {
            if (FinishRidePanel) {
                gsap.to(FinishRideRef.current, {
                    transform: "translateY(0%)",
                });
            } else {
                gsap.to(FinishRideRef.current, {
                    transform: "translateY(100%)",
                });
            }
        },
        [FinishRidePanel],
    );


    return (
        <div className='h-screen'>
            <div className='fixed p-7 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="uber map"
                />
            </div>
            <div className='h-1/5 p-6 bg-yellow-400 relative flex items-center justify-between '

                onClick={() => {
                    setFinishRidePanel(true)
                }}
            >
                <h5
                    className="p-1 text-center w-[85%] absolute top-0"
                    onClick={() => {

                    }}
                >
                    <i className=" text-3xl text-gray-500 ri-arrow-up-wide-fill"></i>

                </h5>
                <h4 className='text-xl font-semibold '>4km Away </h4>
                <button className='  bg-green-600 px-10 text-white font-semibold p-3 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={FinishRideRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 pt-14 py-6">
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding