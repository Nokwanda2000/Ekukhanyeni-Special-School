import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Logo from '../assets/Ekukhanyeni Special School trpnt logo.png';

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      style={{
        backgroundColor: "#FEF5DA",
        padding: "20px",
        width: "260px",
        height: "100vh",
        position: "fixed",
        transition: "transform 0.3s ease-in-out",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      {/* Close button inside the sidebar */}
      <button
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#1D4ED8",
        }}
        onClick={() => setIsOpen(false)}
      >
        <X size={24} />
      </button>

      {/* Logo */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", marginTop: "20px" }}>
        <img src={Logo} alt="Logo" style={{ width: "90px", height: "90px", borderRadius: "50%" }} />
      </div>

      {/* Dashboard Title */}
      <h2 style={{ color: "#1D4ED8", fontSize: "20px", fontWeight: "600", textAlign: "center", marginBottom: "20px" }}>
        Dashboard
      </h2>

      {/* Navigation Links */}
      <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <SideNavLink to="/CMS/UsersCMS">Users</SideNavLink>
        <SideNavLink to="/CMS/EventsCMS">Events</SideNavLink>
        <SideNavLink to="/CMS/TimetablesCMS">Timetable</SideNavLink>
        <SideNavLink to="/CMS/FormSubmissionsCMS">Form Submissions</SideNavLink>
      </nav>
    </div>
  );
};

// SideNavLink component
const SideNavLink = ({ to, children }) => (
  <Link
    to={to}
    style={{
      display: "block",
      backgroundColor: "#1D4ED8",
      color: "#fff",
      fontSize: "18px",
      fontWeight: "600",
      padding: "12px 0",
      textAlign: "center",
      borderRadius: "8px",
      width: "80%",
      marginBottom: "12px",
      textDecoration: "none",
      transition: "background 0.3s ease-in-out",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#2563EB")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#1D4ED8")}
  >
    {children}
  </Link>
);

export default Sidebar;