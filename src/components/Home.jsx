import React from "react";
import { motion} from "framer-motion";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  /* ── HERO ── */
  .home-hero {
    min-height: 100vh;
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e3a5f 65%, #0f2027 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 10rem 7% 6rem;
    position: relative; overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    text-align: center;
  }

  /* mesh orbs */
  .h-orb {
    position: absolute; border-radius: 50%;
    pointer-events: none; filter: blur(90px);
  }
  .h-orb-1 { width:500px;height:500px;top:-10%;left:-8%;background:radial-gradient(circle,rgba(244,114,182,0.5),transparent 70%);animation:orbFloat1 14s ease-in-out infinite alternate; }
  .h-orb-2 { width:420px;height:420px;top:15%;right:-8%;background:radial-gradient(circle,rgba(129,140,248,0.5),transparent 70%);animation:orbFloat2 16s ease-in-out infinite alternate; }
  .h-orb-3 { width:350px;height:350px;bottom:-10%;left:35%;background:radial-gradient(circle,rgba(52,211,153,0.35),transparent 70%);animation:orbFloat1 12s ease-in-out infinite alternate 3s; }

  @keyframes orbFloat1 { from{transform:translate(0,0) scale(1)} to{transform:translate(35px,-25px) scale(1.06)} }
  @keyframes orbFloat2 { from{transform:translate(0,0) scale(1)} to{transform:translate(-25px,35px) scale(1.04)} }

  /* grid pattern */
  .h-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(196,181,253,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(196,181,253,0.04) 1px, transparent 1px);
    background-size: 64px 64px;
  }

  /* floating subject chips */
  .subject-chip {
    position: absolute;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    backdrop-filter: blur(12px);
    border-radius: 50px;
    padding: 0.5rem 1.1rem;
    font-size: 0.78rem; color: rgba(255,255,255,0.75);
    white-space: nowrap; pointer-events: none;
    font-family: 'DM Sans', sans-serif;
  }

  /* badge */
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(196,181,253,0.12);
    border: 1px solid rgba(196,181,253,0.3);
    color: #c4b5fd;
    font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.42rem 1.1rem; border-radius: 100px;
    margin-bottom: 1.75rem;
  }
  .badge-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #4ade80;
    animation: bPulse 2s ease-in-out infinite;
  }
  @keyframes bPulse {
    0%,100%{box-shadow:0 0 0 3px rgba(74,222,128,0.25)}
    50%{box-shadow:0 0 0 7px rgba(74,222,128,0.08)}
  }

  /* headline */
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 5.5vw, 5rem);
    font-weight: 800; color: #fff;
    line-height: 1.08; letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
    max-width: 820px;
  }
  .hero-title .grad-text {
    background: linear-gradient(135deg, #f9a8d4, #fcd34d, #c4b5fd);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: 1.05rem; color: rgba(255,255,255,0.5);
    max-width: 520px; line-height: 1.85;
    font-weight: 300; margin: 0 auto 2.5rem;
  }

  /* CTA buttons */
  .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-bottom: 4rem; }
  .cta-primary {
    background: linear-gradient(135deg, #f472b6, #c084fc);
    color: #fff; border: none;
    padding: 1rem 2.2rem; border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 600;
    cursor: pointer; text-decoration: none; display: inline-flex;
    align-items: center; gap: 0.5rem;
    box-shadow: 0 6px 24px rgba(192,132,252,0.4);
    transition: all 0.3s; position: relative; overflow: hidden;
  }
  .cta-primary::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #fb923c, #f472b6, #c084fc);
    opacity: 0; transition: opacity 0.35s;
  }
  .cta-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(192,132,252,0.55); }
  .cta-primary:hover::before { opacity: 1; }
  .cta-primary span { position: relative; z-index: 1; }

  .cta-ghost {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.18);
    color: rgba(255,255,255,0.75);
    padding: 1rem 2.2rem; border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 500;
    cursor: pointer; text-decoration: none;
    transition: all 0.25s; backdrop-filter: blur(8px);
  }
  .cta-ghost:hover { background: rgba(255,255,255,0.12); color: #fff; border-color: rgba(255,255,255,0.3); }

  /* trust bar */
  .trust-bar {
    display: flex; align-items: center; gap: 2.5rem;
    padding: 1.5rem 2.5rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    backdrop-filter: blur(12px);
    flex-wrap: wrap; justify-content: center;
    margin-bottom: 0;
  }
  .trust-item { text-align: center; }
  .trust-num {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem; font-weight: 800;
    background: linear-gradient(135deg, #fcd34d, #f9a8d4);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; display: block; line-height: 1;
  }
  .trust-lbl {
    font-size: 0.68rem; color: rgba(255,255,255,0.3);
    text-transform: uppercase; letter-spacing: 0.09em;
    margin-top: 0.25rem; display: block;
  }
  .trust-divider {
    width: 1px; height: 40px;
    background: rgba(255,255,255,0.1);
    flex-shrink: 0;
  }

  /* scroll indicator */
  .scroll-hint {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: rgba(255,255,255,0.2); font-size: 0.7rem; letter-spacing: 0.1em;
    text-transform: uppercase; font-family: 'DM Sans', sans-serif;
  }
  .scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(180deg, rgba(196,181,253,0.5), transparent);
    animation: scrollLine 2s ease-in-out infinite;
  }
  @keyframes scrollLine { 0%,100%{opacity:0.4;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(0.6)} }

  /* ── FEATURES STRIP ── */
  .features-strip {
    background: #fff;
    padding: 5rem 7%;
    position: relative; overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }
  .features-strip::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #f472b6, #c084fc, #818cf8, #6ee7b7);
  }
  .features-inner {
    max-width: 1140px; margin: 0 auto;
  }
  .features-label {
    text-align: center;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: #c084fc;
    margin-bottom: 0.75rem;
  }
  .features-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 800; color: #1e1b4b;
    text-align: center; line-height: 1.2;
    letter-spacing: -0.02em; margin-bottom: 3.5rem;
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .feat-card {
    background: linear-gradient(160deg, #fdf4ff, #fce7f3);
    border: 1px solid #f3e8ff;
    border-radius: 22px;
    padding: 2.2rem;
    position: relative; overflow: hidden;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    cursor: default;
  }
  .feat-card::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: var(--accent-grad);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .feat-card:hover { transform: translateY(-7px); box-shadow: 0 20px 50px rgba(196,181,253,0.2); border-color: rgba(196,181,253,0.4); }
  .feat-card:hover::before { transform: scaleX(1); }

  .feat-icon-wrap {
    width: 56px; height: 56px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; margin-bottom: 1.2rem;
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }
  .feat-card:hover .feat-icon-wrap { transform: scale(1.15) rotate(-5deg); }

  .feat-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; font-weight: 700;
    color: #1e1b4b; margin-bottom: 0.6rem;
  }
  .feat-card p {
    font-size: 0.85rem; color: #6b7280; line-height: 1.75;
  }
  .feat-tag {
    display: inline-block;
    margin-top: 1.2rem;
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase;
    padding: 0.28rem 0.75rem; border-radius: 100px;
    border: 1px solid;
  }

  /* ── WHY SECTION ── */
  .why-section {
    background: linear-gradient(160deg, #1e1b4b 0%, #312e81 55%, #1e3a5f 100%);
    padding: 6rem 7%;
    position: relative; overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }
  .why-blob {
    position: absolute; border-radius: 50%;
    pointer-events: none; filter: blur(90px); opacity: 0.3;
  }
  .why-blob-1{width:400px;height:400px;top:-10%;right:-5%;background:radial-gradient(circle,#f472b6,transparent 70%);}
  .why-blob-2{width:350px;height:350px;bottom:-10%;left:-5%;background:radial-gradient(circle,#818cf8,transparent 70%);}

  .why-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 5rem; align-items: center;
  }
  .why-label {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: #c4b5fd; margin-bottom: 0.75rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .why-label::before {
    content: ''; display: block; width: 24px; height: 2px; border-radius: 2px;
    background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
  }
  .why-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 3vw, 2.6rem);
    font-weight: 800; color: #fff; line-height: 1.2;
    letter-spacing: -0.02em; margin-bottom: 1.5rem;
  }
  .why-title em {
    font-style: normal;
    background: linear-gradient(135deg, #f9a8d4, #c4b5fd);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .why-desc { font-size: 0.95rem; color: rgba(255,255,255,0.45); line-height: 1.9; margin-bottom: 2rem; }

  .why-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
  .why-item {
    display: flex; align-items: flex-start; gap: 1rem;
    font-size: 0.9rem; color: rgba(255,255,255,0.68);
    padding: 1rem 1.2rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px; transition: all 0.25s;
  }
  .why-item:hover { background: rgba(255,255,255,0.07); border-color: rgba(196,181,253,0.25); transform: translateX(4px); }
  .why-check {
    width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, #f472b6, #c084fc);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; color: #fff; font-weight: 700;
    box-shadow: 0 4px 12px rgba(192,132,252,0.4);
  }

  /* right: big stat card */
  .why-stat-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  }
  .why-stat-card {
    border-radius: 20px; padding: 1.8rem;
    position: relative; overflow: hidden;
    transition: all 0.3s;
  }
  .why-stat-card:hover { transform: translateY(-5px); }
  .why-stat-card.c1 { background: linear-gradient(135deg, rgba(244,114,182,0.15), rgba(192,132,252,0.1)); border: 1px solid rgba(244,114,182,0.25); }
  .why-stat-card.c2 { background: linear-gradient(135deg, rgba(196,181,253,0.15), rgba(129,140,248,0.1)); border: 1px solid rgba(196,181,253,0.25); }
  .why-stat-card.c3 { background: linear-gradient(135deg, rgba(110,231,183,0.12), rgba(52,211,153,0.08)); border: 1px solid rgba(110,231,183,0.2); }
  .why-stat-card.c4 { background: linear-gradient(135deg, rgba(253,211,77,0.12), rgba(249,168,212,0.08)); border: 1px solid rgba(253,211,77,0.2); }

  .ws-icon { font-size: 1.6rem; margin-bottom: 0.85rem; display: block; }
  .ws-num {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem; font-weight: 800;
    background: linear-gradient(135deg, #f9a8d4, #c4b5fd);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; display: block; line-height: 1; margin-bottom: 0.3rem;
  }
  .ws-lbl { font-size: 0.75rem; color: rgba(255,255,255,0.4); font-weight: 400; }

  /* ── SUBJECTS QUICK STRIP ── */
  .subjects-strip {
    background: #fff;
    padding: 5rem 7%;
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }
  .subjects-strip::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, #f9a8d4, #c4b5fd, transparent);
  }
  .ss-inner { max-width: 1140px; margin: 0 auto; }
  .ss-head {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem;
  }
  .ss-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.7rem, 2.8vw, 2.3rem);
    font-weight: 800; color: #1e1b4b; line-height: 1.15;
    letter-spacing: -0.02em;
  }
  .ss-link {
    font-size: 0.83rem; color: #c084fc; font-weight: 600;
    text-decoration: none; border-bottom: 1px solid rgba(192,132,252,0.4);
    transition: color 0.2s; white-space: nowrap;
  }
  .ss-link:hover { color: #f472b6; border-color: rgba(244,114,182,0.4); }

  .ss-pills { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .ss-pill {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.7rem 1.3rem; border-radius: 50px;
    font-size: 0.85rem; font-weight: 500;
    transition: all 0.25s; cursor: default;
    border: 1px solid;
  }

  /* ── CTA BANNER ── */
  .cta-banner {
    background: linear-gradient(135deg, #312e81 0%, #1e3a5f 100%);
    padding: 5rem 7%;
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
    text-align: center;
  }
  .cta-banner-orb {
    position: absolute; border-radius: 50%;
    pointer-events: none; filter: blur(80px); opacity: 0.35;
  }
  .cta-banner h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 800; color: #fff;
    line-height: 1.15; letter-spacing: -0.02em;
    margin-bottom: 1rem; position: relative; z-index: 1;
  }
  .cta-banner h2 em {
    font-style: normal;
    background: linear-gradient(135deg, #f9a8d4, #fcd34d);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cta-banner p { font-size: 1rem; color: rgba(255,255,255,0.45); margin-bottom: 2.5rem; position: relative; z-index: 1; }

  .cta-banner-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .features-grid { grid-template-columns: 1fr; }
    .why-inner { grid-template-columns: 1fr; gap: 3rem; }
    .why-stat-grid { grid-template-columns: 1fr 1fr; }
    .trust-bar { gap: 1.5rem; }
  }
  @media (max-width: 640px) {
    .why-stat-grid { grid-template-columns: 1fr 1fr; }
    .trust-divider { display: none; }
  }
`;

const FEATURES = [
  {
    icon: "📚",
    title: "Concept Clarity First",
    desc: "Strong foundations built through clear explanations, real-life examples, and step-by-step problem solving tailored to each student.",
    tag: "Core Approach",
    tagColor: {
      bg: "rgba(244,114,182,0.1)",
      border: "rgba(244,114,182,0.3)",
      color: "#be185d",
    },
    iconBg:
      "linear-gradient(135deg,rgba(249,168,212,0.2),rgba(216,180,254,0.2))",
    accent: "linear-gradient(90deg,#f472b6,#c084fc)",
  },
  {
    icon: "🎯",
    title: "Personal 1-on-1 Attention",
    desc: "Every session is tailored to your child's pace and learning style. No rushing through topics — we move when your child is ready.",
    tag: "Home Visits",
    tagColor: {
      bg: "rgba(196,181,253,0.1)",
      border: "rgba(196,181,253,0.3)",
      color: "#4c1d95",
    },
    iconBg:
      "linear-gradient(135deg,rgba(196,181,253,0.2),rgba(129,140,248,0.2))",
    accent: "linear-gradient(90deg,#c084fc,#818cf8)",
  },
  {
    icon: "📈",
    title: "Result-Oriented Teaching",
    desc: "Regular assessments, weekly tests, and detailed progress reports keep parents informed and students motivated throughout.",
    tag: "100+ Students",
    tagColor: {
      bg: "rgba(110,231,183,0.1)",
      border: "rgba(110,231,183,0.25)",
      color: "#065f46",
    },
    iconBg:
      "linear-gradient(135deg,rgba(167,243,208,0.2),rgba(110,231,183,0.15))",
    accent: "linear-gradient(90deg,#34d399,#6ee7b7)",
  },
];

const WHY_ITEMS = [
  "CBSE & ICSE curriculum specialist with 5+ years experience",
  "Flexible timings — morning, evening & weekend slots available",
  "Regular parent feedback and progress updates after every session",
  "Exam preparation with previous year papers and mock tests",
  "Covers all subjects: Maths, Science, English, Hindi & Social Studies",
];

const WHY_STATS = [
  { icon: "🎓", num: "5+", lbl: "Years Experience", c: "c1" },
  { icon: "👦", num: "100+", lbl: "Students Taught", c: "c2" },
  { icon: "📋", num: "9", lbl: "Classes Covered", c: "c3" },
  { icon: "⭐", num: "5.0", lbl: "Average Rating", c: "c4" },
];

const SUBJECT_PILLS = [
  {
    label: "Mathematics",
    emoji: "🔢",
    bg: "rgba(244,114,182,0.1)",
    border: "rgba(244,114,182,0.3)",
    color: "#be185d",
  },
  {
    label: "Science",
    emoji: "🔬",
    bg: "rgba(110,231,183,0.1)",
    border: "rgba(110,231,183,0.25)",
    color: "#065f46",
  },
  {
    label: "English",
    emoji: "📖",
    bg: "rgba(125,211,252,0.1)",
    border: "rgba(125,211,252,0.3)",
    color: "#075985",
  },
  {
    label: "Hindi",
    emoji: "🖊️",
    bg: "rgba(196,181,253,0.1)",
    border: "rgba(196,181,253,0.3)",
    color: "#4c1d95",
  },
  {
    label: "Social Studies",
    emoji: "🌍",
    bg: "rgba(253,230,138,0.12)",
    border: "rgba(253,211,77,0.3)",
    color: "#78350f",
  },
  {
    label: "EVS",
    emoji: "🌿",
    bg: "rgba(167,243,208,0.1)",
    border: "rgba(52,211,153,0.25)",
    color: "#064e3b",
  },
  {
    label: "All Subjects",
    emoji: "✨",
    bg: "rgba(253,186,116,0.1)",
    border: "rgba(251,146,60,0.3)",
    color: "#7c2d12",
  },
];

const FLOAT_CHIPS = [
  { text: "🎓 CBSE & ICSE", top: "18%", left: "3%", delay: 0 },
  { text: "📍 Delhi NCR", top: "30%", right: "3%", delay: 1.2 },
  { text: "⭐ 5.0 Rating", bottom: "30%", left: "2%", delay: 2 },
  { text: "🏠 Home Visits", bottom: "22%", right: "2%", delay: 0.7 },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

const inViewFadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Home() {
  return (
    <>
      <style>{styles}</style>

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="home-hero">
        <div className="h-orb h-orb-1" />
        <div className="h-orb h-orb-2" />
        <div className="h-orb h-orb-3" />
        <div className="h-grid" />

        {/* floating chips */}
        {FLOAT_CHIPS.map((c, i) => (
          <motion.div
            key={i}
            className="subject-chip"
            style={{
              top: c.top,
              left: c.left,
              right: c.right,
              bottom: c.bottom,
            }}
            animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: c.delay,
            }}
          >
            {c.text}
          </motion.div>
        ))}

        {/* badge */}
        <motion.div {...fadeUp(0)}>
          <div className="hero-badge">
            <div className="badge-pulse" />
            Accepting New Students for 2025–26
          </div>
        </motion.div>

        {/* headline */}
        <motion.h1 className="hero-title" {...fadeUp(0.1)}>
          Expert Home Tutoring for{" "}
          <span className="grad-text">Every Child</span>
        </motion.h1>

        <motion.p className="hero-sub" {...fadeUp(0.2)}>
          Dedicated 1-on-1 home tuition for Class 1–9 in Delhi NCR. Building
          strong concepts, real confidence, and lasting results — one student at
          a time.
        </motion.p>

        <motion.div className="hero-ctas" {...fadeUp(0.3)}>
          <motion.a
            href="#contact"
            className="cta-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>📅 Book a Free Demo</span>
          </motion.a>
          <motion.a
            href="#about"
            className="cta-ghost"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Learn More →
          </motion.a>
        </motion.div>

        {/* trust bar */}
        <motion.div className="trust-bar" {...fadeUp(0.4)}>
          {[
            { num: "5+", lbl: "Years Experience" },
            { num: "100+", lbl: "Students Taught" },
            { num: "9", lbl: "Classes Covered" },
            { num: "5.0★", lbl: "Avg Rating" },
          ].map((s, i) => (
            <div
              key={s.lbl}
              style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
            >
              {i > 0 && <div className="trust-divider" />}
              <div className="trust-item">
                <span className="trust-num">{s.num}</span>
                <span className="trust-lbl">{s.lbl}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* scroll hint */}
        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ═══════════════════════════════ FEATURES ═══════════════════════════ */}
      <section className="features-strip">
        <div className="features-inner">
          <motion.div {...inViewFadeUp(0)}>
            <p className="features-label">Why Choose Ms. Vanshika</p>
            <h2 className="features-title">
              Teaching that makes a<br />
              real difference
            </h2>
          </motion.div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <motion.div
                className="feat-card"
                key={f.title}
                style={{ "--accent-grad": f.accent }}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -7 }}
              >
                <motion.div
                  className="feat-icon-wrap"
                  style={{ background: f.iconBg }}
                  whileHover={{ scale: 1.15, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {f.icon}
                </motion.div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span
                  className="feat-tag"
                  style={{
                    background: f.tagColor.bg,
                    borderColor: f.tagColor.border,
                    color: f.tagColor.color,
                  }}
                >
                  ✦ {f.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ WHY US ═════════════════════════════ */}
      <section className="why-section">
        <div className="why-blob why-blob-1" />
        <div className="why-blob why-blob-2" />
        <div className="why-inner">
          {/* left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="why-label">What Sets Me Apart</div>
            <h2 className="why-title">
              More than just a tutor —<br />a <em>learning partner</em>
            </h2>
            <p className="why-desc">
              I work closely with every student to understand how they learn
              best, then design sessions that bring out their potential.
            </p>
            <ul className="why-list">
              {WHY_ITEMS.map((item, i) => (
                <motion.li
                  className="why-item"
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="why-check">✓</div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* right */}
          <div className="why-stat-grid">
            {WHY_STATS.map((s, i) => (
              <motion.div
                className={`why-stat-card ${s.c}`}
                key={s.lbl}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 180 }}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <span className="ws-icon">{s.icon}</span>
                <span className="ws-num">{s.num}</span>
                <span className="ws-lbl">{s.lbl}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SUBJECTS ═══════════════════════════ */}
      <section className="subjects-strip">
        <div className="ss-inner">
          <motion.div
            className="ss-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="ss-title">
              All Core Subjects,
              <br />
              All Classes 1–9
            </h2>
            <a href="#subjects" className="ss-link">
              View all subjects →
            </a>
          </motion.div>
          <div className="ss-pills">
            {SUBJECT_PILLS.map((p, i) => (
              <motion.div
                className="ss-pill"
                key={p.label}
                style={{
                  background: p.bg,
                  borderColor: p.border,
                  color: p.color,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 220 }}
                whileHover={{ y: -4, scale: 1.05 }}
              >
                <span style={{ fontSize: "1.1rem" }}>{p.emoji}</span>
                {p.label}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ CTA BANNER ═════════════════════════ */}
      <section className="cta-banner">
        <div
          className="cta-banner-orb"
          style={{
            width: 500,
            height: 500,
            top: "-30%",
            right: "-10%",
            background:
              "radial-gradient(circle,rgba(196,181,253,0.4),transparent 70%)",
          }}
        />
        <div
          className="cta-banner-orb"
          style={{
            width: 400,
            height: 400,
            bottom: "-30%",
            left: "-8%",
            background:
              "radial-gradient(circle,rgba(244,114,182,0.35),transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>
            Ready to see your child
            <br />
            <em>thrive academically?</em>
          </h2>
          <p>Book a free demo session today. No commitment required.</p>

          <div className="cta-banner-btns">
            <motion.a
              href="#contact"
              className="cta-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>📅 Book Free Demo</span>
            </motion.a>
            <motion.a
              href="#reviews"
              className="cta-ghost"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Read Reviews →
            </motion.a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
