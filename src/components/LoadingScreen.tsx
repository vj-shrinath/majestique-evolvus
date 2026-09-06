"use client";
import { useEffect, useState } from "react";

const QUOTES = [
  {
    quote: "“Crafting Architectural Excellence in Upper Kharadi, Pune.”",
    author: "Majestique Landmarks"
  },
  {
    quote: "“Where Luxury Meets Unmatched Connectivity — 17+ Acres of Pure Elegance.”",
    author: "Majestique Evolvus"
  },
  {
    quote: "“Designed for Elevated Living: 35+ World-Class Lifestyle Amenities.”",
    author: "Upper Kharadi, Pune"
  },
  {
    quote: "“Welcome to Your Dream Home at Majestique Evolvus.”",
    author: "Unlocking Luxury Living"
  }
];

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Rotate quote every 900ms
    const quoteInterval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % QUOTES.length);
    }, 900);

    // Smooth progress bar fill up to 100% over 3.2s
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // End loading screen after 3.5s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3600);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#faf8f5",
      zIndex: 99999,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      animation: "fadeOut 0.5s ease 3.2s forwards",
      pointerEvents: "none",
      padding: "2rem"
    }}>
      <style>{`
        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.6) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes quoteFade {
          0% { opacity: 0; transform: translateY(8px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        .loading-icon {
          animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
        }
        .icon-1 { animation-delay: 0.1s; }
        .icon-2 { animation-delay: 0.4s; }
        .icon-3 { animation-delay: 0.7s; }
      `}</style>
      
      {/* Golden Animated Icons */}
      <div style={{ display: "flex", gap: "2.5rem", marginBottom: "2rem" }}>
        {/* Building Icon */}
        <div className="loading-icon icon-1">
          <svg width="48" height="48" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M4 2v20M20 2v20M8 22V2h8v20M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
          </svg>
        </div>
        
        {/* Key Icon */}
        <div className="loading-icon icon-2">
          <svg width="48" height="48" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
        </div>
        
        {/* Map Pin Icon */}
        <div className="loading-icon icon-3">
          <svg width="48" height="48" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
      </div>
      
      {/* Brand Title */}
      <h2 className="loading-icon icon-1" style={{ color: "#111", fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0, fontSize: "2.4rem", letterSpacing: "-0.5px" }}>
        Majestique Evolvus
      </h2>
      <p className="loading-icon icon-2" style={{ color: "#b38b22", letterSpacing: "4px", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 700, marginTop: "0.5rem", marginBottom: "2rem" }}>
        Upper Kharadi, Pune
      </p>

      {/* Rotating Personalized Quote Box */}
      <div style={{
        height: "70px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "600px"
      }}>
        <p key={quoteIndex} style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "1.1rem",
          fontStyle: "italic",
          color: "#444",
          margin: 0,
          lineHeight: 1.4,
          animation: "quoteFade 0.9s ease forwards"
        }}>
          {QUOTES[quoteIndex].quote}
        </p>
        <span key={`sub-${quoteIndex}`} style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: "2px",
          marginTop: "6px",
          animation: "quoteFade 0.9s ease forwards"
        }}>
          — {QUOTES[quoteIndex].author}
        </span>
      </div>

      {/* Sleek Progress Indicator Bar */}
      <div style={{ width: "240px", marginTop: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "100%", height: "3px", backgroundColor: "#eaeaea", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#b38b22",
            transition: "width 0.06s linear",
            borderRadius: "10px"
          }} />
        </div>
        <span style={{ fontSize: "0.7rem", color: "#aaa", fontWeight: 600, letterSpacing: "1px" }}>
          {progress}%
        </span>
      </div>
    </div>
  );
}
