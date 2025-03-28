import React, { useEffect, useState, useRef } from "react";
import "../styles/Navbar.css";
import Profile from "./Profile";
// import Loader from "./Loader";

function Navbar({ setAuth, setUserRole }) {
  const [alias, setAlias] = useState("");
  const [profileContainer, setProfileContainer] = useState(false);
  const profileRef = useRef(null); // Reference to the profile container

  useEffect(() => {
    const storedAlias = localStorage.getItem("fullname");
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
        <h4 className="alias">
          As-salamu Alaykum
        </h4>
        <h4 className="alias" style={{ marginRight: "10px", cursor: "pointer" }} >
          <i onClick={onClickHandlerProfile} className="bi bi-person-circle" style={{ color: " #6a9e4a" }}></i> {alias}
        </h4>
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
