import { useRef } from "react";
import { motion} from "framer-motion";
import { AnimatedCounter, SectionTag } from "./UI.jsx";
import { QUALIFICATIONS, METRICS, EDUCATION, PILLARS } from "../data/siteData.js";

const styles = `
  .about-v2 {
    background: linear-gradient(160deg, #fdf4ff 0%, #fce7f3 30%, #eff6ff 65%, #f0fdf4 100%);
    padding: 7rem 7%;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* decorative shapes */
  .about-blob {
    position:absolute;border-radius:50%;pointer-events:none;filter:blur(80px);opacity:0.6;
  }
  .about-blob-1{width:500px;height:500px;top:-10%;right:-8%;background:radial-gradient(circle,#f9a8d4,transparent 70%);}
  .about-blob-2{width:400px;height:400px;bottom:-10%;left:-5%;background:radial-gradient(circle,#c4b5fd,transparent 70%);}
  .about-blob-3{width:300px;height:300px;top:40%;left:40%;background:radial-gradient(circle,#6ee7b7,transparent 70%);opacity:0.3;}

  .about-layout-v2 {
    display:grid;
    grid-template-columns:1fr 1.65fr;
    gap:5rem;align-items:start;
    max-width:1140px;margin:0 auto;
    position:relative;z-index:1;
  }

  /* sticky card */
  .about-sticky-v2 { position:sticky;top:5.5rem; }

  .about-card-v2 {
    background:linear-gradient(145deg,#312e81,#1e1b4b);
    border-radius:24px;padding:2.6rem;
    overflow:hidden;position:relative;
    box-shadow:0 20px 60px rgba(49,46,129,0.35);
    border:1px solid rgba(196,181,253,0.2);
  }
  .about-card-v2::before {
    content:'';position:absolute;top:-80px;right:-80px;
    width:220px;height:220px;border-radius:50%;
    background:radial-gradient(circle,rgba(244,114,182,0.2),transparent 70%);
    pointer-events:none;
  }
  .about-card-v2::after {
    content:'✦';position:absolute;right:-10px;bottom:-28px;
    font-size:9rem;color:rgba(255,255,255,0.025);line-height:1;pointer-events:none;
  }

  .card-avatar {
    width:60px;height:60px;border-radius:50%;
    background:linear-gradient(135deg,#f472b6,#c084fc,#818cf8);
    display:flex;align-items:center;justify-content:center;
    font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:800;color:#fff;
    margin-bottom:1rem;
    box-shadow:0 0 0 4px rgba(196,181,253,0.2);
  }
  .card-name-v2 {
    font-family:'Playfair Display',serif;
    font-size:1.45rem;font-weight:700;color:#fff;margin-bottom:0.15rem;
  }
  .card-role-v2 {
    font-size:0.72rem;color:rgba(255,255,255,0.35);
    text-transform:uppercase;letter-spacing:0.09em;margin-bottom:2rem;
  }

  .qual-list-v2 {
    list-style:none;display:flex;flex-direction:column;gap:0.85rem;margin-bottom:1.8rem;
  }
  .qual-item-v2 {
    display:flex;align-items:flex-start;gap:0.75rem;
    font-size:0.875rem;color:rgba(255,255,255,0.68);
    padding:0.6rem 0.75rem;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.06);
    border-radius:10px;
    transition:background 0.2s;
  }
  .qual-item-v2:hover{background:rgba(255,255,255,0.08);}
  .qual-bullet-v2 {
    width:18px;height:18px;border-radius:50%;
    background:linear-gradient(135deg,#f472b6,#c084fc);
    display:flex;align-items:center;justify-content:center;
    font-size:0.5rem;color:#fff;flex-shrink:0;margin-top:1px;
  }

  .metrics-grid-v2 {
    display:grid;grid-template-columns:1fr 1fr;gap:0.7rem;
  }
  .metric-box-v2 {
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.08);
    border-radius:14px;padding:1.1rem;text-align:center;
    transition:all 0.25s;overflow:hidden;position:relative;
  }
  .metric-box-v2::before {
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,rgba(244,114,182,0.1),rgba(196,181,253,0.1));
    opacity:0;transition:opacity 0.3s;
  }
  .metric-box-v2:hover::before{opacity:1;}
  .metric-box-v2:hover{border-color:rgba(196,181,253,0.3);}
  .metric-num-v2 {
    font-family:'Playfair Display',serif;
    font-size:1.7rem;font-weight:800;
    background:linear-gradient(135deg,#fcd34d,#f9a8d4);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
    display:block;margin-bottom:0.15rem;position:relative;z-index:1;
  }
  .metric-txt-v2 {
    font-size:0.7rem;color:rgba(255,255,255,0.32);
    text-transform:uppercase;letter-spacing:0.07em;position:relative;z-index:1;
  }

  /* body */
  .about-body-v2 {}
  .about-body-v2 p {
    font-size:0.97rem;color:#6b7280;
    line-height:1.95;font-weight:400;margin-bottom:1.3rem;
  }

  /* edu cards */
  .edu-card-v2 {
    background:#fff;
    border:1px solid #f3e8ff;
    border-radius:14px;
    padding:1.4rem 1.6rem;
    margin-bottom:1rem;
    border-left:4px solid transparent;
    border-image:linear-gradient(180deg,#f472b6,#c084fc) 1;
    border-image-slice:1;
    transition:all 0.25s;position:relative;overflow:hidden;
  }
  .edu-card-v2::before {
    content:'';position:absolute;top:0;left:0;bottom:0;width:4px;
    background:linear-gradient(180deg,#f472b6,#c084fc);border-radius:0;
  }
  .edu-card-v2:hover{
    box-shadow:0 8px 30px rgba(196,181,253,0.2);
    transform:translateX(4px);
  }
  .edu-degree-v2 {
    font-family:'Playfair Display',serif;
    font-size:1rem;font-weight:700;color:#1e1b4b;margin-bottom:0.2rem;
  }
  .edu-detail-v2{font-size:0.8rem;color:#9ca3af;}

  /* pillars */
  .pillars-grid-v2 {
    display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:2rem;
  }
  .pillar-v2 {
    background:#fff;
    border:1px solid #f3e8ff;
    border-radius:16px;padding:1.4rem;
    transition:all 0.3s;position:relative;overflow:hidden;
    cursor:default;
  }
  .pillar-v2::before {
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,rgba(249,168,212,0.07),rgba(196,181,253,0.07));
    opacity:0;transition:opacity 0.3s;
  }
  .pillar-v2:hover::before{opacity:1;}
  .pillar-v2:hover{
    border-color:rgba(196,181,253,0.5);
    box-shadow:0 8px 30px rgba(196,181,253,0.15);
    transform:translateY(-4px);
  }
  .pillar-icon {
    width:40px;height:40px;border-radius:12px;
    background:linear-gradient(135deg,rgba(249,168,212,0.2),rgba(196,181,253,0.2));
    display:flex;align-items:center;justify-content:center;
    font-size:1.2rem;margin-bottom:0.85rem;
  }
  .pillar-v2 h4{
    font-size:0.9rem;font-weight:600;color:#1e1b4b;margin-bottom:0.3rem;
  }
  .pillar-v2 p{font-size:0.8rem;color:#9ca3af;line-height:1.65;margin:0;}

  /* section heading */
  .section-h-light {
    font-family:'Playfair Display',serif;
    font-size:clamp(2rem,3.5vw,2.8rem);
    font-weight:800;color:#1e1b4b;
    line-height:1.2;letter-spacing:-0.02em;
    margin:0.6rem 0 1.5rem;
  }

  @media(max-width:960px){
    .about-layout-v2{grid-template-columns:1fr;gap:2.5rem;}
    .about-sticky-v2{position:static;}
    .pillars-grid-v2{grid-template-columns:1fr;}
  }
`;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  const metricsRef = useRef(null);

  return (
    <>
      <style>{styles}</style>

      <section className="about-v2" id="about">
        <div className="about-blob about-blob-1" />
        <div className="about-blob about-blob-2" />
        <div className="about-blob about-blob-3" />

        <div className="about-layout-v2">

          {/* LEFT — Sticky Card */}
          <div className="about-sticky-v2">
            <motion.div {...slideLeft(0)}>
              <div className="about-card-v2">
                <motion.div className="card-avatar"
                  animate={{ boxShadow: ["0 0 0 4px rgba(196,181,253,0.2)","0 0 0 10px rgba(196,181,253,0.05)","0 0 0 4px rgba(196,181,253,0.2)"] }}
                  transition={{ duration: 3, repeat: Infinity }}>
                  V
                </motion.div>
                <div className="card-name-v2">Ms. Vanshika</div>
                <div className="card-role-v2">Home Tutor · 5+ Years Experience</div>

                <ul className="qual-list-v2">
                  {QUALIFICATIONS.map((q, i) => (
                    <motion.li className="qual-item-v2" key={q}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}>
                      <div className="qual-bullet-v2">✦</div>
                      {q}
                    </motion.li>
                  ))}
                </ul>

                <div className="metrics-grid-v2" ref={metricsRef}>
                  {METRICS.map(({ num, suffix, label }, i) => (
                    <motion.div className="metric-box-v2" key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}>
                      <span className="metric-num-v2">
                        <AnimatedCounter target={num} suffix={suffix} />
                      </span>
                      <span className="metric-txt-v2">{label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Body */}
          <div className="about-body-v2">
            <motion.div {...fadeUp(0)}>
              <SectionTag>About Me</SectionTag>
              <h2 className="section-h-light">Building Confidence,<br />One Student at a Time</h2>
            </motion.div>

            {[
              "I believe every child learns differently. My approach begins with understanding each student's unique strengths and challenges — then building a structured, flexible study plan designed specifically for them.",
              "With over five years of hands-on teaching experience, I have guided students from Class 1 through Class 9 to better grades, stronger study habits, and most importantly — real confidence in their subjects.",
              "Whether your child needs foundational support or focused exam preparation, I am committed to being with them at every step of their learning journey — and keeping parents fully informed along the way."
            ].map((text, i) => (
              <motion.p key={i} {...fadeUp(0.1 + i * 0.07)}>{text}</motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              {EDUCATION.map(({ degree, detail }, i) => (
                <motion.div className="edu-card-v2" key={degree}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ x: 4 }}>
                  <div className="edu-degree-v2">{degree}</div>
                  <div className="edu-detail-v2">{detail}</div>
                </motion.div>
              ))}
            </motion.div>

            <div className="pillars-grid-v2">
              {PILLARS.map(({ icon, title, desc }, i) => (
                <motion.div className="pillar-v2" key={title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  whileHover={{ y: -4 }}>
                  <div className="pillar-icon">{icon}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}