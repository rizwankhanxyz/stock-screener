import React, { useState } from "react";

//Component
import Alert from "./Alert";

function Register() {
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={onSubmithandler}>
          <h1>Sign Up</h1>
          <hr />
          <div>
            <label htmlFor="fullname">
              <b>Full Name :</b>
            </label>
            <input
              type="text"
              placeholder="Jhone Doe"
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
              placeholder="jhonedoe@mail.co"
              name="email"
              onChange={onChangehanlder}
              required
            />
          </div>

          <div>
            <label htmlFor="password]">
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
              //   onChange={onChangehanlder}
              required
            />
          </div>

          <div className="clearfix">
            <button type="submit" className="signupbtn">
              Sign Up
            </button>
          </div>
          {/* <div>
            <p>
              Already have an account on Tasky, <Link to="/">Login</Link>.
            </p>
          </div> */}
        </form>
      </div>
    </>
  );
}

export default Register;
