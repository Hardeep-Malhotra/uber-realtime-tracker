import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CaptainLogout = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("captain-token");

    if (!token) {
      navigate("/captain-login");
      return;
    }

    const logout = async () => {

      try {

        await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem("captain-token");

        toast.success("Captain logged out 👋");

        navigate("/captain-login");

      } catch {

        localStorage.removeItem("captain-token");

        navigate("/captain-login");

      }

    };

    logout();

  }, [navigate]);

  return <div>Logging out...</div>;
};

export default CaptainLogout;