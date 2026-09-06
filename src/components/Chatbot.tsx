"use client";

import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I am the Evolvus Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  
  // Mascot Running Animation States: 'idle_start', 'running', 'holding'
  const [mascotState, setMascotState] = useState<"idle_start" | "running" | "holding">("idle_start");
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    // Start running animation after loading screen disappears (around 3 seconds)
    const runTimer = setTimeout(() => {
      setMascotState("running");
    }, 3200);

    // Mascot reaches the chat button after ~2.8s of running
    const holdTimer = setTimeout(() => {
      setMascotState("holding");
      setShowTooltip(true);
    }, 6000);

    return () => {
      clearTimeout(runTimer);
      clearTimeout(holdTimer);
    };
  }, []);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: "user", text }]);
    setInput("");

    const userQuery = text.toLowerCase();

      setTimeout(() => {
      let response = "I'm sorry, I couldn't understand that. Would you like to schedule a free site visit or request a **Callback** from our senior sales experts?";
      
      if (userQuery.includes("call") || userQuery.includes("back") || userQuery.includes("contact")) {
        response = "I have opened the callback request form for you! Please fill in your details there.";
        setTimeout(() => {
          window.dispatchEvent(new Event('open-inquiry'));
        }, 500);
      } else if (userQuery.includes("price") || userQuery.includes("cost") || userQuery.includes("bhk") || userQuery.includes("pricing")) {
        response = "We offer spacious 3 BHK luxury residences starting at ₹1.84 Cr, 3 BHK Premium at ₹2.10 Cr, and stunning 4 BHK Signature flats starting at ₹2.65 Cr.";
      } else if (userQuery.includes("location") || userQuery.includes("where") || userQuery.includes("address")) {
        response = "Majestique Evolvus is centrally located at Central Kharadi, Pune. It provides direct connectivity to Viman Nagar, Kalyani Nagar, and Koregaon Park.";
      } else if (userQuery.includes("amenities") || userQuery.includes("facilities")) {
        response = "The property features 70+ extraordinary lifestyle amenities! Highlights include a Grand Clubhouse (~27,000 Sq. Ft.), Box Cricket arena, and Twin Squash Courts.";
      } else if (userQuery.includes("brochure") || userQuery.includes("pdf") || userQuery.includes("plan")) {
        response = "You can view the floor plans and download the official E-Brochure natively from the 'Brochures' section just below the pricing area on this page!";
      } else if (userQuery.includes("hi") || userQuery.includes("hello")) {
        response = "Hello! Ask me about pricing, location, or amenities, or type 'Callback' to instantly connect with an expert.";
      }

      setMessages(prev => [...prev, { sender: "bot", text: response }]);
    }, 800);
  };

  const handleQuickReply = (query: string) => {
    handleSend(query);
  };

  return (
    <>
      <style>{`
        /* Keyframe animations for Mascot running across bottom of Hero */
        @keyframes mascotRun {
          0% {
            left: 2vw;
            bottom: 30px;
            opacity: 0;
            transform: scaleX(1);
          }
          10% {
            opacity: 1;
          }
          90% {
            left: calc(100vw - 160px);
            bottom: 30px;
            opacity: 1;
            transform: scaleX(1);
          }
          100% {
            left: calc(100vw - 150px);
            bottom: 25px;
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes mascotBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(4deg); }
        }

        @keyframes mascotHoldPulse {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.05) translateY(-3px); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 10px 25px rgba(0,0,0,0.3), 0 0 0 0px rgba(179, 139, 34, 0.6); }
          50% { box-shadow: 0 10px 25px rgba(0,0,0,0.3), 0 0 0 12px rgba(179, 139, 34, 0); }
        }

        .mascot-container-running {
          animation: mascotRun 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .mascot-character-bob {
          animation: mascotBob 0.35s ease-in-out infinite alternate;
        }

        .mascot-container-holding {
          position: fixed;
          bottom: 25px;
          right: 100px;
          z-index: 9999;
          animation: mascotHoldPulse 3s ease-in-out infinite;
        }

        .chat-button-pulse {
          animation: pulseGlow 2s infinite;
        }
      `}</style>

      {/* Animated Running Character */}
      {mascotState !== "idle_start" && !isOpen && (
        <div 
          className={mascotState === "running" ? "mascot-container-running" : "mascot-container-holding"}
          style={{
            position: "fixed",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onClick={() => setIsOpen(true)}
        >
          {/* Speech Bubble */}
          <div style={{
            backgroundColor: "#111",
            color: "#fff",
            padding: "0.5rem 0.9rem",
            borderRadius: "20px",
            borderBottomRightRadius: "4px",
            fontSize: "0.8rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            border: "1px solid rgba(212, 175, 55, 0.5)",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            <span style={{ color: "#d4af37" }}>👋</span>
            {mascotState === "running" ? "On my way to help!" : "Need help? Ask Evolvus Assistant!"}
          </div>

          {/* SVG Character (Luxury Real Estate Assistant Mascot) */}
          <div className={mascotState === "running" ? "mascot-character-bob" : ""} style={{ position: "relative" }}>
            <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Glow Aura */}
              <circle cx="32" cy="32" r="28" fill="url(#gold_grad)" opacity="0.2" />
              
              {/* Head / Robot Helmet */}
              <circle cx="32" cy="26" r="16" fill="#111" stroke="#d4af37" strokeWidth="2.5" />
              
              {/* Cute Eyes */}
              <circle cx="26" cy="24" r="3" fill="#d4af37" />
              <circle cx="38" cy="24" r="3" fill="#d4af37" />
              <circle cx="27" cy="23" r="1" fill="#fff" />
              <circle cx="39" cy="23" r="1" fill="#fff" />
              
              {/* Friendly Smile */}
              <path d="M27 29C29 32 35 32 37 29" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
              
              {/* Golden Head Antenna */}
              <line x1="32" y1="10" x2="32" y2="4" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
              <circle cx="32" cy="3" r="3" fill="#d4af37" />
              
              {/* Body */}
              <rect x="22" y="42" width="20" height="16" rx="8" fill="#d4af37" />
              
              {/* Arm reaching out / holding */}
              {mascotState === "holding" ? (
                <path d="M42 46C48 44 54 42 58 40" stroke="#d4af37" strokeWidth="3.5" strokeLinecap="round" />
              ) : (
                <path d="M18 48C14 44 12 40 10 38" stroke="#d4af37" strokeWidth="3.5" strokeLinecap="round" />
              )}
              
              {/* Running Legs */}
              {mascotState === "running" ? (
                <>
                  <path d="M26 58L20 63" stroke="#111" strokeWidth="3" strokeLinecap="round" />
                  <path d="M38 58L44 63" stroke="#111" strokeWidth="3" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M27 58V62" stroke="#111" strokeWidth="3" strokeLinecap="round" />
                  <path d="M37 58V62" stroke="#111" strokeWidth="3" strokeLinecap="round" />
                </>
              )}

              {/* Gradient Def */}
              <defs>
                <radialGradient id="gold_grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) scale(28)">
                  <stop stopColor="#d4af37" />
                  <stop offset="1" stopColor="#b38b22" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={mascotState === "holding" ? "chat-button-pulse" : ""}
        style={{
          position: "fixed", bottom: "30px", right: "30px", zIndex: 9998,
          width: "65px", height: "65px", borderRadius: "50%",
          backgroundColor: "#b38b22", color: "#fff", border: "2px solid #d4af37",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)", cursor: "pointer",
          fontSize: "1.8rem", display: "flex", justifyContent: "center", alignItems: "center",
          transition: "transform 0.2s"
        }}
        onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        title="Chat with Evolvus Assistant"
      >
        {isOpen ? "×" : <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: "fixed", bottom: "110px", right: "30px", zIndex: 9998,
          width: "360px", height: "550px", backgroundColor: "#fff",
          borderRadius: "16px", boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          border: "1px solid #eaeaea", animation: "fadeInUp 0.3s ease"
        }}>
          {/* Header */}
          <div style={{ backgroundColor: "#111", color: "#fff", padding: "1.2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "10px", height: "10px", backgroundColor: "#4caf50", borderRadius: "50%" }}></div>
              <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#ffffff" }}>Evolvus Assistant</h4>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.4rem" }}>&times;</button>
          </div>
          
          {/* Messages */}
          <div style={{ flex: 1, padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "#fdfdfd" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ 
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: m.sender === "user" ? "#b38b22" : "#f1f1f1",
                color: m.sender === "user" ? "#fff" : "#111",
                padding: "0.8rem 1.2rem", borderRadius: "18px", 
                borderBottomRightRadius: m.sender === "user" ? "4px" : "18px",
                borderBottomLeftRadius: m.sender === "bot" ? "4px" : "18px",
                maxWidth: "85%", fontSize: "0.95rem", lineHeight: 1.5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div style={{ padding: "0.8rem 1rem", backgroundColor: "#fff", borderTop: "1px solid #f0f0f0", display: "flex", gap: "0.5rem", overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none" }}>
            {["Request Callback", "View Pricing", "Amenities", "Location"].map(qr => (
              <button 
                key={qr} 
                onClick={() => handleQuickReply(qr)}
                style={{
                  padding: "0.5rem 1rem", backgroundColor: "#f9f9f9", border: "1px solid #ddd", 
                  borderRadius: "20px", fontSize: "0.85rem", cursor: "pointer", color: "#333",
                  transition: "all 0.2s"
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "#b38b22"; e.currentTarget.style.color = "#b38b22"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#333"; }}
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} style={{ display: "flex", padding: "0.8rem 1rem", backgroundColor: "#fff", borderTop: "1px solid #eee" }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..." 
              style={{ flex: 1, padding: "0.8rem", outline: "none", border: "1px solid #ddd", borderRadius: "24px", fontSize: "0.95rem" }}
            />
            <button type="submit" disabled={!input.trim()} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 1rem", backgroundColor: "transparent", border: "none", color: input.trim() ? "#b38b22" : "#ccc", cursor: input.trim() ? "pointer" : "default" }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
