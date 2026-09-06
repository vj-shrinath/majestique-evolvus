"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", prefix = "", label, duration = 2000 }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
        fontWeight: 700,
        fontFamily: "var(--font-heading)",
        color: "#b38b22",
        lineHeight: 1
      }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{
        fontSize: "0.85rem",
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: "2px",
        marginTop: "0.8rem",
        fontWeight: 600
      }}>
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "clamp(2rem, 6vw, 5rem)",
      padding: "4rem 2rem",
      flexWrap: "wrap",
      maxWidth: "1000px",
      margin: "0 auto",
    }}>
      <AnimatedCounter end={10} suffix="+" label="Acres Campus" />
      <div style={{ width: "1px", height: "60px", backgroundColor: "#e0e0e0" }} />
      <AnimatedCounter end={26} label="Storeys Elevated" />
      <div style={{ width: "1px", height: "60px", backgroundColor: "#e0e0e0" }} />
      <AnimatedCounter end={70} suffix="+" label="Amenities" />
      <div style={{ width: "1px", height: "60px", backgroundColor: "#e0e0e0" }} />
      <AnimatedCounter end={2028} label="Possession Year" prefix="" duration={2500} />
    </div>
  );
}
