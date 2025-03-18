import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from '../assets/Ekukhanyeni Special School trpnt logo.png';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function CMS() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/CMS";
  const [isOpen, setIsOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa", color: "#000" }}>
      {!isLoginPage && isAuthenticated && (
        <>
          {/* Sidebar */}
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
            <button
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#444",
                display: "block",
              }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <X size={30} />
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
              <SideNavLink to="/CMS/FormSubmissionsCMS">Contact Us</SideNavLink>
            </nav>
          </div>

          {/* Mobile Toggle Button */}
          <button
            style={{
              position: "fixed",
              top: "15px",
              left: "15px",
              backgroundColor: "#333",
              padding: "8px",
              borderRadius: "5px",
              cursor: "pointer",
              zIndex: 1050,
              display: isOpen ? "none" : "block",
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={30} style={{ color: "#fff" }} />
          </button>
        </>
      )}

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          transition: "margin-left 0.3s ease-in-out",
          marginLeft: isLoginPage || !isAuthenticated ? "0" : isOpen ? "260px" : "0",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

// Reusable Sidebar Link Component
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