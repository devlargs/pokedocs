"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1200;

/**
 * Ticks a real figure up from zero when it scrolls into view.
 *
 * Starts at the true value so server-rendered HTML and no-JS readers see the
 * fact, not a zero. The animation only takes over once the effect confirms JS
 * is running and motion is welcome.
 */
export default function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const step = (now: number) => {
          if (!start) start = now;
          const progress = Math.min((now - start) / DURATION, 1);
          // Quartic ease-out: quick departure, soft arrival.
          setValue(Math.round(to * (1 - Math.pow(1 - progress, 4))));
          if (progress < 1) frame = requestAnimationFrame(step);
        };

        // Zero only at the moment the tick-up starts. Zeroing on mount instead
        // would leave a wrong number on screen for anything still below the
        // fold, which is what a screenshot or a print stylesheet captures.
        setValue(0);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en")}
    </span>
  );
}
