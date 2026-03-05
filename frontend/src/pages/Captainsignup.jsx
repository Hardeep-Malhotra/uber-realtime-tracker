<<<<<<< HEAD


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import toast from "react-hot-toast";

const Captainsignup = () => {

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();


  const validateCapacity = () => {

    const capacity = Number(vehicleCapacity);

    if (vehicleType === "moto" && capacity > 2) {
      toast.error("Moto capacity cannot exceed 2");
      return false;
=======
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Captainsignup = () => {
    const [first, setfirst] = useState('')
    const [second, setsecond] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ setuserdata] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
    
    const submitHandler = (e) => {
      e.preventDefault()
  
      setuserdata({
        fullName:{
          firstName: first,
          lastName: second
        },
        email: email,
        password: password
      })
      setEmail('')
      setPassword('')
      setfirst('')
      setsecond('')
      
  
      // Here you would typically handle form submission, e.g., send data to your backend API
      console.log('User Data on submit:', {
        username:{
          firstName: first,
          lastName: second
        },
        email: email,
        password: password
      })
>>>>>>> 62da80499ec5ee40f39bcd239da7347902412cab
    }

    if (vehicleType === "auto" && capacity > 3) {
      toast.error("Auto capacity cannot exceed 3");
      return false;
    }

    if (vehicleType === "car" && capacity > 5) {
      toast.error("Car capacity cannot exceed 5");
      return false;
    }

    if (vehicleType === "bus" && capacity > 60) {
      toast.error("Bus capacity cannot exceed 60");
      return false;
    }

    return true;
  };


  const submitHandler = async (e) => {

    e.preventDefault();

    if (!validateCapacity()) return;

    const newCaptain = {
      fullname: {
        firstname: first,
        lastname: second,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType,
      },
    };

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptain
      );

      if (response.status === 201) {

        const data = response.data;

        setCaptain(data.captain);

        localStorage.setItem("captain-token", data.token);

        toast.success("Captain account created 🚌");

        setTimeout(() => {
          navigate("/captain-home");
        }, 1000);
      }

    } catch (error) {

      console.log("Backend Error:", error.response?.data);

      toast.error("Captain registration failed ❌");

    }

    setFirst("");
    setSecond("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };


  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">

      <div>

        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />

        <form onSubmit={submitHandler}>

          <h3 className="text-lg font-medium mb-2">
            What's our Captain's name
          </h3>

          <div className="flex gap-4 mb-7">

            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg"
              type="text"
              placeholder="First name"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />

            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg"
              type="text"
              placeholder="Last name"
              value={second}
              onChange={(e) => setSecond(e.target.value)}
            />

          </div>


          <h3 className="text-lg font-medium mb-2">
            What's our Captain's email
          </h3>

          <input
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


          <h3 className="text-lg font-medium mb-2">
            Enter Password
          </h3>

          <input
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <h3 className="text-lg font-medium mb-2">
            Vehicle Information
          </h3>


          <div className="flex gap-4 mb-7">

            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />

            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />

          </div>


          <div className="flex gap-4 mb-7">

            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />


            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >

              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
              <option value="bus">Bus</option>

            </select>

          </div>


          <button className="bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg">
            Create Captain Account
          </button>

        </form>


        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Captainsignup;

