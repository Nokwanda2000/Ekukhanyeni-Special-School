import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from '../../src/cmspages/CMSbar';
import { Menu } from "lucide-react";

export default function CMS() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/CMS";
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "white", color: "#000" }}>
      {!isLoginPage && (
        <>
          {/* Sidebar Component */}
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          
          {/* Mobile Toggle Button - Positioned safely in top-left corner */}
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

      {/* Main Content with safe area */}
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