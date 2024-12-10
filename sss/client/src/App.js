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
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/customer/auth",
          // "https://sss.rizwankhan.xyz/api/customer/auth",
          {
            withCredentials: true,
          }
        );
        setAuth(true);
        setUserRole(data.role);
      } catch (error) {
        //Alert required here
        setAuth(false);
        setUserRole(null);
      }
    };
    checkAuth();

    const getStocks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/data/get"
          // "https://sss.rizwankhan.xyz/api/admin/data/get"
        );
        setStocks(data);
      } catch (error) {
        console.log(error.response.data.error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    getStocks();
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
                  stocks={stocks}
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
                  stocks={stocks}
                  setStocks={setStocks}
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
