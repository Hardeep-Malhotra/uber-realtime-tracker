import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import toast from "react-hot-toast";
const UserSignup = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: first,
        lastname: second,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser,
      );

      if (response.status === 201) {
        const data = response.data;

        setUser(data.user);
      
        localStorage.setItem("token", data.token);

        toast.success("User successfully registered 🎉");

        
          navigate("/home");
      
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("User already exist. Please login.");
      } else {
        console.log("Signup Error:", error);
      }
    }

    setFirst("");
    setSecond("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="p-7 flex justify-between flex-col h-screen w-full">
        <div>
          <img
            className="w-16 mb-10"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="uber logo"
          />

          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-medium mb-2">What's your First Name</h3>

            <div className="flex gap-4 mb-6">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg"
                type="text"
                placeholder="First Name"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />

              <input
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg"
                type="text"
                placeholder="Last Name"
                value={second}
                onChange={(e) => setSecond(e.target.value)}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email</h3>

            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>

            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-black text-white py-3 rounded mt-5">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?
            <Link to="/user-login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-tight text-gray-500 text-center mt-4">
            This site is protected by reCAPTCHA and the
            <span className="underline"> Google Privacy Policy </span>
            and
            <span className="underline"> Terms of Service</span>
            apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
