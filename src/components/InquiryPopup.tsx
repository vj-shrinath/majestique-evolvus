"use client";

import { useState, useEffect } from "react";

export default function InquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Show popup after 10 seconds on the page automatically
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 12000);

    // Listens for external triggers (like specific buttons being clicked)
    const handleOpen = () => {
      setErrorMsg(""); // Clear errors on fresh open
      setIsOpen(true);
    };
    window.addEventListener("open-inquiry", handleOpen);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-inquiry", handleOpen);
    }
  }, []);

  if (!isOpen) return null;

  const validateMobileNumber = (number: string) => {
    // Check if it's exactly 10 digits and starts with 6,7,8, or 9 (Indian format)
    if (!/^[6-9]\d{9}$/.test(number)) {
      return "Please enter a valid 10-digit mobile number.";
    }
    // Check for obvious sequential numbers
    if (["1234567890", "0987654321", "9876543210", "0123456789"].includes(number)) {
      return "Please enter a real mobile number.";
    }
    // Check if all digits are the same (e.g. 9999999999, 8888888888)
    if (/^(\d)\1{9}$/.test(number)) {
      return "Dummy numbers are not permitted.";
    }
    return null;
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(5px)", zIndex: 999999,
      display: "flex", justifyContent: "center", alignItems: "center",
      animation: "fadeInDialog 0.3s ease-out"
    }}>
      <style>{`
        @keyframes fadeInDialog {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div style={{
        backgroundColor: "#fff", padding: "3rem", borderRadius: "16px",
        width: "90%", maxWidth: "420px", position: "relative",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.2)"
      }}>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ position: "absolute", top: "15px", right: "15px", background: "#f5f5f5", border: "none", width: "32px", height: "32px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "#666", transition: "background 0.2s" }}
          onMouseOver={e => e.currentTarget.style.background = "#eaeaea"}
          onMouseOut={e => e.currentTarget.style.background = "#f5f5f5"}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#fdfbf7", border: "1px solid #f2e6c4", marginBottom: "1rem" }}>
             <svg width="28" height="28" fill="none" stroke="#b38b22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          </div>
          <h2 style={{ color: "#111", fontSize: "1.6rem", fontWeight: "bold", fontFamily: "var(--font-heading), 'Playfair Display', serif" }}>Request a Call Back</h2>
          <p style={{ color: "#666", fontSize: "0.95rem", marginTop: "0.5rem", lineHeight: 1.5 }}>Register to request a call back and get complete project details.</p>
        </div>
        
        <form onSubmit={(e: any) => { 
          e.preventDefault(); 
          const name = e.target.fullName.value.trim();
          const mobile = e.target.mobile.value.trim();
          
          const validationError = validateMobileNumber(mobile);
          if (validationError) {
            setErrorMsg(validationError);
            return;
          }
          
          setErrorMsg("");
          const waUrl = `https://wa.me/917499691693?text=${encodeURIComponent(`Hi! I'm ${name}. My contact number is ${mobile}. I would like to request a callback regarding Majestique Evolvus.`)}`;
          window.open(waUrl, "_blank");
          setIsOpen(false); 
        }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          {errorMsg && (
            <div style={{ padding: "0.8rem", backgroundColor: "#fef2f2", color: "#dc2626", borderRadius: "8px", fontSize: "0.9rem", border: "1px solid #fecaca", textAlign: "center" }}>
              {errorMsg}
            </div>
          )}

          <div style={{ position: "relative" }}>
            <input required type="text" name="fullName" placeholder="Full Name" style={{ width: "100%", padding: "1rem 1rem 1rem 2.8rem", borderRadius: "8px", border: "1px solid #ddd", outline: "none", fontSize: "0.95rem", backgroundColor: "#fafafa" }} />
             <svg width="18" height="18" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
          </div>
          <div style={{ position: "relative" }}>
            <input required type="tel" name="mobile" placeholder="Mobile Number" style={{ width: "100%", padding: "1rem 1rem 1rem 2.8rem", borderRadius: "8px", border: "1px solid #ddd", outline: "none", fontSize: "0.95rem", backgroundColor: "#fafafa" }} />
             <svg width="18" height="18" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
          </div>
          <button 
            type="submit" 
            style={{ 
              width: "100%", marginTop: "0.5rem", padding: "1rem", borderRadius: "8px", border: "none",
              backgroundColor: "#111", color: "#fff", fontWeight: "bold", fontSize: "1rem", cursor: "pointer",
              display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", 
              transition: "background 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#25D366"}
            onMouseOut={e => e.currentTarget.style.backgroundColor = "#111"}
          >
            Submit via WhatsApp
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
}
