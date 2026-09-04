import React, { useEffect, useRef, useState } from "react";

/* ================= hooks ================= */

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ================= Reveal ================= */

export function Reveal({
  children,
  className = "",
  delay = 0,
  dir,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  dir?: "left" | "right";
  as?: "div" | "section" | "li" | "figure";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLLIElement>}
      className={`rv ${dir === "left" ? "rv-left" : dir === "right" ? "rv-right" : ""} ${
        inView ? "is-in" : ""
      } ${className}`}
      style={{ ["--d" as string]: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

/* ================= Counter ================= */

export function Counter({
  to,
  suffix = "",
  className = "",
  duration = 1700,
}: {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReduced()) {
      setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {val.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

/* ================= SectionHead ================= */

export function SectionHead({
  overline,
  title,
  note,
  tone = "dark",
  className = "",
}: {
  overline: string;
  title: React.ReactNode;
  note?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <div className="max-w-2xl">
        <Reveal>
          <p
            className={`flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.32em] ${
              dark ? "text-honey-400" : "text-honey-600"
            }`}
          >
            <LeafIcon className="h-4 w-4" />
            {overline}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className={`font-display mt-5 text-[clamp(1.7rem,4.2vw,3.1rem)] font-bold leading-[1.08] tracking-tight ${
              dark ? "text-paper-50" : "text-pine-950"
            }`}
          >
            {title}
          </h2>
        </Reveal>
      </div>
      {note && (
        <Reveal delay={0.16} className="max-w-sm">
          <p className={`text-[15px] leading-relaxed ${dark ? "text-mint-200/80" : "text-ink-500"}`}>
            {note}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ================= Tilt card ================= */

export function Tilt({
  children,
  className = "",
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${
      -py * max
    }deg) translateY(-4px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

/* ================= Marquee ================= */

export function Marquee({
  items,
  speed = 30,
  className = "",
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display px-6 text-sm font-bold uppercase tracking-[0.22em] md:px-9 md:text-base">
            {it}
          </span>
          <LeafIcon className="h-4 w-4 shrink-0 opacity-70" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track" style={{ ["--speed" as string]: `${speed}s` }}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ================= Icons (hand-drawn strokes) ================= */

type IP = { className?: string };
const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const LeafIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z" />
    <path d="M4 20C8 14 12 10 17 7" />
  </svg>
);

export const PineLogo = ({ className }: IP) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.14" />
    <path d="M16 4.5l5.6 7.6h-3.2l4.2 5.7h-3.4l4.4 6.7H8.4l4.4-6.7H9.4l4.2-5.7h-3.2L16 4.5z" fill="#B9E05C" />
    <rect x="14.7" y="24.5" width="2.6" height="3.4" rx="0.8" fill="#E8912D" />
  </svg>
);

export const ArrowIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M3 12h17" />
    <path d="M14 5.5 20.5 12 14 18.5" />
  </svg>
);

export const SunIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19" />
  </svg>
);

export const MoonIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    <path d="M16 4.5h.01M19 8h.01" strokeWidth="2.4" />
  </svg>
);

export const StarIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.8l2.7 5.9 6.3.7-4.7 4.3 1.3 6.2L12 16.7l-5.6 3.2 1.3-6.2L3 9.4l6.3-.7L12 2.8z" />
  </svg>
);

export const PhoneIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M5.5 3.5h3l1.7 4.4-2.1 1.7a12.8 12.8 0 0 0 6.3 6.3l1.7-2.1 4.4 1.7v3c0 1-.9 1.9-1.9 1.8C10.4 19.6 4.4 13.6 3.7 5.4c-.1-1 .8-1.9 1.8-1.9Z" />
  </svg>
);

export const RulerIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M3.5 16.5 16.5 3.5l4 4L7.5 20.5l-4-4Z" />
    <path d="M8 16l1.6-1.6M11 13l1.6-1.6M14 10l1.6-1.6" />
  </svg>
);

export const BedIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M3 18v-8m0 4h18v4m0-4v-2a3 3 0 0 0-3-3h-8v5" />
    <circle cx="6.5" cy="8.5" r="1.8" />
  </svg>
);

export const FloorsIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M4 20V9l8-5.5L20 9v11" />
    <path d="M2.5 20h19" />
    <path d="M4 14.5h16" />
  </svg>
);

export const CompassIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5 13.4 13.4 8.5 15.5l2.1-4.9 4.9-2.1Z" />
  </svg>
);

export const DocIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M6 3.5h8l4 4v13H6V3.5Z" />
    <path d="M14 3.5v4h4M9.5 12h5M9.5 15.5h5" />
  </svg>
);

export const FoundationIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M4 12.5 12 6l8 6.5" />
    <path d="M6 11v8.5h12V11" />
    <path d="M9 19.5v-5h6v5" />
    <path d="M2.5 21.5h19" />
  </svg>
);

export const WrenchIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M14.5 6.5a4 4 0 0 0-5.2 5L4 16.8a2 2 0 1 0 2.8 2.8l5.3-5.3a4 4 0 0 0 5-5.2l-2.6 2.6-2.5-.7-.7-2.5 2.6-2.6Z" />
  </svg>
);

export const KeyIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <circle cx="8" cy="8.5" r="4.5" />
    <path d="M11.5 11.5 20 20M17 17l2-2M14.5 14.5l2-2" />
  </svg>
);

export const FrameIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <rect x="4" y="4" width="16" height="16" rx="1.5" />
    <path d="M4 10h16M4 15.5h16M10 4v16M15.5 10v9.5" />
  </svg>
);

export const BlockIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <rect x="3.5" y="6" width="17" height="12" rx="1.5" />
    <path d="M3.5 12h17M9 6v6M15 6v6M12 12v6" />
  </svg>
);

export const BeamIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M4 8.5h16M4 12h16M4 15.5h16" />
    <path d="M4 5.5h16v13H4z" />
    <path d="M8 5.5v13M16 5.5v13" strokeDasharray="1.5 2.4" />
  </svg>
);

export const StoneIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M8 4.5h8l4 5-2 10H6l-2-10 4-5Z" />
    <path d="M6 12h12M12 4.5V12M9.5 12l-.8 7.5M14.5 12l.8 7.5" />
  </svg>
);

export const QuoteIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M9.8 6C6.4 7.6 4.5 10.2 4.5 13.6c0 2.6 1.6 4.4 3.9 4.4 2 0 3.5-1.5 3.5-3.6 0-2-1.4-3.4-3.3-3.4h-.6c.3-1.7 1.5-3.1 3.4-4.1L9.8 6Zm9.4 0c-3.4 1.6-5.3 4.2-5.3 7.6 0 2.6 1.6 4.4 3.9 4.4 2 0 3.5-1.5 3.5-3.6 0-2-1.4-3.4-3.3-3.4h-.6c.3-1.7 1.5-3.1 3.4-4.1L19.2 6Z" />
  </svg>
);

export const CheckIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M4.5 12.5 10 18 19.5 6.5" />
  </svg>
);

export const PlusIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const BurgerIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h11" />
  </svg>
);

export const CloseIcon = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const TreeMini = ({ className }: IP) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.2l4.4 5.9h-2.5l3.4 4.6h-2.7l3.6 5.5H5.8l3.6-5.5H6.7l3.4-4.6H7.6L12 2.2z" />
    <rect x="11" y="18.6" width="2" height="3.2" rx="0.6" />
  </svg>
);
