import { motion } from "framer-motion";
import { SectionTag } from "./UI.jsx";
import { SUBJECTS } from "../data/siteData.js";

const styles = `
  .subjects-v2 {
    background: linear-gradient(160deg, #fdf4ff 0%, #fce7f3 35%, #eff6ff 70%, #f0fdf4 100%);
    padding: 7rem 7%;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .subjects-blob {
    position:absolute; border-radius:50%; pointer-events:none;
    filter:blur(80px); opacity:0.45;
  }
  .sb-blob-1{width:450px;height:450px;top:-10%;left:-8%;background:radial-gradient(circle,#c4b5fd,transparent 70%);}
  .sb-blob-2{width:380px;height:380px;bottom:-10%;right:-5%;background:radial-gradient(circle,#f9a8d4,transparent 70%);}

  .subjects-inner {
    max-width: 1140px; margin: 0 auto;
    position: relative; z-index: 1;
  }

  .section-h-light {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem,3.5vw,2.8rem); font-weight: 800;
    color: #1e1b4b; line-height: 1.2;
    letter-spacing: -0.02em; margin: 0.6rem 0 1rem;
  }

  .subjects-grid-v2 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
    gap: 1.25rem;
    margin-top: 2.5rem;
  }

  /* card */
  .subject-card-v2 {
    background: #fff;
    border: 1px solid #f3e8ff;
    border-radius: 20px;
    padding: 1.75rem 1.5rem;
    position: relative; overflow: hidden;
    cursor: default;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
  }
  .subject-card-v2::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    border-radius: 0 0 20px 20px;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .subject-card-v2:hover { transform: translateY(-7px); }
  .subject-card-v2:hover::after { transform: scaleX(1); }

  /* bg fill on hover */
  .subject-card-bg {
    position: absolute; inset: 0; border-radius: 20px;
    opacity: 0; transition: opacity 0.35s;
    pointer-events: none;
  }
  .subject-card-v2:hover .subject-card-bg { opacity: 1; }

  .subject-icon-v2 {
    font-size: 2.2rem; display: block;
    margin-bottom: 1.1rem;
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.08));
  }
  .subject-card-v2:hover .subject-icon-v2 { transform: scale(1.2) translateY(-4px); }

  .subject-card-v2 h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; font-weight: 700;
    color: #1e1b4b; margin-bottom: 0.4rem;
    position: relative; z-index: 1;
    transition: color 0.3s;
  }
  .subject-card-v2 p {
    font-size: 0.8rem; color: #6b7280;
    line-height: 1.7; position: relative; z-index: 1;
    transition: color 0.3s;
  }

  /* tag */
  .subject-tag {
    display: inline-flex; align-items: center; gap: 0.3rem;
    font-size: 0.67rem; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase;
    padding: 0.22rem 0.65rem; border-radius: 100px;
    margin-top: 0.85rem; position: relative; z-index: 1;
    border: 1px solid;
    transition: all 0.3s;
  }

  @media (max-width: 960px) {
    .subjects-grid-v2 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 500px) {
    .subjects-grid-v2 { grid-template-columns: 1fr; }
  }
`;

// Extended pastel color palette per subject
const SUBJECT_PALETTES = [
  { bg: "rgba(249,168,212,0.07)", bar: "linear-gradient(90deg,#f472b6,#fb7185)", tag: { bg:"rgba(244,114,182,0.1)", border:"rgba(244,114,182,0.3)", color:"#be185d" }, hover: "rgba(249,168,212,0.08)" },
  { bg: "rgba(167,243,208,0.07)", bar: "linear-gradient(90deg,#34d399,#6ee7b7)", tag: { bg:"rgba(52,211,153,0.1)", border:"rgba(52,211,153,0.3)", color:"#065f46" }, hover: "rgba(167,243,208,0.08)" },
  { bg: "rgba(125,211,252,0.07)", bar: "linear-gradient(90deg,#38bdf8,#7dd3fc)", tag: { bg:"rgba(56,189,248,0.1)", border:"rgba(56,189,248,0.3)", color:"#075985" }, hover: "rgba(125,211,252,0.08)" },
  { bg: "rgba(196,181,253,0.07)", bar: "linear-gradient(90deg,#a78bfa,#c084fc)", tag: { bg:"rgba(167,139,250,0.1)", border:"rgba(167,139,250,0.3)", color:"#4c1d95" }, hover: "rgba(196,181,253,0.08)" },
  { bg: "rgba(253,230,138,0.07)", bar: "linear-gradient(90deg,#fbbf24,#fcd34d)", tag: { bg:"rgba(251,191,36,0.1)", border:"rgba(251,191,36,0.3)", color:"#78350f" }, hover: "rgba(253,230,138,0.08)" },
  { bg: "rgba(253,186,116,0.07)", bar: "linear-gradient(90deg,#fb923c,#fdba74)", tag: { bg:"rgba(251,146,60,0.1)", border:"rgba(251,146,60,0.3)", color:"#7c2d12" }, hover: "rgba(253,186,116,0.08)" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.07, duration: 0.6, ease: [0.22,1,0.36,1] }
  })
};

export default function Subjects() {
  return (
    <>
      <style>{styles}</style>

      <section className="subjects-v2" id="subjects">
        <div className="subjects-blob sb-blob-1" />
        <div className="subjects-blob sb-blob-2" />

        <div className="subjects-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <SectionTag>What I Teach</SectionTag>
            <h2 className="section-h-light">All Core Subjects Covered</h2>
            <p style={{ fontSize:"0.97rem", color:"#6b7280", lineHeight:1.8, maxWidth:"520px" }}>
              Comprehensive tutoring across all subjects for Class 1 to 9, fully
              aligned with CBSE, ICSE &amp; State Board curriculum.
            </p>
          </motion.div>

          <div className="subjects-grid-v2">
            {SUBJECTS.map((subject, i) => {
              const pal = SUBJECT_PALETTES[i % SUBJECT_PALETTES.length];
              return (
                <motion.div
                  className="subject-card-v2"
                  key={subject.name}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  whileHover={{ y: -7, boxShadow: "0 20px 50px rgba(196,181,253,0.18)" }}
                  style={{ "--bar-bg": pal.bar }}>

                  {/* bg tint */}
                  <div className="subject-card-bg" style={{ background: pal.hover }} />

                  {/* bottom bar */}
                  <div style={{ content:'', position:"absolute", bottom:0, left:0, right:0, height:3, background:pal.bar, borderRadius:"0 0 20px 20px", transform:"scaleX(0)", transformOrigin:"left", transition:"transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scaleX(1)"}
                    className="bar-inner"
                  />

                  <motion.span
                    className="subject-icon-v2"
                    whileHover={{ scale: 1.25, y: -5, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}>
                    {subject.icon}
                  </motion.span>

                  <h3>{subject.name}</h3>
                  <p>{subject.desc}</p>

                  <motion.span
                    className="subject-tag"
                    style={{
                      background: pal.tag.bg,
                      borderColor: pal.tag.border,
                      color: pal.tag.color
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06 }}>
                    ✦ Class 1–9
                  </motion.span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}