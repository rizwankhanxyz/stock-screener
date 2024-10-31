import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, Navigate } from "react";
import axios from "axios";
import { setupAxiosInterceptors } from "./api/axiosInterceptor";

//Styles, Pages, Components
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setupAxiosInterceptors(setAuth, setUserRole);
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/customer/auth",
          {
            withCredentials: true,
          }
        );
        setAuth(data.token);
        setUserRole(localStorage.getItem("role"));
      } catch (error) {
        console.log("Authentication check failed", error);
        setAuth(false);
        setUserRole(null);
      }
    };
    checkAuth();
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(null);
    }, 3500);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={<Register alert={alert} showAlert={showAlert} />}
          />
          {/* <Route path="/login" element={<Login alert={alert} showAlert={showAlert} />} /> */}
          <Route
            path="/login"
            element={
              auth ? (
                <Navigate to={userRole === "admin" ? "/admin" : "/"} />
              ) : (
                <Login
                  showAlert={showAlert}
                  setAuth={setAuth}
                  setUserRole={setUserRole}
                  loading={loading}
                  setLoading={setLoading}
                  alert={alert}
                />
              )
            }
          />
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={<Admin setLoading={setLoading} loading={loading} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
