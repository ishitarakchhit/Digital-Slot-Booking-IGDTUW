import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { StudentRegister } from "./pages/auth/StudentRegister.js";
import { StudentLogin } from "./pages/auth/StudentLogin.js";
import { AdminLogin } from "./pages/auth/AdminLogin.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute.js";
import PublicRoute from "./components/Routes/PublicRoute.js";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
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
