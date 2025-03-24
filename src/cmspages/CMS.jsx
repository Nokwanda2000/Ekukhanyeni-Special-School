import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from '../../src/cmspages/CMSbar';
import MobileToggleButton from '../../src/cmspages/MobileToggle';

export default function CMS() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/CMS";
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa", color: "#000" }}>
      {!isLoginPage && (
        <>
          {/* Sidebar Component */}
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          
          {/* Mobile Toggle Button Component */}
          <MobileToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          transition: "margin-left 0.3s ease-in-out",
          marginLeft: isLoginPage ? "0" : isOpen ? "260px" : "0",
        }}
      >
        <Outlet />
      </div>
    </div>
  );  
}