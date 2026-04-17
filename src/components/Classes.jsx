import { motion } from "framer-motion";
import { SectionTag } from "./UI.jsx";
import { BOARDS } from "../data/siteData.js";

const styles = `
  .classes-v2 {
    background: linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%);
    padding: 7rem 7%;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .classes-blob {
    position:absolute;border-radius:50%;pointer-events:none;filter:blur(90px);opacity:0.4;
  }
  .classes-blob-1{width:500px;height:500px;top:-15%;right:-10%;background:radial-gradient(circle,#c084fc,transparent 70%);}
  .classes-blob-2{width:400px;height:400px;bottom:-15%;left:-5%;background:radial-gradient(circle,#f472b6,transparent 70%);}

  .classes-v2 .section-tag-light {
    display:inline-flex;align-items:center;gap:0.5rem;
    background:rgba(196,181,253,0.1);
    border:1px solid rgba(196,181,253,0.3);
    color:var(--lavender,#c4b5fd);
    font-size:0.72rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;
    padding:0.35rem 0.9rem;border-radius:100px;margin-bottom:1rem;
  }

  .section-h-dark {
    font-family:'Playfair Display',serif;
    font-size:clamp(2rem,3.5vw,2.8rem);
    font-weight:800;color:#fff;
    line-height:1.2;letter-spacing:-0.02em;margin:0.6rem 0 0.8rem;
  }
  .section-sub-dark {
    font-size:0.97rem;color:rgba(255,255,255,0.42);
    max-width:500px;line-height:1.8;margin-bottom:3rem;
  }

  /* grid */
  .classes-grid-v2 {
    display:grid;
    grid-template-columns:repeat(9,1fr);
    gap:1rem;
    margin-bottom:2.5rem;
  }

  .class-card-v2 {
    border-radius:18px;
    padding:1.8rem 0.5rem;
    text-align:center;
    cursor:default;
    position:relative;overflow:hidden;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.08);
    transition:border-color 0.3s;
  }
  .class-card-v2::before {
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,rgba(244,114,182,0.2),rgba(196,181,253,0.15));
    opacity:0;transition:opacity 0.3s;
  }

  .class-num {
    font-family:'Playfair Display',serif;
    font-size:1.8rem;font-weight:800;
    background:linear-gradient(135deg,#fcd34d,#f9a8d4,#c4b5fd);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
    display:block;position:relative;z-index:1;
    transition:transform 0.3s;
  }
  .class-label-v2 {
    font-size:0.62rem;color:rgba(255,255,255,0.28);
    text-transform:uppercase;letter-spacing:0.1em;
    position:relative;z-index:1;margin-top:0.2rem;display:block;
  }

  /* boards */
  .boards-row-v2 {
    display:flex;flex-wrap:wrap;gap:0.75rem;
    margin-top:1rem;
  }
  .board-pill-v2 {
    border-radius:50px;
    padding:0.6rem 1.4rem;
    font-size:0.83rem;font-weight:500;
    transition:all 0.25s;cursor:default;
    position:relative;overflow:hidden;
  }

  .board-pill-v2:nth-child(3n+1){
    background:rgba(244,114,182,0.12);
    border:1px solid rgba(244,114,182,0.3);
    color:#f9a8d4;
  }
  .board-pill-v2:nth-child(3n+2){
    background:rgba(196,181,253,0.12);
    border:1px solid rgba(196,181,253,0.3);
    color:#c4b5fd;
  }
  .board-pill-v2:nth-child(3n+3){
    background:rgba(110,231,183,0.1);
    border:1px solid rgba(110,231,183,0.25);
    color:#6ee7b7;
  }
  .board-pill-v2:hover{
    transform:translateY(-3px);
    box-shadow:0 8px 20px rgba(0,0,0,0.2);
  }

  /* sparkle decorations */
  .sparkle {
    position:absolute;pointer-events:none;
    font-size:1.2rem;opacity:0.12;
    animation:sparkleFloat 8s ease-in-out infinite;
  }
  @keyframes sparkleFloat {
    0%,100%{transform:translateY(0) rotate(0deg);opacity:0.12}
    50%{transform:translateY(-20px) rotate(180deg);opacity:0.2}
  }

  @media(max-width:960px){
    .classes-grid-v2{grid-template-columns:repeat(3,1fr);}
  }
`;

const classColors = [
  "rgba(249,168,212,0.25),rgba(216,180,254,0.15)",
  "rgba(167,243,208,0.2),rgba(110,231,183,0.1)",
  "rgba(125,211,252,0.2),rgba(196,181,253,0.15)",
  "rgba(253,230,138,0.2),rgba(249,168,212,0.15)",
  "rgba(196,181,253,0.25),rgba(244,114,182,0.1)",
  "rgba(110,231,183,0.2),rgba(125,211,252,0.15)",
  "rgba(249,168,212,0.2),rgba(253,186,116,0.15)",
  "rgba(196,181,253,0.2),rgba(167,243,208,0.15)",
  "rgba(253,186,116,0.2),rgba(249,168,212,0.2)",
];

export default function Classes() {
  return (
    <>
      <style>{styles}</style>

      <section className="classes-v2" id="classes">
        {/* blobs */}
        <div className="classes-blob classes-blob-1" />
        <div className="classes-blob classes-blob-2" />

        {/* sparkles */}
        {["✦","✧","⋆","✦","✧"].map((s, i) => (
          <span key={i} className="sparkle" style={{
            top: `${15 + i * 17}%`, left: `${5 + i * 18}%`,
            animationDelay: `${i * 1.5}s`
          }}>{s}</span>
        ))}

        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="section-tag-light">Classes</span>
            <h2 className="section-h-dark">Class 1 to 9 — Fully Covered</h2>
            <p className="section-sub-dark">
              Curriculum-aligned tutoring for every level from foundational primary
              to senior secondary preparation.
            </p>
          </motion.div>

          <div className="classes-grid-v2">
            {[1,2,3,4,5,6,7,8,9].map((n, i) => (
              <motion.div
                className="class-card-v2"
                key={n}
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55, type: "spring", stiffness: 180 }}
                whileHover={{
                  scale: 1.08,
                  borderColor: "rgba(196,181,253,0.5)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
                  y: -6,
                }}
                style={{ background: `linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))` }}>
                <motion.span
                  className="class-num"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400 }}>
                  {n}
                </motion.span>
                <span className="class-label-v2">Class</span>

                {/* hover shimmer */}
                <motion.div
                  style={{
                    position:"absolute",inset:0,borderRadius:"18px",
                    background:`linear-gradient(135deg,${classColors[i]})`,
                    opacity:0,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="boards-row-v2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            {BOARDS.map((b, i) => (
              <motion.div
                className="board-pill-v2"
                key={b}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{ y: -3, scale: 1.03 }}>
                {b}
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
}