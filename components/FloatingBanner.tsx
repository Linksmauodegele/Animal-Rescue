"use client";
import { useEffect, useRef } from "react";

// Animated falling paw prints & hearts across the page — very lightweight CSS animation
export default function FloatingBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ["🐾", "🐾", "💛", "🐾", "🐾", "💚", "🐾"];
    const container = containerRef.current;
    if (!container) return;

    items.forEach((emoji, i) => {
      const el = document.createElement("div");
      el.textContent = emoji;
      el.className = "falling-leaf";
      el.style.left = `${10 + i * 13}%`;
      el.style.fontSize = `${14 + Math.random() * 12}px`;
      el.style.animationDuration = `${8 + Math.random() * 10}s`;
      el.style.animationDelay = `${Math.random() * 8}s`;
      el.style.opacity = "0";
      container.appendChild(el);
    });

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none" aria-hidden="true" />;
}
