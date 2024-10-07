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
          <h2>Sign Up</h2>
          <hr />
          <div>
            <label htmlFor="fullname">
              <b>Full Name :</b>
            </label>
            <input
              type="text"
              placeholder="Jhon Doe"
              name="fullname"
              onChange={onChangehanlder}
              required
            />
          </div>
          <div>
            <label htmlFor="phonenumber">
              <b>Phone :</b>
            </label>
            <input
              type="tel"
              placeholder="8888 888 888"
              name="phonenumber"
              onChange={onChangehanlder}
              required
            />
          </div>
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
            <label htmlFor="paswwordR">
              <b>Repeat Password :</b>
            </label>
            <input
              type="password"
              placeholder="************"
              name="paswwordR"
              onChange={onChangehanlder}
              required
            />
          </div>
          <div>
            <button type="submit" className="signupbtn">
              Sign Up
            </button>
          </div>
          <div>
            <h6>
              Already have an account on with us, <Link to="/login">Login</Link>{" "}
              here.
            </h6>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
