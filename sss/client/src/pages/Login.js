import React, { useState } from "react";
import { Link } from "react-router-dom";

//Component, styles, pages
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
          <h2>Sign In</h2>
          <hr />
          <div>
            <label htmlFor="email">
              <b>Email :</b>
            </label>
            <input
              type="email"
              placeholder="jhondoe@mail.globe"
              name="email"
              onChange={onChangehanlder}
              required
            />
          </div>
          <div>
            <label htmlFor="password">
              <b>Password :</b>
            </label>
            <input
              type="password"
              placeholder="************"
              name="password"
              onChange={onChangehanlder}
              required
            />
          </div>
          <Alert alert={alert} />
          <div>
            <button type="submit" className="signupbtn">
              Sign Up
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

export default Register;
