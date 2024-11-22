import React from 'react';

const Bot = () => {
  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #121212, #1a1a1a, #003300)', // Adding a subtle green tint in the gradient
        color: "#E0E0E0", // Light text for contrast
        fontFamily: "'Poppins', sans-serif", // Modern font
        margin: 0,
        padding: "20px", // Adding padding around the edges
        paddingBottom: "50px", // More bottom spacing
      }}
    >
      {/* Header Section */}
      <div className="text-center" style={{ flex: "1 0 auto", padding: "20px" }}>
        <h1
          className="welcome-header"
          style={{
            fontWeight: "700",
            fontSize: "3.3rem",
            wordWrap: "break-word"
          }}
        >
          Welcome to <br className="d-block d-sm-none" /> EduNext
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            marginTop: "10px",
            color: "#B3B3B3"
          }}
        >
          Choose your assistance tool.
        </p>
      </div>

      {/* Buttons Section */}
      <div
        className="d-flex flex-column flex-md-row justify-content-center align-items-stretch w-100"
        style={{ flex: "2 1 auto", height: "100%", padding: "0 0px", gap: "20px", marginBottom: "40px" }} // Added bottom margin for more spacing
      >
        <button
          onClick={() => window.open("https://rax-text-summarization-2.streamlit.app", "_blank")}
          className="btn-custom"
        >
          <div className="btn-content">
            <h2>Webify</h2>
            <p>Simplifies learning by summarizing YouTube videos and web articles into quick, concise insights. Save time and stay informed effortlessly!</p>
          </div>
        </button>

        <button
          onClick={() => window.open("https://rax-rag-pdf.streamlit.app", "_blank")}
          className="btn-custom"
        >
          <div className="btn-content">
            <h2>DocuWise</h2>
            <p>Simplifies PDFs by summarizing content and answering your questions. Upload a document and get clear, concise insights in seconds!</p>
          </div>
        </button>
      </div>
    </div>
  );
};

// Add custom styling for buttons and animations
const style = document.createElement("style");
style.innerHTML = `
  .btn-custom {
    background-color: #1E1E1E; /* Dark button */
    color: #E0E0E0; /* Text color */
    border: 1px solid #444; /* Subtle border */
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    flex: 1 1 45%; /* Dynamically occupy 45% of the width */
    margin: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    height: 100%; /* Make each button occupy full height */
  }

  .btn-custom:hover {
    background-color: #292929; /* Slightly lighter */
    transform: scale(1.02);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3); /* Soft shadow for depth */
  }

  .btn-custom:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* Highlight on focus */
  }

  /* Increase the font size for button text */
  .btn-content h2 {
    margin: 0;
    font-size: 3.5rem; /* Increased size for the heading */
    color: #ffffff;
    font-weight: bold;
  }

  .btn-content p {
    margin: 10px 0 0 0;
    font-size: 1.2rem; /* Increased size for the paragraph text */
    color: #B3B3B3;
    font-weight: normal;
    
  }

  @media (max-width: 768px) {
    .btn-custom {
      flex: 1 1 100%; /* Stack buttons vertically on smaller screens */
      height: 50%; /* Occupy 50% of the screen height */
    }

    /* Adjust text sizes for smaller screens if needed */
    .btn-content h2 {
      font-size: 2.2rem; /* Slightly smaller but still increased */
    }

    .btn-content p {
      font-size: 1rem; /* Adjust for better readability on small screens */
    }
  }
`;
document.head.appendChild(style);

export default Bot;
