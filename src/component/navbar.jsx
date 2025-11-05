import React from "react";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-3 shadow">
      <div className="container-fluid d-flex justify-content-between">
        <span className="navbar-brand fw-bold fs-3 user-select">
          <i className="bi bi-backpack-fill me-2"></i>Item Packer
        </span>
        <button
          className="btn btn-sm btn-light"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;