import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import "../styles/Register.css";
import axios from "axios";

function Login({ alert, showAlert, setAuth, setUserRole }) {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);

  const onChangehanlder = (e) => {
    try {
      setUserLogin({
        ...userLogin,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/customer/login",
        userLogin,
        {
          withCredentials: true, // important for cookies
        }
      );
      if (data.success) {
        showAlert({
          type: "success",
          msg: data.success,
        });
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`; // Set Authorization header
        setAuth(true);
        setUserRole(data.role);
        setTimeout(() => {
          navigate(data.role === "admin" ? "/admin" : "/");
        }, 3500);
      }
    } catch (error) {
      console.log(error);
      showAlert({
        type: "danger",
        msg: error.response.data.error,
      });
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
          {/* <h1>
            <strong>Assalamu Alaikum</strong>
          </h1> */}
          <h3 style={{marginTop:"1rem"}}>Welcome to Shariah Equities!</h3>
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
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              name="password"
              onChange={onChangehanlder}
              required
            />
            <i
              className={`bi ${
                showPassword ? "bi-eye-slash" : "bi-eye"
              } show-password`}
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
              Don't have an account with us?{" "}
              <Link to="/register">Register</Link> here.
            </h6>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
