import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUP from "../components/RidePopUP";
import ConfirmRidePopUP from "../components/ConfirmRidePopUP";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";

export default function CaptainHome() {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

 useEffect(() => {
  if (!captain?._id) return;

  socket.emit("join", {
    userId: captain._id,
    userType: "captain",
  });

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

      
;

        socket.emit("update-location-captain", {
          userId: captain._id,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });

        console.log("Captain location sent");
      });
    }
  };

  updateLocation();

  const locationInterval = setInterval(updateLocation, 10000);

  return () => clearInterval(locationInterval);

}, [captain, socket]);

//====================================
// Ride Socket Listener
//======================================
useEffect(() => {

  const handleNewRide = (data) => {
    console.log("New ride received", data);
    setRide(data);
    setridePopupPanel(true);
  };

  socket.on("new-ride", handleNewRide);

  return () => {
    socket.off("new-ride", handleNewRide);
  };

}, [socket]);
  useEffect(() => {
    socket.onAny((event, data) => {
      console.log("SOCKET EVENT:", event, data);
    });

    return () => {
      socket.offAny();
    };
  }, []);
if (captain?.socketId) {
  console.log("Sending ride to captain:", captain.socketId);
}
  console.log("Captain Data:", captain);

  useEffect(() => {
    const fetchCaptain = async () => {
      try {
        const token = localStorage.getItem("captain-token");

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCaptain(response.data.captain);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCaptain();
  }, []);

  const [ConfirmRidePopUPPanel, setConfirmRidePopUPPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const ConfirmRidePopUPPanelRef = useRef(null);

  const [ride, setRide] = useState(null);
  // const [ridePopupPanel, setridePopupPanel] = useState(true);
  const [ridePopupPanel, setridePopupPanel] = useState(false);

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
    <div className="h-screen">
      <div className="fixed p-7 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber map"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails captain={captain} />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 pt-14 py-6"
      >
        <RidePopUP
          ride={ride}
          setridePopupPanel={setridePopupPanel}
          setConfirmRidePopUPPanel={setConfirmRidePopUPPanel}
        />
      </div>
      <div
        ref={ConfirmRidePopUPPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 pt-14 py-6"
      >
        <ConfirmRidePopUP
          setConfirmRidePopUPPanel={setConfirmRidePopUPPanel}
          setridePopupPanel={setridePopupPanel}
        />
      </div>
    </div>
  );
}
