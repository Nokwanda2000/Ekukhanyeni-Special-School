import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../src/cmspages/CMSbar";
import { Menu } from "lucide-react";
import { auth } from "../utills/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function CMS() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/CMS";
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        // Block navigation to other pages if not logged in
        if (location.pathname !== "/CMS") {
          navigate("/CMS"); // Redirect to login if not logged in
        }
      }
      setLoading(false); // Mark as loaded after checking auth state
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  if (loading) {
    return <div>Loading...</div>; // Show loading until Firebase restores session
  }

  // If the user is not logged in and they are not on the login page, prevent further navigation
  if (!user && !isLoginPage) {
    navigate("/CMS"); // Redirect to the login page
    return null; // Return null to prevent rendering the rest of the layout
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "white", color: "#000" }}>
      {!isLoginPage && user && (
        <>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              style={{
                position: "fixed",
                top: "10px",
                left: "10px",
                background: "#FEF5DA",
                border: "1px solid #1D4ED8",
                borderRadius: "4px",
                padding: "6px",
                cursor: "pointer",
                color: "#1D4ED8",
                zIndex: 999,
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Menu size={20} />
            </button>
          )}
        </>
      )}

      <div
        style={{
          flex: 1,
          padding: "20px",
          paddingLeft: !isLoginPage && !isOpen ? "56px" : "20px", // Extra space when sidebar closed
          transition: "all 0.3s ease-in-out",
          marginLeft: isLoginPage ? "0" : isOpen ? "260px" : "0",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
