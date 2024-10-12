import React, { useState } from "react";
import { Link } from "react-router-dom";

//Component, styles
import Alert from "../components/Alert";
import "../styles/Register.css";

function Register({ alert, showAlert }) {
  const [registeredData, setRegistereddata] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    password: "",
    passwordR: "",
  });

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
  return (
    <>
      <div className="form-container">
        <form onSubmit={onSubmithandler}>
          <img src="./se-logo.png" alt="se-logo" />
          <hr />
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              onChange={onChangehanlder}
              required
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone"
              name="phonenumber"
              onChange={onChangehanlder}
              required
            />
          </div>
          <div>

            <input
              type="email"
              placeholder="Email Id"
              name="email"
              onChange={onChangehanlder}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChangehanlder}
              required
            />
          </div>
          <Alert alert={alert} />
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              name="paswwordR"
              onChange={onChangehanlder}
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
              Already have an account with us, <Link to="/login">Login</Link> here.
            </h6>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
