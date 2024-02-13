import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setToken, setUser }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((credentials) => ({
      ...credentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );

      if (response.data.success === true) {
        const token = response.data.accessToken;
        const user = response.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        setToken(token); 
        setUser(user);
        setSubmitted(true);
        setValid(true);
        setLoginStatus("success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setValid(false);
        setSubmitted(true);
        setLoginStatus("failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setValid(false);
      setSubmitted(true);
      setLoginStatus("error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {!valid && (
            <input
              className="form-field"
              type="email"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          )}

          {submitted && !credentials.email && (
            <span id="email-error">Please enter an email address</span>
          )}

          {!valid && (
            <input
              className="form-field"
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          )}

          {submitted && !credentials.password && (
            <span id="password-error">Please enter a password</span>
          )}

          {!valid && (
            <button className="form-field" type="submit">
              Login
            </button>
          )}
        </form>
        {submitted && loginStatus === "failed" && (
          <div className="login-error">
            Invalid email or password. Please try again.
          </div>
        )}
        {submitted && loginStatus === "success" && (
          <div className="login-success">
            Login successful! Redirecting to the dashboard...
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
