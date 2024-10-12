import React, { useState } from "react";
import { Link } from "react-router-dom";

//Component, styles, pages
import Alert from "../components/Alert";
import "../styles/Register.css";

function Login({ alert, showAlert }) {
  const [registeredData, setRegistereddata] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChangehanlder = (e) => {
    try {
      setRegistereddata({
        ...registeredData,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmithandler = (e) => {
    try {
      e.preventDefault();
      if (registeredData.password !== registeredData.passwordR) {
        showAlert({
          type: "danger",
          msg: "Passwords do not match",
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle between true and false
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={onSubmithandler}>
          <img src="./se-logo.png" alt="" />
          <h1><b>Assalamu Alaykum</b></h1>
          <h6>Welcome to Shairah Equities!</h6>
          {/* <hr /> */}
          <div className="input-group">
            <i className="bi bi-envelope-at"></i>
            <input
              type="email"
              placeholder="Registered Email Id"
              name="email"
              onChange={onChangehanlder}
              required
            />
          </div>
          <div className="input-group">
            <i class="bi bi-shield-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Validate Password"
              name="password"
              onChange={onChangehanlder}
              required
            />
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} show-password`} 
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          <Alert alert={alert} />
          <div>
            <button type="submit" className="signupbtn">
              Login
            </button>
          </div>
          <div>
            <h6>
              Don't have an account with us, <Link to="/register">Register</Link> here.
            </h6>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
