import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Start from "./pages/Start";
import Riding from './pages/Riding'
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Home from "./pages/Home";
import UserLogout from "./pages/UserLogout";

import CaptainLogin from "./pages/CaptainLogin";
import Captainsignup from "./pages/Captainsignup";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogout from "./pages/CaptainLogout";

// Protected Wrappers
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectedWrapper";

const App = () => {
  return (
    <div>
      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Start Page */}
        <Route path="/" element={<Start />} />

        {/* User Authentication */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/Riding" element={<Riding/>} />

        {/* User Protected Routes */}
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

        {/* Captain Authentication */}
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<Captainsignup />} />

        {/* Captain Protected Routes */}
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />

        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
