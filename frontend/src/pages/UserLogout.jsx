import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function UserLogout() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {

        if (response.status === 200) {

          localStorage.removeItem("token");
          toast.success("User successfully logged out 👋");
          navigate("/user-login");

        }

      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return <div>Logging out...</div>;
}

export default UserLogout;