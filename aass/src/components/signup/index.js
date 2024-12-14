import React, { useState } from "react";
import {  Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import Cookies from "js-cookie";  // Import js-cookie
import { Navigate, Outlet } from "react-router-dom";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");  // State for username
  const [errors, setErrors] = useState({ email: "", password: "", username: "" });
  const [errorMessage, setErrorMessage] = useState(""); // State for backend error message
  const [loading, setLoading] = useState(false);  // State for loading
  const navigate = useNavigate();  // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email: "", password: "", username: "" };
    let isValid = true;

    // Username validation
    if (!username) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    // Password validation
    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setLoading(true);  // Set loading to true while waiting for the API response
      try {
        const user = { email, password, username };

        // API call to backend for signup
        const response = await fetch("http://localhost:4000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const result = await response.json();
        setLoading(false);  // Stop loading once API response is received

        if (response.ok === true) {
          // Successful signup
          // Store the JWT token in a cookie
          
          Cookies.set("authToken", result.jwtToken, { expires: 30}); // Cookie expires in 1 day
          // Redirect to the user dashboard
          navigate('/dashboard')
          setEmail("");
          setPassword("");
          setUsername("");
          setErrorMessage(""); 
          return <Navigate to='/dashboard'/>;
           // Clear any previous error messages
        } else {
          // Failed signup
          setErrorMessage(result.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        setLoading(false);
        setErrorMessage("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg" style={{ width: "28rem", borderRadius: "15px" }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">Signup</h3>
          
          {/* Error Message */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                placeholder="Enter your username"
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter your password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading}>
                {loading ? "Signing Up..." : "Signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
