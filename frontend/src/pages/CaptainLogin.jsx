import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import toast from "react-hot-toast";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("captain-token", data.token);
        toast.success("Captain logged in successfully 🚌");
        navigate("/captain-home");
      }
    } catch (error) {
      console.log("Backend Error:", error.response?.data);
      toast.error("Invalid email or password ❌");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex justify-between flex-col h-screen w-full">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber logo"
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg"
            placeholder="email@domain.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg"
            placeholder="Enter Password"
          />

          <button className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Join the fleet?{" "}
          <Link to="/captain-signup" className="text-blue-500 hover:underline">
            Register as a Captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/user-login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;