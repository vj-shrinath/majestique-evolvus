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
    <div ref={ref} className="stat-item" style={{ textAlign: "center", flex: 1 }}>
      <div className="stat-number">
        {prefix}{count}{suffix}
      </div>
      <div className="stat-label">
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <>
      <style>{`
        .stats-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(2rem, 6vw, 5rem);
          padding: 4rem 2rem;
          flex-wrap: wrap;
          max-width: 1000px;
          margin: 0 auto;
        }
        .stat-divider {
          width: 1px;
          height: 60px;
          background-color: #e0e0e0;
        }
        .stat-number {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          font-family: var(--font-heading);
          color: #b38b22;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.85rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 0.8rem;
          font-weight: 600;
        }
        
        /* Mobile Specific Overrides to keep 1 row */
        @media (max-width: 768px) {
          .stats-container {
            flex-wrap: nowrap;
            gap: 0.3rem;
            padding: 2.5rem 0.5rem;
            justify-content: space-between;
          }
          .stat-divider {
            height: 40px;
          }
          .stat-number {
            font-size: 1.25rem !important;
          }
          .stat-label {
            font-size: 0.46rem !important;
            letter-spacing: 0.5px !important;
            margin-top: 0.4rem !important;
            line-height: 1.2;
          }
        }
      `}</style>
      <div className="stats-container">
        <AnimatedCounter end={10} suffix="+" label="Acres Campus" />
        <div className="stat-divider" />
        <AnimatedCounter end={26} label="Storeys" />
        <div className="stat-divider" />
        <AnimatedCounter end={70} suffix="+" label="Amenities" />
        <div className="stat-divider" />
        <AnimatedCounter end={2028} label="Year" prefix="" duration={2500} />
      </div>
    </>
  );
}
