import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "../styles/Navbar.css";
import Profile from "./Profile";

import { useNavigate } from "react-router-dom";
// import Loader from "./Loader";

function Navbar({ setAuth, setUserRole }) {
  const [alias, setAlias] = useState("");
  const [profileContainer, setProfileContainer] = useState(false);
  const profileRef = useRef(null); // Reference to the profile container

  useEffect(() => {
    const storedAlias = localStorage.getItem("alias");
    setAlias(storedAlias || ""); // Set alias from localStorage

    // Add click event listener to detect clicks outside the profile container
    const handleOutsideClick = (event) => {
      if (
        profileContainer && // If the profile is open
        profileRef.current && // If the ref is defined
        !profileRef.current.contains(event.target) // If the clicked element is not inside the profile container
      ) {
        setProfileContainer(false);
        document.body.style.overflow = "auto"; // Re-enable scrolling
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [profileContainer]);

  const navigate = useNavigate();

  //Open profile container
  const onClickHandlerProfile = (e) => {
    e.preventDefault();
    setProfileContainer((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "auto"; // Prevent background scroll
      return newState;
    });
  }
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
          {/* <div className="alias" style={{marginRight: "10px", cursor: "pointer"}}> */}
          <h4 className="alias">
            Assalamu Alaykum
          </h4>
          <h4 className="alias" style={{ marginRight: "10px", cursor: "pointer" }} onClick={onClickHandlerProfile}>
            {alias} <i className="bi bi-person-circle" style={{ color: " #6a9e4a" }}></i>
          </h4>
          {/* </div> */}

          {/* <h3 className="logout"
            onClick={onClickHandler}
            style={{ marginRight: "10px", cursor: "pointer" }}
          >
            <i className="bi bi-power"></i>
          </h3> */}
        </div>
      </div>

      {profileContainer && (
        <div ref={profileRef}>
          <Profile onClose={() => setProfileContainer(false)} />
        </div>
      )}
    </>
  );
}

export default Navbar;
