import React from "react";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-3 shadow">
      <div className="container-fluid d-flex justify-content-between">
        <span className="navbar-brand fw-bold fs-3 user-select">
          <i className="bi bi-backpack-fill me-2"></i>Item Packer
        </span>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-sm btn-light me-2"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <a
            href="https://github.com/Prashanth2025/Item_Packer"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-light d-inline-flex align-items-center"
          >
            <i className="bi bi-code-square me-2"></i>
            Click for Source
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
