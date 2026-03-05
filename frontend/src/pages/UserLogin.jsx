import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useContext(UserDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData,
      );

      if (response.status === 200) {
        const data = response.data;

        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast.success("User successfully logged in.");
          setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password ❌");
     s } else if (error.response?.status === 404) {
        toast.error("User not found ⚠️");
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      console.log("Login Error:", error);
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

        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            name="email"
            id="email"
            placeholder="email@domain.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            name="password"
            id="password"
            placeholder="Enter Password"
          />

          <button className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">
            login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?
          <Link to="/UserSignup" className="text-blue-500 hover:underline">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
