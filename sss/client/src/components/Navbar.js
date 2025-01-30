import React, { useEffect, useState, useRef } from "react";
import "../styles/Navbar.css";
import Profile from "./Profile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Loader from "./Loader";

function Navbar({ setAuth, setUserRole }) {
  const navigate = useNavigate();
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


  //Open profile container
  const onClickHandlerProfile = (e) => {
    e.preventDefault();
    setProfileContainer((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "auto"; // Prevent background scroll
      return newState;
    });
  }

  return (
    <>
      {/* {loading && <Loader />}
      {!loading && ( */}
      <div
        className="navbar navbar-dark bg-white">
        <img
          style={{ marginLeft: "10px" }}
          src="./se-logo.png"
          alt="se-logo"
        />
        {/* <div className="alias" style={{marginRight: "10px", cursor: "pointer"}}> */}
        <h4 className="alias">
          As-salamu alaykum
        </h4>
        <h4 className="alias" style={{ marginRight: "10px", cursor: "pointer" }} >
          <i onClick={onClickHandlerProfile} className="bi bi-person-circle" style={{ color: " #6a9e4a" }}></i> {alias}
          <i onClick={onClickHandler}
            className="bi bi-power" style={{ fontSize: "larger" }}></i>
        </h4>
        {/* <h3 className="logout"
            style={{ marginRight: "10px", cursor: "pointer" }}
          >
          </h3> */}
      </div>

      {profileContainer && (
        <div ref={profileRef}>
          <Profile setAuth={setAuth} setUserRole={setUserRole} onClose={() => setProfileContainer(false)} />
        </div>
      )}
    </>
  );
}

export default Navbar;
