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
        // 다음 글리치까지 랜덤 딜레이 (3~9초)
        timeout = setTimeout(triggerGlitch, 3000 + Math.random() * 6000);
      }, 400);
    };

    timeout = setTimeout(triggerGlitch, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={ref} className="glitch-wrapper" data-text={text}>
      <span className="glitch-main">{text}</span>
      <span className="glitch-layer glitch-a" aria-hidden="true">
        {text}
      </span>
      <span className="glitch-layer glitch-b" aria-hidden="true">
        {text}
      </span>

      <style>{`
        .glitch-wrapper {
          position: relative;
          display: block;
          line-height: 0.88;
          font-family: var(--font-display);
          font-size: clamp(100px, 20vw, 280px);
          letter-spacing: -0.01em;
          color: var(--color-fg);
          user-select: none;
        }

        .glitch-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
        }

        /* 글리치 발동 시 */
        .glitch-wrapper[data-glitch="true"] .glitch-a {
          opacity: 1;
          color: var(--color-accent);
          animation: glitch1 0.35s steps(1) forwards;
        }
        .glitch-wrapper[data-glitch="true"] .glitch-b {
          opacity: 1;
          color: #ff2d55;
          animation: glitch2 0.35s steps(1) forwards;
        }
      `}</style>
    </div>
  );
}
