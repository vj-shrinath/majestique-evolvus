"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface Amenity {
  img: string;
  title: string;
}

export default function AmenitiesDeck({ amenities }: { amenities: Amenity[] }) {
  const [active, setActive] = useState(0);
  
  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % amenities.length);
  }, [amenities.length]);
  
  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + amenities.length) % amenities.length);
  }, [amenities.length]);

  // Optional: Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <div style={{ position: "relative", width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center", perspective: "1500px", overflow: "hidden" }}>
      {amenities.map((item, index) => {
        // Calculate shortest distance offset for infinite circular loop
        let offset = index - active;
        const half = Math.floor(amenities.length / 2);
        
        if (offset < -half) offset += amenities.length;
        if (offset > half) offset -= amenities.length;
        
        // Hide elements that are fully wrapped behind to avoid visual glitching on rotation
        const isVisible = Math.abs(offset) <= 2;
        const direction = Math.sign(offset); // -1 for left, 1 for right, 0 for center
        
        return (
          <div 
             key={index}
             onClick={() => setActive(index)}
             style={{
               position: "absolute",
               width: "clamp(320px, 75vw, 900px)", 
               height: "clamp(220px, 50vw, 550px)",
               transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
               transform: `
                 translateX(${offset * 180}px) 
                 translateZ(${-Math.abs(offset) * 250}px) 
                 rotateY(${-offset * 35}deg)
               `,
               opacity: isVisible ? 1 - Math.abs(offset) * 0.2 : 0,
               zIndex: amenities.length - Math.abs(offset),
               cursor: offset === 0 ? "default" : "pointer",
               borderRadius: "20px",
               overflow: "hidden",
               boxShadow: offset === 0 
                 ? "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.2)"
                 : "0 10px 30px rgba(0,0,0,0.3)",
               // Dim inactive cards slightly to highlight center
               filter: offset === 0 ? "brightness(1.1)" : "brightness(0.6) blur(2px)"
             }}
          >
             <Image 
                src={`/${item.img}`} 
                alt={item.title} 
                fill 
                style={{ objectFit: "cover" }} 
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={95}
             />
             <div style={{ 
               position: "absolute", 
               bottom: 0, 
               width: "100%", 
               padding: "2rem 1.5rem", 
               background: "linear-gradient(transparent, rgba(0,0,0,0.95))",
               transform: offset === 0 ? "translateY(0)" : "translateY(10px)",
               opacity: offset === 0 ? 1 : 0.4,
               transition: "all 0.6s ease"
             }}>
                <h4 style={{ 
                  color: "#fff", 
                  margin: 0, 
                  textShadow: "0 2px 5px rgba(0,0,0,0.8)", 
                  fontSize: "1.4rem",
                  fontFamily: "var(--font-heading)" 
                }}>
                  {item.title}
                </h4>
             </div>
          </div>
        )
      })}
      
      {/* Mobile / Interaction Arrows */}
      <div style={{ position: "absolute", bottom: "1rem", display: "flex", gap: "2rem", zIndex: 100 }}>
         <button 
           onClick={handlePrev}
           style={{ background: "rgba(0,0,0,0.6)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "45px", height: "45px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(5px)", transition: "background 0.2s" }}
         >
           <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
         </button>
         <button 
           onClick={handleNext}
           style={{ background: "rgba(0,0,0,0.6)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "45px", height: "45px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(5px)", transition: "background 0.2s" }}
         >
           <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
         </button>
      </div>
    </div>
  )
}
