import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gsaptrigger = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const spans = containerRef.current.querySelectorAll(".letter");

    spans.forEach((span, i) => {
      gsap.fromTo(
        span,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          delay: i * 0.07,
          duration: 0.4,
          ease: "power3.out"
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [text]);

  return (
    <span
      ref={containerRef}
      style={{
        display: "inline-block",
        fontSize: "3rem",
        fontWeight: "bold",
        whiteSpace: "pre-wrap",
        color: "#fff"
      }}
    >
      {[...text].map((char, index) => (
        <span
          key={index}
          className="letter"
          style={{
            display: "inline-block",
            opacity: 1,
            transform: "translateY(0)",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default Gsaptrigger;
