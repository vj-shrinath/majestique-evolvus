"use client";

export default function InquiryButton({ title, style }: { title: string, style?: any }) {
  return (
    <button 
      onClick={() => window.dispatchEvent(new Event('open-inquiry'))} 
      className="btn" 
      style={{ 
        border: "none", cursor: "pointer", padding: "0.6rem 1.5rem", borderRadius: "30px", 
        marginTop: "0.5rem", display: "inline-block", backgroundColor: "#111", color: "#fff", 
        textDecoration: "none", fontSize: "0.9rem", transition: "background-color 0.2s",
        ...style 
      }}
      onMouseOver={e => e.currentTarget.style.backgroundColor = "#b38b22"}
      onMouseOut={e => e.currentTarget.style.backgroundColor = "#111"}
    >
      {title}
    </button>
  );
}
