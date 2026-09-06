"use client";

import React from 'react';

export default function NavContactButton() {
  return (
    <button 
      onClick={() => window.dispatchEvent(new Event('open-inquiry'))} 
      className="nav-btn-contact" 
      style={{ border: "none", cursor: "pointer", fontFamily: "inherit" }}
    >
      Contact Us
    </button>
  );
}
