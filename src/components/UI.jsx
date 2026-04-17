import { useRef, useEffect, useState } from "react";
import { motion, useInView as useFramerInView, animate,useSpring } from "framer-motion";

// ── Reveal — scroll-triggered with Framer Motion ─────────────────────────────
const variants = {
  up:    { hidden: { opacity: 0, y: 44 },  visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -44 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -52 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 52 },  visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
  fade:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.72,
  once = true,
  style = {},
  className = "",
}) {
  const ref = useRef(null);
  const inView = useFramerInView(ref, { once, margin: "-60px" });
  const v = variants[direction] || variants.up;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={v}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}>
      {children}
    </motion.div>
  );
}

// ── AnimatedCounter ───────────────────────────────────────────────────────────
export function AnimatedCounter({ target, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useFramerInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) { setDisplay(Math.round(v)); },
    });
    return controls.stop;
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

// ── SectionTag ────────────────────────────────────────────────────────────────
const tagStyles = `
  .section-tag-v2 {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #c084fc;
    margin-bottom: 0.85rem;
  }
  .section-tag-v2 .tag-line {
    display: block;
    width: 28px; height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, #f472b6, #c084fc);
  }
  .section-tag-v2.light { color: #c4b5fd; }
  .section-tag-v2.light .tag-line {
    background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
  }
`;

export function SectionTag({ children, light = false }) {
  return (
    <>
      <style>{tagStyles}</style>
      <motion.div
        className={`section-tag-v2 ${light ? "light" : ""}`}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <motion.span
          className="tag-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ transformOrigin: "left" }}
        />
        {children}
      </motion.div>
    </>
  );
}

// ── Stagger Container ─────────────────────────────────────────────────────────
export function StaggerContainer({ children, delay = 0, stagger = 0.1, className = "", style = {} }) {
  const ref = useRef(null);
  const inView = useFramerInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } }
      }}>
      {children}
    </motion.div>
  );
}

// ── Floating element (decorative) ─────────────────────────────────────────────
export function FloatElement({ children, amplitude = 12, duration = 5, delay = 0, style = {} }) {
  return (
    <motion.div
      style={style}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}>
      {children}
    </motion.div>
  );
}

// ── Magnetic button wrapper ───────────────────────────────────────────────────
export function MagneticWrap({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
      {children}
    </motion.div>
  );
}

// ── Shimmer text ──────────────────────────────────────────────────────────────
const shimmerStyle = `
  @keyframes shimmer-sweep {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .shimmer-text {
    background: linear-gradient(
      90deg,
      #f472b6 0%,
      #c084fc 30%,
      #fcd34d 50%,
      #c084fc 70%,
      #f472b6 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer-sweep 4s linear infinite;
    display: inline-block;
  }
`;

export function ShimmerText({ children, className = "" }) {
  return (
    <>
      <style>{shimmerStyle}</style>
      <span className={`shimmer-text ${className}`}>{children}</span>
    </>
  );
}

// ── Toast — now just re-exports react-toastify helpers ────────────────────────
// (kept for backward compat if anything imports ToastContainer from UI)
export { ToastContainer } from "react-toastify";