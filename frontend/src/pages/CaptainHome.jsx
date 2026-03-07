import React,{useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import CaptainDetails from "../components/CaptainDetails"
import RidePopUP from "../components/RidePopUP"
import ConfirmRidePopUP from '../components/ConfirmRidePopUP';

export default function CaptainHome() {

  const [ridePopupPanel, setridePopupPanel] = useState(true)
  const [ConfirmRidePopUPPanel, setConfirmRidePopUPPanel] = useState(false)
  
  const ridePopupPanelRef = useRef(null)
  const ConfirmRidePopUPPanelRef = useRef(null)

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel],
  );

  useGSAP(
    function () {
      if (ConfirmRidePopUPPanel) {
        gsap.to(ConfirmRidePopUPPanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(ConfirmRidePopUPPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ConfirmRidePopUPPanel],
  );

  return (
    <div className='h-screen'>
       <div className='fixed p-7 top-0 flex items-center justify-between w-screen'>
           <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
           <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
               <i className="text-lg font-medium ri-logout-box-r-line"></i>
           </Link>
       </div>
       <div className='h-3/5'>
         <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber map"
        />
       </div>
       <div className='h-2/5 p-6'>
          <CaptainDetails/>
       </div>
       <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 pt-14 py-6">
           <RidePopUP setridePopupPanel={setridePopupPanel} setConfirmRidePopUPPanel={setConfirmRidePopUPPanel} />
      </div>
      <div ref={ConfirmRidePopUPPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 pt-14 py-6">
           <ConfirmRidePopUP setConfirmRidePopUPPanel={setConfirmRidePopUPPanel} setridePopupPanel={setridePopupPanel}/>
      </div>


    </div>
  )
}
