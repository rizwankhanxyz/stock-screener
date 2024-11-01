import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [alias, setAlias] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/customer/auth",
          {
            withCredentials: true,
          }
        );
        setAuth(true);
        setUserRole(data.role);
        setAlias(data.alias);
        console.log(data.alias);    
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
          <Route
            path="/"
            element={
              auth && userRole === "customer" ? (
                <Home
                  setAuth={setAuth}
                  alert={alert}
                  setUserRole={setUserRole}
                  loading={loading}
                  setLoading={setLoading}
                  setAlias={setAlias}
                  alias={alias}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin"
            element={
              auth && userRole === "admin" ? (
                <Admin
                  setAuth={setAuth}
                  setLoading={setLoading}
                  loading={loading}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
