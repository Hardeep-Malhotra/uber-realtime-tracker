import React, { useRef, useState, useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import toast from "react-hot-toast";
import axios from "axios";

import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import ConfirmRidePopUP from "../components/ConfirmRidePopUP";
import { SocketContext } from "../context/SocketContext";
const Home = () => {
  const { socket } = useContext(SocketContext);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [confirmRidePopUPPanel, setConfirmRidePopUPPanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [query, setQuery] = useState("");

  const [fare, setFare] = useState({});
  const [duration, setDuration] = useState(0);
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const confirmRidePopUPRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  /* Panel Animation */

  useGSAP(() => {
    if (!panelRef.current) return;

    if (panelOpen) {
      gsap.to(panelRef.current, { height: "70%", padding: 26 });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: "0%", padding: 0 });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  /* Vehicle Panel */

  useGSAP(() => {
    if (!vehiclePanelRef.current) return;

    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelOpen ? "translateY(0%)" : "translateY(100%)",
    });
  }, [vehiclePanelOpen]);

  /* Confirm Ride Panel */

  useGSAP(() => {
    if (!confirmRidePanelRef.current) return;

    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanelOpen ? "translateY(0%)" : "translateY(100%)",
    });
  }, [confirmRidePanelOpen]);

  /* Looking For Driver */

  useGSAP(() => {
    if (!vehicleFoundRef.current) return;

    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0%)" : "translateY(100%)",
    });
  }, [vehicleFound]);

  /* Waiting For Driver */

  useGSAP(() => {
    if (!waitingForDriverRef.current) return;

    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0%)" : "translateY(100%)",
    });
  }, [waitingForDriver]);

  /* Confirm Ride Popup */

  useGSAP(() => {
    if (!confirmRidePopUPRef.current) return;

    gsap.to(confirmRidePopUPRef.current, {
      transform: confirmRidePopUPPanel ? "translateY(0%)" : "translateY(100%)",
    });
  }, [confirmRidePopUPPanel]);

  // ==========================
  // Find Trip
  // ==========================

  async function findTrip() {
    if (!pickup || !destination) {
      toast.error("Please select pickup and destination");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setFare(response.data.fare);
      setDuration(response.data.duration);

      setPanelOpen(false);
      setVehiclePanelOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      socket.emit("join", {
        userId: userData._id,
        userType: "user",
      });
    }
  }, []);
  // ==========================
  // Create Ride
  // ==========================

  async function createRide(vehicleType) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setRide(response.data);
      socket.emit("new-ride", response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    socket.on("ride-confirmed", (data) => {
      console.log("Driver Found", data);

      setVehicleFound(false);
      setConfirmRidePopUPPanel(true);
    });

    return () => {
      socket.off("ride-confirmed");
    };
  }, [socket]);

  
  return (
    <div className="h-screen relative overflow-hidden">
      {/* Logo */}

      <img
        className="w-16 absolute left-5 top-5 z-20"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt="uber logo"
      />

      {/* Map */}

      <img
        className="h-full w-full object-cover"
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt="uber map"
      />

      {/* Bottom Panel */}

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white p-6 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a Trip</h4>

          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
                setQuery("");
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setQuery(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a Pick-up location"
            />

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
                setQuery("");
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setQuery(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>

          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Ride
          </button>
        </div>

        {/* Location Panel */}

        <div ref={panelRef} className="h-[0%] bg-white">
          <LocationSearchPanel
            setpanaelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanelOpen}
            query={query}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehicle Panel */}

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 pt-12 py-10"
      >
        {/* <VehiclePanel
          createRide={createRide}
          fare={fare}
          duration={duration}
          setconfirmRidePanel={setConfirmRidePanelOpen}
          setVehiclePanel={setVehiclePanelOpen}
        /> */}
        <VehiclePanel
          setSelectedVehicle={setSelectedVehicle}
          fare={fare}
          duration={duration}
          setconfirmRidePanel={setConfirmRidePanelOpen}
          setVehiclePanel={setVehiclePanelOpen}
        />
      </div>

      {/* Confirm Ride */}

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 pt-14 py-6"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={selectedVehicle}
          createRide={createRide}
          setconfirmRidePanel={setConfirmRidePanelOpen}
          setvehicleFound={setVehicleFound}
        />
      </div>

      {/* Looking For Driver */}

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-40 bottom-0 translate-y-full bg-white px-3 pt-14 py-6"
      >
        <LookingForDriver ride={ride} setvehicleFound={setVehicleFound} />
      </div>

      {/* Confirm Ride Popup */}

      <div
        ref={confirmRidePopUPRef}
        className="fixed w-full z-50 bottom-0 translate-y-full bg-white px-3 pt-14 py-6"
      >
        <ConfirmRidePopUP
          ride={ride}
          setConfirmRidePopUPPanel={setConfirmRidePopUPPanel}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>

      {/* Waiting For Driver */}

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-60 bottom-0 translate-y-full bg-white px-3 pt-14 py-6"
      >
        <WaitingForDriver
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
