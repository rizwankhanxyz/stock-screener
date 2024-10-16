import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

//Styles, Pages, Components
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  const [alert, setAlert] = useState(null);

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
          <Route path="/register" element={<Register alert={alert} showAlert={showAlert} />} />
          <Route path="/login" element={<Login alert={alert} showAlert={showAlert} />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
