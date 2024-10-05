import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    if (!username || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        // "http://localhost:5000/api/auth/signup",
        "https://wishin.onrender.com/api/auth/signup",
        {
          username,
          password,
        }
      );
      if (response.status === 201) {
        setSuccessMessage("User registered successfully!"); // Set success message
        setTimeout(() => {
          navigate("/login"); // Redirect after 3 seconds
        }, 3000);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError("User already exists");
      } else {
        setError("Error signing up");
      }
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-md-8 col-lg-5 mx-auto">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Signup</h2>
              {error && <p className="text-danger text-center">{error}</p>}
              {successMessage && (
                <p className="text-success text-center">{successMessage}</p>
              )}{" "}
              {/* Show success message */}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3 position-relative">
                  <label>Password</label>
                  <div className="d-flex">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Signup
                </button>
              </form>
              <div className="text-center">
                <span>Already have an account? </span>
                <button
                  className="btn btn-link p-0"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
