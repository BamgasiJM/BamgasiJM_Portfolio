"use client";

import { useEffect, useRef } from "react";

interface GlitchNameProps {
  text: string;
}

export default function GlitchName({ text }: GlitchNameProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timeout: ReturnType<typeof setTimeout>;

    const triggerGlitch = () => {
      el.dataset.glitch = "true";
      setTimeout(() => {
        delete el.dataset.glitch;
        timeout = setTimeout(triggerGlitch, 3000 + Math.random() * 6000);
      }, 420);
    };

    timeout = setTimeout(triggerGlitch, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={ref} className="glitch-wrapper" data-text={text}>
      <span className="glitch-main text-gradient glow-accent">{text}</span>
      <span className="glitch-layer glitch-a" aria-hidden="true">{text}</span>
      <span className="glitch-layer glitch-b" aria-hidden="true">{text}</span>

      <style>{`
        .glitch-wrapper {
          position: relative;
          display: block;
          line-height: 0.88;
          font-family: var(--font-display);
          font-size: clamp(140px, 26vw, 380px);
          letter-spacing: -0.01em;
          user-select: none;
        }
        .glitch-main {
          display: block;
        }
        .glitch-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
          font-family: var(--font-display);
        }
        .glitch-wrapper[data-glitch="true"] .glitch-a {
          opacity: 1;
          color: var(--color-accent);
          -webkit-text-fill-color: var(--color-accent);
          animation: glitch1 0.4s steps(1) forwards;
        }
        .glitch-wrapper[data-glitch="true"] .glitch-b {
          opacity: 1;
          color: var(--color-pink);
          -webkit-text-fill-color: var(--color-pink);
          animation: glitch2 0.4s steps(1) forwards;
        }
      `}</style>
    </div>
  );
}
