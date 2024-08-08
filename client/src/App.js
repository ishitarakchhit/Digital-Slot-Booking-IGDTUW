import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { StudentRegister } from "./pages/auth/StudentRegister.js";
import { StudentLogin } from "./pages/auth/StudentLogin.js";
import { AdminLogin } from "./pages/auth/AdminLogin.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/studentlogin" element={<StudentLogin />}></Route>
        <Route path="/studentregister" element={<StudentRegister />}></Route>
        <Route path="/adminlogin" element={<AdminLogin />}></Route>
      </Routes>
    </>
  );
}

export default App;
