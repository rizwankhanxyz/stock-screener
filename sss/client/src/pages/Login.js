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
  const [showPassword, setShowPassword] = useState(true);

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
    } catch (error) {
      console.log(error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={onSubmithandler}>
          <img src="./se-logo.png" alt="se-logo" />
          <h1><strong>Assalamu Alaikum</strong></h1>
          <h6>Welcome to Shariah Equities!</h6>
          {/* <hr /> */}
          <div className="input-group">
            <i className="bi bi-envelope-at other-icons"></i>
            <input
              type="email"
              placeholder="Email Id"
              name="email"
              onChange={onChangehanlder}
              required
            />
          </div>
          <div className="input-group">
            <i className="bi bi-shield-lock other-icons"></i>
            <input
              type={showPassword ? "password": "text"}
              placeholder="Password"
              name="password"
              onChange={onChangehanlder}
              required
            />
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} show-password`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          <h6 className="forgot-password">Forgot Password?</h6>
          <Alert alert={alert} />
          <div>
            <button type="submit" className="signupbtn">
              Login
            </button>
          </div>
          <div>
            <h6>
              Don't have an account with us? <Link to="/register">Register</Link> here.
            </h6>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
