import React from "react";

function Footer() {
  return (
    <footer className="footer mt-5 py-3 text-center border-top">
      <div className="container">
        <p className="mb-1 text-muted footer-text">
          Built with <span className="text-danger">❤️</span> by{" "}
          <strong>Prashanth</strong>
        </p>
        <p className="mb-0">
          <a
            href="https://github.com/Prashanth2025"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            GitHub Profile <i className="bi bi-github ms-1"></i>
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
