"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CardItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  badge?: string;
  price?: string;
  area?: string;
  features: string[];
  image: string;
  ctaText: string;
  ctaAction?: () => void;
  pdfUrl?: string;
}

export default function HorizontalOverlappingDeck({
  cards,
  title,
  subtitle
}: {
  cards: CardItem[];
  title: string;
  subtitle: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  // 40% of each scroll segment holds the current card motionless so users can read it comfortably
  const HOLD_RATIO = 0.40;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;
      
      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollableHeight));
      
      setScrollProgress(progress);

      const numTransitions = cards.length - 1 || 1;
      const step = 1 / numTransitions;
      let currentActive = 0;
      
      for (let i = 1; i < cards.length; i++) {
        const segStart = (i - 1) * step;
        const holdUntil = segStart + step * HOLD_RATIO;
        if (progress >= holdUntil) {
          currentActive = i;
        }
      }
      
      setActiveCard(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [cards.length]);

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const windowHeight = window.innerHeight;
    const totalScrollableHeight = containerRef.current.getBoundingClientRect().height - windowHeight;
    const numTransitions = cards.length - 1 || 1;
    const step = 1 / numTransitions;
    
    // Scroll to the hold point of that card
    let targetRatio = 0;
    if (index > 0) {
      targetRatio = (index - 1) * step + step * (HOLD_RATIO + 0.1);
    }
    
    const targetScroll = containerRef.current.offsetTop + targetRatio * totalScrollableHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: "relative",
        height: `${cards.length * 95}vh`,
        width: "100%",
        backgroundColor: "#faf8f5"
      }}
    >
      {/* Sticky Viewport Stage */}
      <div className="deck-sticky-stage">
        {/* Section Header */}
        <div className="deck-header-box">
          <h2 className="section-title" style={{ marginBottom: "0.3rem" }}>{title}</h2>
          <p style={{ color: "#666", fontSize: "0.95rem", margin: 0 }}>{subtitle}</p>
        </div>

        {/* Progress Indicators & Navigation */}
        <div className="deck-nav-box">
          <button
            onClick={() => scrollToCard(Math.max(0, activeCard - 1))}
            disabled={activeCard === 0}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid #d4af37",
              backgroundColor: activeCard === 0 ? "transparent" : "#fff",
              color: activeCard === 0 ? "#ccc" : "#b38b22",
              cursor: activeCard === 0 ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "all 0.2s ease"
            }}
            aria-label="Previous card"
          >
            &#8592;
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {cards.map((card, idx) => (
              <div 
                key={card.id}
                onClick={() => scrollToCard(idx)}
                style={{
                  width: activeCard === idx ? "32px" : "10px",
                  height: "8px",
                  borderRadius: "10px",
                  backgroundColor: activeCard === idx ? "#b38b22" : "#dddddd",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToCard(Math.min(cards.length - 1, activeCard + 1))}
            disabled={activeCard === cards.length - 1}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid #d4af37",
              backgroundColor: activeCard === cards.length - 1 ? "transparent" : "#fff",
              color: activeCard === cards.length - 1 ? "#ccc" : "#b38b22",
              cursor: activeCard === cards.length - 1 ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "all 0.2s ease"
            }}
            aria-label="Next card"
          >
            &#8594;
          </button>

          <span style={{ fontSize: "0.85rem", color: "#666", fontWeight: "bold", marginLeft: "4px" }}>
            {activeCard + 1} / {cards.length}
          </span>
        </div>

        {/* Stage Container for Overlapping Cards */}
        <div className="deck-stage-container">
          {cards.map((card, index) => {
            const numTransitions = cards.length - 1 || 1;
            const step = 1 / numTransitions;

            let translateX = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = index + 1;
            let shadow = "0 15px 45px rgba(0,0,0,0.12)";

            if (index === 0) {
              // Card 0 stays 100% visible during its hold period
              const firstSlideStart = step * HOLD_RATIO;
              if (scrollProgress > firstSlideStart) {
                const p = Math.min(1, (scrollProgress - firstSlideStart) / (step * (1 - HOLD_RATIO)));
                scale = 1 - p * 0.05;
                opacity = 1 - p * 0.5;
              }
            } else {
              // For Card 1..N-1:
              const segStart = (index - 1) * step;
              const segEnd = index * step;
              const holdUntil = segStart + step * HOLD_RATIO;

              if (scrollProgress < holdUntil) {
                // Holds off-screen while previous card is being read
                translateX = 100;
                opacity = 0;
              } else if (scrollProgress >= holdUntil && scrollProgress <= segEnd) {
                // Smooth slide phase from right to center
                const p = (scrollProgress - holdUntil) / (segEnd - holdUntil);
                translateX = (1 - p) * 100;
                opacity = p;
                scale = 0.95 + p * 0.05;
                shadow = "0 20px 60px rgba(0,0,0,0.22)";
              } else {
                // Card has finished sliding in. Check if next card is sliding over IT:
                translateX = 0;
                const nextHoldUntil = segEnd + step * HOLD_RATIO;
                const nextSegEnd = (index + 1) * step;

                if (scrollProgress > nextHoldUntil) {
                  const p = Math.min(1, (scrollProgress - nextHoldUntil) / (nextSegEnd - nextHoldUntil));
                  scale = 1 - p * 0.05;
                  opacity = 1 - p * 0.5;
                }
              }
            }

            return (
              <div
                key={card.id}
                className="horizontal-deck-card"
                style={{
                  zIndex: zIndex,
                  boxShadow: shadow,
                  transform: `translateX(${translateX}%) scale(${scale})`,
                  opacity: opacity,
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, box-shadow 0.35s ease"
                }}
              >
                {/* Image Section */}
                <div className="deck-card-image-col">
                  <Image 
                    src={`/${card.image}`}
                    alt={card.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 600px"
                    quality={90}
                    priority={index === 0}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)"
                  }} />
                  <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 2 }}>
                    <span style={{
                      backgroundColor: "rgba(179, 139, 34, 0.95)",
                      color: "#fff",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "50px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase"
                    }}>
                      {card.tag}
                    </span>
                  </div>
                  <div style={{ position: "absolute", bottom: "1rem", left: "1.2rem", right: "1.2rem", color: "#fff", zIndex: 2 }}>
                    <h3 className="deck-card-title">{card.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.9)", margin: 0, fontSize: "0.85rem" }}>{card.subtitle}</p>
                  </div>
                </div>

                {/* Details & Action Section */}
                <div className="deck-card-info-col">
                  <div>
                    {card.badge && (
                      <span style={{
                        display: "inline-block",
                        backgroundColor: "#fcfaf4",
                        color: "#b38b22",
                        border: "1px solid #e2d29b",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        marginBottom: "0.6rem"
                      }}>
                        {card.badge}
                      </span>
                    )}

                    {card.price && (
                      <div style={{ marginBottom: "0.6rem" }}>
                        <h4 className="deck-card-price">{card.price}</h4>
                        {card.area && <span style={{ fontSize: "0.82rem", color: "#777" }}>Carpet Area: {card.area}</span>}
                      </div>
                    )}

                    <p className="deck-card-desc" style={{ color: "#555", lineHeight: 1.5, fontSize: "0.88rem", marginBottom: "0.8rem" }}>
                      {card.desc}
                    </p>

                    {/* Features checklist */}
                    {card.features.length > 0 && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        {card.features.map((feat, fIdx) => (
                          <li key={fIdx} className="deck-card-feature-item" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#333" }}>
                            <svg width="15" height="15" fill="none" stroke="#b38b22" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div style={{ marginTop: "0.8rem" }}>
                    {card.pdfUrl ? (
                      <div style={{ display: "flex", gap: "0.6rem" }}>
                        <a 
                          href={card.pdfUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-dark deck-card-cta-btn" 
                          style={{ flex: 1, padding: "0.7rem", textAlign: "center", fontSize: "0.82rem" }}
                        >
                          View PDF
                        </a>
                        <a 
                          href={card.pdfUrl} 
                          download 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-outline deck-card-cta-btn" 
                          style={{ flex: 1, padding: "0.7rem", textAlign: "center", fontSize: "0.82rem" }}
                        >
                          Download
                        </a>
                      </div>
                    ) : (
                      <button 
                        className="deck-card-cta-btn"
                        onClick={() => {
                          if (card.ctaAction) {
                            card.ctaAction();
                          } else {
                            window.dispatchEvent(new CustomEvent("open-inquiry"));
                          }
                        }}
                        style={{
                          width: "100%",
                          padding: "0.8rem",
                          backgroundColor: "#111",
                          color: "#fff",
                          border: "none",
                          borderRadius: "50px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          transition: "background-color 0.2s"
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = "#b38b22"}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = "#111"}
                      >
                        {card.ctaText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
