import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/UserLogin");
    }
  }, []);

  return <>{children}</>;
};

export default UserProtectedWrapper;
