"use client";
import { useState } from "react";

export default function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-menu-toggle"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2.5">
          <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="mobile-dropdown-menu">
          <a href="#overview" onClick={() => setIsOpen(false)}>Overview</a>
          <a href="#showcase" onClick={() => setIsOpen(false)}>Showcase</a>
          <a href="#pricing" onClick={() => setIsOpen(false)}>Residences</a>
          <a href="#amenities" onClick={() => setIsOpen(false)}>Amenities</a>
          <a href="#brochures" onClick={() => setIsOpen(false)}>Brochures</a>
        </div>
      )}
    </>
  );
}
