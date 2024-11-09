import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
// import Loader from "./Loader";

function Navbar({
  setAuth,
  setUserRole,
  setAlias,
  alias,
}) {
  const navigate = useNavigate();
  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/customer/logout",
        {},
        { withCredentials: true }
      );
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
            style={{ marginLeft: "15px" }}
            src="./se-logo.png"
            alt="se-logo"
          />
          <h1 style={{ marginLeft: "15px" }}>{alias}</h1>
          <h1
            onClick={onClickHandler}
            style={{ marginRight: "15px", cursor: "pointer" }}
          >
            {/* <strong> */}
            <i className="bi bi-power"></i>
            {/* </strong> */}
          </h1>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default Navbar;
