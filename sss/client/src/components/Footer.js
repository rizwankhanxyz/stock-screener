import React from 'react';
import "../styles/Footer.css"

const Footer = () => {
  const appVersion = '0.1.0-beta'; // Replace with your actual version or a dynamic way to fetch it
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
        <p> Version: {appVersion} (Beta Release) | &copy; {currentYear} Shariah Equities. All rights reserved.</p>
        {/* <p>
          Contact Us: <a href="mailto:info@example.com">info@example.com</a>
        </p> */}
    </footer>
  );
};

export default Footer;