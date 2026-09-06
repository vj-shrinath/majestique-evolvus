"use client";

import React, { useRef, useState } from "react";

export default function TiltWrapper({ children }: { children: React.ReactNode }) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const { left, top, width, height } = tiltRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position from center (-0.5 to 0.5)
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Defines how much the card rotates
    const multiplier = 15; 
    const rotateX = -y * multiplier; // negative so it tilts towards mouse
    const rotateY = x * multiplier;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    });
  };

  return (
    <div
      ref={tiltRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        willChange: "transform",
        transformStyle: "preserve-3d",
        height: "100%", // Inherit height from parent grid
      }}
    >
      {children}
    </div>
  );
}
