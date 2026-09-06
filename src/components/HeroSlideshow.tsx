"use client";
import { useState, useRef, useEffect } from "react";

export default function HeroSlideshow() {
  const videos = [
    "https://u8zpu6q2e6.ufs.sh/f/vXIfOjKjYQc8TNi5heFpiQjGODuLEZT1rmNzxwtUpHbKCsB3",
    "https://u8zpu6q2e6.ufs.sh/f/vXIfOjKjYQc8WJCMikVpJNKjwQk0gyvs32qfDFuChR48L6Ac"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Attempt to play the newly activated video
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0; // Reset to start
      currentVideo.play().catch(err => console.log("Autoplay prevented:", err));
    }
  }, [currentIndex]);

  const handleVideoEnded = (index: number) => {
    if (index === currentIndex) {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }
  };

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -2, overflow: "hidden", backgroundColor: "#000" }}>
      {videos.map((src, index) => (
        <video
          key={src}
          ref={(el: HTMLVideoElement | null) => { videoRefs.current[index] = el; }}
          src={src}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onEnded={() => handleVideoEnded(index)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}
