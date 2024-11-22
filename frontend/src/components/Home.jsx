import React from 'react';
import { Link } from "react-router-dom";
import mainBot from "/page-photos/homepage-bot.png";

const Home = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100 position-relative"
      style={{
        background: "linear-gradient(135deg, #000000 30%, #00ff00 260%)",
        color: "#E0E0E0",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Bot Image */}
      <img
        src={mainBot}
        alt="main-bot"
        className="mb-4"
        style={{
          width: "40%",
          maxWidth: "140px", // Limit maximum size
          animation: "bounce 2s infinite",
          filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.5))",
        }}
      />

      {/* Site Name */}
      <h1
        className="mb-4"
        style={{
          color: "#1DB954",
          fontWeight: "bold",
          fontSize: "clamp(5rem, 8vw, 8rem)", // Responsive font size
          textShadow: "0 0 10px #1DB954, 0 0 20px #1DB954",
        }}
      >
        EDUNEXT
      </h1>

      {/* Subtitle */}
      <h2
        className="text-uppercase mb-2"
        style={{
          letterSpacing: "2px",
          color: "#1DB954",
          fontWeight: "600",
          fontSize: "clamp(0.8rem, 2.5vw, 1.2rem)", // Responsive font size
        }}
      >
        | Next Gen Platform
      </h2>

      {/* Description */}
      <h1
        className="display-5 fw-bold mb-3"
        style={{
          fontSize: "clamp(1.2rem, 4vw, 2.5rem)", // Responsive font size
          color: "#E0E0E0",
        }}
      >
        Your Own AI Tutor Community <span style={{ color: "#FFC107" }}>Chat Bot</span>
      </h1>

      <p
        className="mb-4"
        style={{
          maxWidth: "clamp(550px, 60%, 800px)", // Dynamically scale max width
          lineHeight: "1.6", // Slightly tighter line spacing
          fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)", // Refined font size for clarity
          color: "#B3B3B3",
          paddingLeft: "clamp(0.5rem, 1vw, 1rem)", // Reduced padding to avoid unnecessary line breaks
          paddingRight: "clamp(0.5rem, 1vw, 1rem)", // Same as paddingLeft
        }}
      >
        Learn with ease and confidence. Our secure, private tutoring platform offers
        seamless, natural conversations for expert guidance across all subjects.
      </p>





      {/* Call to Action */}
      <Link
        to="/login"
        className="btn rounded-pill px-5 py-3 shadow fw-bold"
        style={{
          color: "#121212",
          backgroundColor: "#1DB954",
          fontSize: "clamp(1.3rem, 2.5vw, 1rem)", // Responsive font size
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#14833B";
          e.target.style.color = "#E0E0E0";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#1DB954";
          e.target.style.color = "#121212";
        }}
      >
        Get Started For Free
      </Link>

      {/* Footer */}
      <div
        className="position-absolute bottom-0 w-100 text-center"
        style={{
          color: "#B3B3B3",
          fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)", // Responsive font size
          paddingBottom: "10px",
        }}
      >
        edunext.kanishksuri.site
      </div>
    </div>
  );
};

export default Home;
