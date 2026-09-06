"use client";

import { useEffect, useState } from "react";

export default function TowerText({ text }: { text: string }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ overflow: "hidden", textAlign: "left", marginBottom: "0.4rem" }}>
      <style>{`
        @keyframes impactSlam {
          0% {
            opacity: 0;
            transform: scale(1.15) translateY(-15px);
            filter: blur(10px);
          }
          60% {
            opacity: 1;
            transform: scale(0.98) translateY(2px);
            filter: blur(0px);
            text-shadow: 0 0 40px rgba(212, 175, 55, 0.9), 0 0 20px rgba(212, 175, 55, 0.6);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
            text-shadow: 0 4px 20px rgba(0,0,0,0.9), 0 0 25px rgba(179, 139, 34, 0.4);
          }
        }

        .impact-hero-title {
          animation: impactSlam 1.1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      <div 
        className={animate ? "impact-hero-title" : ""}
        style={{
          fontFamily: "var(--font-cinzel), 'Cinzel', 'Playfair Display', serif",
          fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)",
          fontWeight: 700,
          color: "#f5d77f",
          letterSpacing: "0.04em",
          lineHeight: 1.15,
          textAlign: "left",
          opacity: animate ? 1 : 0
        }}
      >
        {text}
      </div>
    </div>
  );
}
