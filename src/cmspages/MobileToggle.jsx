import React from "react";
import { Menu } from "lucide-react";

const MobileToggleButton = ({ isOpen, setIsOpen }) => {
  return (
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
  );
};

export default MobileToggleButton;