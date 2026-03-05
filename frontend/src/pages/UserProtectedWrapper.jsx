import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserDataContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/user-login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("PROFILE RESPONSE:", response.data);

        setUser(response.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log("PROFILE ERROR:", error);

        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/user-login");
        }
      });
  }, []);

  if (isLoading) {
    return <h2>Checking authentication...</h2>;
  }

  return children;
};

export default UserProtectedWrapper;
