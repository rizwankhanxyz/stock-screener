import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Navbar({ setAuth, setUserRole, loading, setLoading }) {
  const navigate = useNavigate();
  const onClickHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setAuth(false);
    setUserRole(null);

    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 2000);
  };
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="navbarcontainer">
          <div
            className="navbar navbar-dark bg-white"
            style={{
              borderRadius: "1rem",
              paddingTop: "0.2rem",
              paddingBottom: "0.2rem",
            }}
          >
            <img style={{ marginLeft: "15px" }} src="./se-logo.png" alt="se-logo" />
            <h1 style={{ marginLeft: "15px" }}>Assalamu Alaikum</h1>
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
      )}
    </>
  );
}

export default Navbar;
