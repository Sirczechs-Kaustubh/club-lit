import React from 'react';
import "../components/Profile/Profile.css"

const Footer = () => {
  const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#333",
    color: "white",
    padding: "20px 30px",
    flexWrap: "wrap",
    width: "100vw",
  };

  const footerRowStyle = {
    flex: 1,
    minWidth: "150px",
  };

  const headingStyle = {
    fontSize: "1.5rem",
  };

  const paragraphStyle = {
    fontSize: "1rem",
    margin: "0",
  };

  return (
    <footer style={footerStyle}>
        <div style={footerRowStyle}>
          <h3 style={headingStyle}>About</h3>
          <p style={paragraphStyle}>Learn more about ClubLit and our mission.</p>
        </div>
        <div style={footerRowStyle}>
          <h3 style={headingStyle}>Reader</h3>
          <p style={paragraphStyle}>Explore the world of reading with us.</p>
        </div>
        <div style={footerRowStyle}>
          <h3 style={headingStyle}>Author</h3>
          <p style={paragraphStyle}>Get in touch with authors and their works.</p>
        </div>
        <div style={footerRowStyle}>
          <h3 style={headingStyle}>Contact</h3>
          <p style={paragraphStyle}>Email us at support@clubreader.com</p>
        </div>
      </footer>
  );
};

export default Footer;
