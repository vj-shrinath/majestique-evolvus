"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const CustomSelect = ({ value, onChange, options }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find(o => o.value === value)?.label || value;
  const popupRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div style={{ position: "relative" }} ref={popupRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ fontWeight: "bold", fontSize: "1rem", cursor: "pointer", color: "#111", padding: 0, display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}
      >
        {selectedLabel}
        <svg width="14" height="14" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M6 9l6 6 6-6"/></svg>
      </div>
      
      {isOpen && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 16px)", left: "-10px",
          backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
          minWidth: "220px", zIndex: 100, padding: "0.5rem", border: "1px solid #eee",
          display: "flex", flexDirection: "column", gap: "2px",
          animation: "fadeInUp 0.2s ease-out forwards"
        }}>
          {options.map((opt: any, i: number) => (
            <div 
              key={i} 
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              style={{
                padding: "0.8rem 1rem", cursor: "pointer", borderRadius: "8px",
                backgroundColor: opt.value === value ? "#fcfaf4" : "transparent",
                fontWeight: opt.value === value ? "bold" : "normal",
                color: opt.value === value ? "#b38b22" : "#444",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "8px"
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = opt.value === value ? "#fcfaf4" : "#f9f9f9"}
              onMouseOut={e => e.currentTarget.style.backgroundColor = opt.value === value ? "#fcfaf4" : "transparent"}
            >
              {opt.value === value && <svg width="14" height="14" fill="none" stroke="#b38b22" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>}
              <span style={{ marginLeft: opt.value === value ? 0 : "22px" }}>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function HeroSearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("Central Kharadi");
  const [filterSection, setFilterSection] = useState("pricing");
  const [price, setPrice] = useState("₹1.84 Cr - ₹2.50 Cr");
  const [beds, setBeds] = useState("3 & 4 BHK");

  const handleSearch = () => {
    // Determine section target
    let targetSection = filterSection;
    if (beds === "4 BHK") {
      targetSection = "pricing";
    }

    const targetElement = document.getElementById(targetSection);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${targetSection}`);
    } else {
      router.push(`#${targetSection}`);
    }

  };

  return (
    <div className="hero-search-bar">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      {/* Location */}
      <div className="search-item">
        <div style={{ backgroundColor: "#fafafa", border: "1px solid #eee", color: "#666", width: "42px", height: "42px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b38b22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "0.65rem", color: "#888", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Location</span>
          <CustomSelect 
            value={location} onChange={setLocation} 
            options={[
              { value: "Central Kharadi", label: "Central Kharadi, Pune" },
              { value: "Upper Kharadi", label: "Upper Kharadi, Pune" },
              { value: "Viman Nagar", label: "Viman Nagar" }
            ]} 
          />
        </div>
      </div>

      {/* Price */}
      <div className="search-item">
        <div style={{ backgroundColor: "#fafafa", border: "1px solid #eee", color: "#666", width: "42px", height: "42px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b38b22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12"/><path d="M6 8h12"/><path d="M6 13h8.5l-5 8"/></svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "0.65rem", color: "#888", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Price Range</span>
          <CustomSelect 
            value={price} onChange={setPrice} 
            options={[
              { value: "₹1.84 Cr - ₹2.50 Cr", label: "₹1.84 Cr - ₹2.50 Cr" },
              { value: "₹2.65 Cr - ₹3.00 Cr", label: "₹2.65 Cr - ₹3.00 Cr" }
            ]} 
          />
        </div>
      </div>

      {/* Property Link */}
      <div className="search-item">
        <div style={{ backgroundColor: "#fafafa", border: "1px solid #eee", color: "#666", width: "42px", height: "42px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b38b22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "0.65rem", color: "#888", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Property Link</span>
          <CustomSelect 
            value={filterSection} onChange={setFilterSection} 
            options={[
              { value: "pricing", label: "Pricing & Units" },
              { value: "amenities", label: "World Class Amenities" },
              { value: "overview", label: "Project Overview" },
              { value: "brochures", label: "Download Brochure" }
            ]} 
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="search-item" style={{ borderRight: "none" }}>
        <div style={{ backgroundColor: "#fafafa", border: "1px solid #eee", color: "#666", width: "42px", height: "42px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b38b22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "0.65rem", color: "#888", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Bedrooms</span>
          <CustomSelect 
            value={beds} onChange={setBeds} 
            options={[
              { value: "3 & 4 BHK", label: "3 & 4 BHK" },
              { value: "4 BHK", label: "4 BHK" }
            ]} 
          />
        </div>
      </div>

      {/* Search Button */}
      <button 
        onClick={handleSearch}
        style={{
          backgroundColor: "#111", color: "#fff", border: "none", borderRadius: "50px",
          padding: "1.1rem 2.5rem", fontSize: "1rem", fontWeight: "bold", cursor: "pointer",
          transition: "transform 0.2s, background-color 0.2s"
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = "#b38b22"}
        onMouseOut={e => e.currentTarget.style.backgroundColor = "#111"}
      >
        Search
      </button>
    </div>
  );
}
