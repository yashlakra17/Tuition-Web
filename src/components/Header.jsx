import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { AnimatedCounter } from "./UI.jsx";
import { HERO_STATS, PROFILE_TAGS, PROFILE_INFO } from "../data/siteData.js";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --rose:    #f9a8d4;
    --rose2:   #fbcfe8;
    --lavender:#c4b5fd;
    --lav2:    #ddd6fe;
    --mint:    #6ee7b7;
    --mint2:   #a7f3d0;
    --peach:   #fcd34d;
    --peach2:  #fde68a;
    --sky:     #7dd3fc;
    --sky2:    #bae6fd;

    --bg-hero: linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e3a5f 65%, #0f2027 100%);
    --card-glass: rgba(255,255,255,0.07);
    --card-border: rgba(255,255,255,0.13);
    --text-muted: rgba(255,255,255,0.5);
    --text-faint: rgba(255,255,255,0.28);
  }

  .hero-v2 {
    min-height: 100vh;
    background: var(--bg-hero);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 9rem 7% 6rem;
    gap: 4rem;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* animated mesh orbs */
  .orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(90px);
    opacity: 0.55;
  }
  .orb-rose   { width:480px;height:480px;top:-10%;left:-5%; background:radial-gradient(circle,#f472b6,transparent 70%); animation: driftA 12s ease-in-out infinite alternate; }
  .orb-lav    { width:420px;height:420px;top:20%;right:-8%; background:radial-gradient(circle,#818cf8,transparent 70%); animation: driftB 14s ease-in-out infinite alternate; }
  .orb-mint   { width:360px;height:360px;bottom:-15%;left:30%; background:radial-gradient(circle,#34d399,transparent 70%); animation: driftA 10s ease-in-out infinite alternate 3s; }

  @keyframes driftA { from{transform:translate(0,0) scale(1)} to{transform:translate(40px,-30px) scale(1.08)} }
  @keyframes driftB { from{transform:translate(0,0) scale(1)} to{transform:translate(-30px,40px) scale(1.05)} }

  /* noise grain overlay */
  .hero-grain {
    position:absolute;inset:0;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity:0.35;
  }

  /* badge */
  .hero-badge-v2 {
    display:inline-flex;align-items:center;gap:0.5rem;
    background:rgba(196,181,253,0.15);
    border:1px solid rgba(196,181,253,0.35);
    color:var(--lavender);
    font-size:0.7rem;font-weight:500;
    letter-spacing:0.12em;text-transform:uppercase;
    padding:0.4rem 1rem;border-radius:100px;
    margin-bottom:1.5rem;
  }
  .badge-dot {
    width:7px;height:7px;border-radius:50%;
    background:#4ade80;
    box-shadow:0 0 0 3px rgba(74,222,128,0.25);
    animation:pulseGlow 2s ease-in-out infinite;
  }
  @keyframes pulseGlow {
    0%,100%{box-shadow:0 0 0 3px rgba(74,222,128,0.25)}
    50%{box-shadow:0 0 0 6px rgba(74,222,128,0.1)}
  }

  /* headline */
  .hero-h1 {
    font-family:'Playfair Display',serif;
    font-size:clamp(2.8rem,4.5vw,4.4rem);
    font-weight:800;color:#fff;
    line-height:1.1;letter-spacing:-0.02em;
    margin-bottom:1.3rem;
  }
  .hero-h1 .accent {
    background: linear-gradient(135deg, var(--rose), var(--peach), var(--lavender));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
    position:relative;display:inline-block;
  }
  .hero-h1 .accent::after {
    content:'';position:absolute;
    bottom:-6px;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--rose),var(--lavender));
    border-radius:2px;opacity:0.7;
  }

  .hero-desc-v2 {
    font-size:1rem;color:rgba(255,255,255,0.52);
    max-width:460px;line-height:1.9;font-weight:300;
    margin-bottom:2.5rem;
  }

  /* buttons */
  .hero-btns { display:flex;gap:0.9rem;flex-wrap:wrap;margin-bottom:3rem; }
  .btn-glow {
    background:linear-gradient(135deg,#f472b6,#c084fc);
    color:#fff;border:none;
    padding:0.9rem 1.9rem;border-radius:50px;
    font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:600;
    cursor:pointer;text-decoration:none;display:inline-block;
    position:relative;overflow:hidden;
    transition:transform 0.25s,box-shadow 0.25s;
    box-shadow:0 4px 20px rgba(244,114,182,0.4);
  }
  .btn-glow::before {
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,#fb923c,#f472b6,#c084fc);
    opacity:0;transition:opacity 0.35s;
  }
  .btn-glow:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(192,132,252,0.5)}
  .btn-glow:hover::before{opacity:1}
  .btn-glow span{position:relative;z-index:1}

  .btn-ghost-v2 {
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.18);
    color:rgba(255,255,255,0.7);
    padding:0.9rem 1.9rem;border-radius:50px;
    font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:500;
    cursor:pointer;text-decoration:none;display:inline-block;
    transition:all 0.25s;backdrop-filter:blur(8px);
  }
  .btn-ghost-v2:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.3);color:#fff;}

  /* stats */
  .hero-stats-v2 {
    display:flex;gap:2.5rem;
    padding-top:2.5rem;
    border-top:1px solid rgba(255,255,255,0.08);
  }
  .stat-num {
    font-family:'Playfair Display',serif;
    font-size:2.6rem;font-weight:800;
    background:linear-gradient(135deg,var(--peach),var(--rose));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
    display:block;line-height:1;
  }
  .stat-label {
    font-size:0.7rem;color:rgba(255,255,255,0.32);
    text-transform:uppercase;letter-spacing:0.09em;
    margin-top:0.3rem;display:block;
  }

  /* profile card */
  .profile-card-v2 {
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.12);
    border-radius:28px;
    padding:2.6rem;
    backdrop-filter:blur(20px);
    position:relative;overflow:hidden;
    max-width:380px;width:100%;
  }
  .profile-card-v2::before {
    content:'';position:absolute;inset:-1px;border-radius:28px;
    background:linear-gradient(135deg,rgba(244,114,182,0.25),rgba(196,181,253,0.15),rgba(52,211,153,0.1));
    z-index:-1;
  }
  .profile-card-v2::after {
    content:'';position:absolute;
    top:-60px;right:-60px;
    width:200px;height:200px;border-radius:50%;
    background:radial-gradient(circle,rgba(196,181,253,0.15),transparent 70%);
    pointer-events:none;
  }

  .prof-avatar {
    width:76px;height:76px;border-radius:50%;
    background:linear-gradient(135deg,#f472b6,#c084fc,#818cf8);
    display:flex;align-items:center;justify-content:center;
    font-family:'Playfair Display',serif;
    font-size:1.9rem;font-weight:800;color:#fff;
    border:3px solid rgba(255,255,255,0.2);
    margin-bottom:1.2rem;
    box-shadow:0 0 0 6px rgba(196,181,253,0.15);
  }
  .prof-name {
    font-family:'Playfair Display',serif;
    font-size:1.35rem;font-weight:700;color:#fff;margin-bottom:0.2rem;
  }
  .prof-title { font-size:0.77rem;color:rgba(255,255,255,0.38);letter-spacing:0.04em;margin-bottom:1.4rem; }

  .prof-tags { display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1.4rem; }
  .prof-tag {
    background:rgba(196,181,253,0.12);
    border:1px solid rgba(196,181,253,0.3);
    color:var(--lavender);
    font-size:0.72rem;padding:0.28rem 0.75rem;border-radius:100px;
    transition:all 0.2s;cursor:default;
  }
  .prof-tag:hover{background:rgba(196,181,253,0.22);border-color:rgba(196,181,253,0.5);}

  .prof-divider{border:none;border-top:1px solid rgba(255,255,255,0.08);margin:1.2rem 0;}

  .prof-row {
    display:flex;align-items:center;gap:0.65rem;
    font-size:0.83rem;color:rgba(255,255,255,0.52);
    margin-bottom:0.6rem;
  }
  .prof-icon {
    width:28px;height:28px;border-radius:8px;
    background:rgba(196,181,253,0.12);
    display:flex;align-items:center;justify-content:center;
    font-size:0.9rem;flex-shrink:0;
  }

  .prof-avail {
    display:flex;align-items:center;gap:0.65rem;
    margin-top:1.2rem;padding-top:1.2rem;
    border-top:1px solid rgba(255,255,255,0.07);
  }
  .avail-dot-v2 {
    width:8px;height:8px;border-radius:50%;
    background:#4ade80;
    box-shadow:0 0 0 3px rgba(74,222,128,0.2);
    animation:pulseGlow 2s infinite;flex-shrink:0;
  }
  .avail-txt { font-size:0.77rem;color:rgba(255,255,255,0.35); }

  /* floating chips above card */
  .float-chip {
    position:absolute;
    background:rgba(255,255,255,0.09);
    border:1px solid rgba(255,255,255,0.15);
    backdrop-filter:blur(12px);
    border-radius:50px;
    padding:0.5rem 1rem;
    font-size:0.75rem;color:#fff;
    white-space:nowrap;
    pointer-events:none;
  }

  @media(max-width:960px){
    .hero-v2{grid-template-columns:1fr;text-align:center;padding:8rem 5% 5rem;}
    .hero-desc-v2{margin:0 auto 2.5rem;}
    .hero-btns{justify-content:center;}
    .hero-stats-v2{justify-content:center;}
    .profile-card-v2{display:none;}
  }
  @media(max-width:500px){
    .hero-stats-v2{flex-wrap:wrap;gap:1.5rem;}
  }
`;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Header() {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <>
      <style>{styles}</style>
      <header className="hero-v2" id="home">
        <div className="orb orb-rose" />
        <div className="orb orb-lav" />
        <div className="orb orb-mint" />
        <div className="hero-grain" />

        {/* LEFT */}
        <motion.div variants={stagger} initial="initial" animate="animate">
          <motion.div {...fadeUp(0)}>
            <div className="hero-badge-v2">
              <div className="badge-dot" />
              Accepting New Students for 2025–26
            </div>
          </motion.div>

          <motion.h1 className="hero-h1" {...fadeUp(0.1)}>
            Personalised Tutoring for{" "}
            <span className="accent">Every Child</span>
          </motion.h1>

          <motion.p className="hero-desc-v2" {...fadeUp(0.2)}>
            Dedicated home tutor for Class 1–9 across all subjects. Building
            strong foundations with patience, structure, and a tailored approach
            for every learner.
          </motion.p>

          <motion.div className="hero-btns" {...fadeUp(0.3)}>
            <a href="#contact" className="btn-glow">
              <span>Book a Free Demo →</span>
            </a>
            <a href="#subjects" className="btn-ghost-v2">View Subjects ↓</a>
          </motion.div>

          <motion.div className="hero-stats-v2" {...fadeUp(0.4)}>
            {HERO_STATS.map(({ value, suffix, label }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}>
                <span className="stat-num">
                  <AnimatedCounter target={value} suffix={suffix} />
                </span>
                <span className="stat-label">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D tilt card */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", perspective: "1000px", position: "relative" }}>

          {/* floating chips */}
          <motion.div className="float-chip"
            style={{ top: "0%", left: "-5%" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            🎓 CBSE & ICSE
          </motion.div>
          <motion.div className="float-chip"
            style={{ bottom: "8%", right: "-2%" }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
            ✅ Home Visits
          </motion.div>

          <motion.div
            ref={cardRef}
            className="profile-card-v2"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>

            <motion.div className="prof-avatar"
              animate={{ boxShadow: ["0 0 0 6px rgba(196,181,253,0.15)", "0 0 0 12px rgba(196,181,253,0.05)", "0 0 0 6px rgba(196,181,253,0.15)"] }}
              transition={{ duration: 3, repeat: Infinity }}>
              V
            </motion.div>

            <div className="prof-name">Ms. Vanshika</div>
            <div className="prof-title">Home Tutor · Class 1–9 · All Subjects</div>

            <div className="prof-tags">
              {PROFILE_TAGS.map((tag, i) => (
                <motion.span className="prof-tag" key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}>
                  {tag}
                </motion.span>
              ))}
            </div>

            <hr className="prof-divider" />

            {PROFILE_INFO.map(({ icon, text }, i) => (
              <motion.div className="prof-row" key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.07 }}>
                <div className="prof-icon">{icon}</div>
                {text}
              </motion.div>
            ))}

            <div className="prof-avail">
              <div className="avail-dot-v2" />
              <span className="avail-txt">Currently accepting new students</span>
            </div>
          </motion.div>
        </div>
      </header>
    </>
  );
}