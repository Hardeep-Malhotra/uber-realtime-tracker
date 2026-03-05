
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// routes
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Captainsignup from "./pages/Captainsignup";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>

      {/* Toast popup container */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/UserSignup" element={<UserSignup />} />
        <Route path="/CaptainLogin" element={<CaptainLogin />} />
        <Route path="/Captainsignup" element={<Captainsignup />} />

        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />

        <Route
          path="/users/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />

      </Routes>
    </div>
  );
};

export default App;