import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { StudentRegister } from "./pages/auth/StudentRegister.js";
import { StudentLogin } from "./pages/auth/StudentLogin.js";
import { AdminLogin } from "./pages/auth/AdminLogin.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute.js";
import PublicRoute from "./components/Routes/PublicRoute.js";
import Venue from "./pages/Venue.js";
import UserDashboard from "./pages/UserDashboard.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import Team from "./pages/Team.js";
import About from "./pages/About.js";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/team"
          element={
            <PublicRoute>
              <Team />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <PublicRoute>
              <About />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/venue"
          element={
            <ProtectedRoute>
              <Venue />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/studentlogin"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/studentregister"
          element={
            <PublicRoute>
              <StudentRegister />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/adminlogin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
