import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import toast from "react-hot-toast";
import driverLogo from "../images/uber-driver.svg";

const Captainsignup = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const validateCapacity = () => {
    const capacity = Number(vehicleCapacity);

    if (vehicleType === "moto" && capacity > 2) {
      toast.error("Moto capacity cannot exceed 2");
      return false;
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

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const formData = new FormData();

    formData.append("firstname", first);
    formData.append("lastname", second);
    formData.append("email", email);
    formData.append("password", password);

    formData.append("color", vehicleColor);
    formData.append("plate", vehiclePlate);
    formData.append("capacity", vehicleCapacity);
    formData.append("vehicleType", vehicleType);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    console.log(profileImage);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        formData,
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
  };

  return (
    <div className="py-2 px-4 h-screen flex flex-col justify-between">
      <div>
        <img className="w-20 mb-3" src={driverLogo} alt="uber driver" />

        <form onSubmit={submitHandler}>
          {/* NAME */}

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

          {/* EMAIL */}

          <h3 className="text-lg font-medium mb-2">Captain Email</h3>

          <input
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}

          <h3 className="text-lg font-medium mb-2">Password</h3>

          <input
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* PROFILE IMAGE */}

          <h3 className="text-lg font-medium mb-2">Captain Photo</h3>

          {preview && (
            <img
              src={preview}
              className="w-20 h-20 rounded-full object-cover mb-4"
              alt="preview"
            />
          )}

          <input
            type="file"
            accept="image/*"
            className="mb-7"
            onChange={(e) => {
              setProfileImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {/* VEHICLE INFO */}

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>

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
