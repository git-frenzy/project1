import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://api.kanishksuri.site/register', { name, email, password });

      if (response.data && response.data._id) {
        navigate('/login'); // Redirect to login page on successful registration
      } else {
        setError(response.data);
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #000000 30%, #00ff00 260%)",
        color: "#E0E0E0",
        fontFamily: "'Poppins', sans-serif",
        padding: "1rem", // Adjusted padding for responsiveness
      }}
    >
      <h1 className="mb-4" style={{ fontWeight: "700", fontSize: "clamp(4rem, 4vw, 3.5rem)", textAlign: "center" }}>
        Register
      </h1>
      <form
        onSubmit={handleRegister}
        className="w-100"
        style={{
          maxWidth: "600px", // Set maxWidth similar to Login form
          backgroundColor: "#1E1E1E",
          padding: "clamp(1rem, 2.5vw, 2rem)", // Scaling padding
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label"
            style={{ color: "#B3B3B3", fontWeight: "500" }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              backgroundColor: "#2A2A2A",
              color: "#E0E0E0",
              border: "1px solid #444",
              borderRadius: "5px",
              padding: "0.75rem",
              fontSize: "clamp(0.9rem, 1.5vw, 1rem)", // Scales font size for smaller screens
            }}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
            style={{ color: "#B3B3B3", fontWeight: "500" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              backgroundColor: "#2A2A2A",
              color: "#E0E0E0",
              border: "1px solid #444",
              borderRadius: "5px",
              padding: "0.75rem",
              fontSize: "clamp(0.9rem, 1.5vw, 1rem)", // Scales font size for smaller screens
            }}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
            style={{ color: "#B3B3B3", fontWeight: "500" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              backgroundColor: "#2A2A2A",
              color: "#E0E0E0",
              border: "1px solid #444",
              borderRadius: "5px",
              padding: "0.75rem",
              fontSize: "clamp(0.9rem, 1.5vw, 1rem)", // Scales font size for smaller screens
            }}
          />
        </div>
        {error && (
          <div
            className="alert"
            role="alert"
            style={{
              backgroundColor: "#FF5252",
              color: "#ffffff",
              borderRadius: "5px",
              padding: "0.75rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          className="btn"
          style={{
            width: "100%",
            backgroundColor: "#1DB954",
            color: "#ffffff",
            fontWeight: "600",
            padding: "0.75rem",
            border: "none",
            borderRadius: "5px",
            fontSize: "clamp(1rem, 2vw, 1.2rem)", // Scaled font size
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#14833B")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1DB954")}
        >
          Register
        </button>
      </form>
      <p className="mt-3" style={{ color: "#B3B3B3", fontSize: "clamp(0.8rem, 1.5vw, 1rem)" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#1DB954", fontWeight: "600" }}>
          Login here
        </a>
      </p>

      {/* Footer */}
      <div
        className="position-absolute bottom-0 w-100 text-center"
        style={{
          color: "#B3B3B3",
          fontSize: "clamp(0.8rem, 1vw, 1rem)",
          paddingBottom: "10px",
        }}
      >
        edunext.kanishksuri.site
      </div>
    </div>
  );
};

export default Register;
