import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";

import { useNavigate } from "react-router-dom";
// import Loader from "./Loader";

function Navbar({ setAuth, setUserRole }) {
  const [alias, setAlias] = useState("");
  useEffect(() => {
    const storedAlias = localStorage.getItem("alias");
    setAlias(storedAlias || ""); // Set alias from localStorage
  }, []);
  const navigate = useNavigate();
  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/customer/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("alias");
      setAuth(false);
      setUserRole(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* {loading && <Loader />}
      {!loading && ( */}
      <div className="navbarcontainer">
        <div
          className="navbar navbar-dark bg-white"
          style={{
            paddingTop: "0.2rem",
            paddingBottom: "0.2rem",
          }}
        >
          <img
            style={{ marginLeft: "10px" }}
            src="./se-logo.png"
            alt="se-logo"
          />
          <h3 className="alias">
            Welcome, {alias} <i class="bi bi-person-circle"></i>
          </h3>
          <h3 className="logout"
            onClick={onClickHandler}
            style={{ marginRight: "10px", cursor: "pointer" }}
          >
            <i className="bi bi-power"></i>
          </h3>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default Navbar;
