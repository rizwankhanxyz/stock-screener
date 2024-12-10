import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//Component, styles
import Alert from "../components/Alert";
import "../styles/Register.css";

function Register({ alert, showAlert }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [registeredData, setRegistereddata] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    password: "",
    passwordR: "",
  });

  const onChangeHanlder = (e) => {
    try {
      setRegistereddata({
        ...registeredData,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (registeredData.password !== registeredData.passwordR) {
        showAlert({
          type: "danger",
          msg: "Passwords do not match",
        });
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/api/customer/register",
          // "https://sss.rizwankhan.xyz/api/customer/register",
          registeredData
        );
        showAlert({
          type: "success",
          msg: data.success,
        });
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error) {
        const backendErrors = error.response.data.error;
        if (Array.isArray(backendErrors)) {
          // If the backend sends multiple validation errors
          backendErrors.forEach((err) => {
            showAlert({
              type: "danger",
              msg: err.msg, // Show each error message from the backend
            });
          });
        } else {
          // If there's a single error (e.g., an email already exists)
          showAlert({
            type: "danger",
            msg: backendErrors,
          });
        }
      } else {
        showAlert({
          type: "danger",
          msg: "Something went Wrong, Please try again in sometime.",
        });
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
        <div className="form-container">
          <form onSubmit={onSubmitHandler}>
            <img src="./se-logo.png" alt="se-logo" />
            <h6>Please fill out the form to join us!</h6>

            {/* <hr /> */}
            <div className="input-group">
              <i className="bi bi-person-add other-icons"></i>
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={onChangeHanlder}
                required
              />
            </div>
            <div className="input-group">
              <i className="bi bi-telephone other-icons"></i>
              <input
                type="tel"
                placeholder="Phone"
                name="phonenumber"
                onChange={onChangeHanlder}
                required
              />
            </div>
            <div className="input-group">
              <i className="bi bi-envelope-at other-icons"></i>
              <input
                type="email"
                placeholder="Email Id"
                name="email"
                onChange={onChangeHanlder}
                required
              />
            </div>
            <div className="input-group">
              <i className="bi bi-shield-lock other-icons"></i>
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Password"
                name="password"
                onChange={onChangeHanlder}
                required
              />
              <i
                className={`bi ${
                  showPassword ? "bi-eye-slash" : "bi-eye"
                } show-password`}
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  left: "18rem",
                }}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <div className="input-group">
              <i className="bi bi-shield-check other-icons"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                name="passwordR"
                onChange={onChangeHanlder}
                required
              />
            </div>
            <div>
              <button type="submit" className="signupbtn">
                Register
              </button>
            </div>
            <div>
              <h6>
                Already have an account with us? <Link to="/login">Login</Link>{" "}
                here.
              </h6>
            </div>
            <Alert alert={alert} />
          </form>
        </div>
    </>
  );
}

export default Register;
