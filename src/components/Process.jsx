import { useRef } from "react";
import { motion, useInView } from "framer-motion";
// import { SectionTag } from "./UI.jsx";
import { PROCESS_STEPS } from "../data/siteData.js";

const styles = `
  .process-v2 {
    background: linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%);
    padding: 7rem 7%;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .process-blob {
    position:absolute; border-radius:50%; pointer-events:none;
    filter:blur(90px); opacity:0.35;
  }
  .pb-1{width:500px;height:500px;top:-15%;left:-8%;background:radial-gradient(circle,#c084fc,transparent 70%);}
  .pb-2{width:400px;height:400px;bottom:-15%;right:-5%;background:radial-gradient(circle,#f472b6,transparent 70%);}

  .process-inner {
    max-width: 1080px; margin: 0 auto;
    position: relative; z-index: 1;
  }

  .process-header-v2 {
    text-align: center; max-width: 580px;
    margin: 0 auto 4.5rem;
  }

  .section-tag-light-v2 {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(196,181,253,0.1);
    border: 1px solid rgba(196,181,253,0.3);
    color: #c4b5fd;
    font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.38rem 1rem; border-radius: 100px;
    margin-bottom: 1rem;
    justify-content: center;
  }
  .section-tag-dot {
    width:6px;height:6px;border-radius:50%;
    background:linear-gradient(135deg,#f9a8d4,#c4b5fd);
  }

  .section-h-dark {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem,3.5vw,2.8rem); font-weight: 800;
    color: #fff; line-height: 1.2;
    letter-spacing: -0.02em; margin: 0.6rem 0 0.8rem;
  }
  .section-sub-dark { font-size: 0.97rem; color: rgba(255,255,255,0.42); line-height: 1.8; }

  /* steps */
  .steps-v2 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    position: relative;
  }

  /* animated SVG connector */
  .steps-connector-v2 {
    position: absolute;
    top: 3.2rem;
    left: calc(16.66% + 26px);
    right: calc(16.66% + 26px);
    height: 2px;
    overflow: visible;
    pointer-events: none;
  }

  /* step card */
  .step-card-v2 {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 2.5rem 2rem 2rem;
    text-align: center;
    position: relative; z-index: 1;
    overflow: hidden;
    transition: border-color 0.35s;
  }
  .step-card-v2::before {
    content: '';
    position: absolute; inset: 0; border-radius: 24px;
    background: linear-gradient(135deg, rgba(244,114,182,0.1), rgba(196,181,253,0.08));
    opacity: 0; transition: opacity 0.35s;
  }

  .step-num-ring {
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, #f472b6, #c084fc);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.5rem;
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem; font-weight: 800; color: #fff;
    box-shadow: 0 8px 28px rgba(192,132,252,0.5);
    position: relative; z-index: 1;
    transition: all 0.35s;
  }

  .step-icon-v2 {
    font-size: 1.8rem; display: block;
    margin-bottom: 1rem;
    position: relative; z-index: 1;
    transition: transform 0.35s;
    filter: drop-shadow(0 4px 8px rgba(249,168,212,0.3));
  }
  .step-card-v2 h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem; font-weight: 700;
    color: #fff; margin-bottom: 0.75rem;
    position: relative; z-index: 1;
  }
  .step-card-v2 p {
    font-size: 0.875rem; color: rgba(255,255,255,0.48);
    line-height: 1.85; font-weight: 300;
    position: relative; z-index: 1;
  }

  /* number badge */
  .step-badge {
    position: absolute; top: 1.2rem; right: 1.2rem;
    width: 22px; height: 22px; border-radius: 50%;
    background: rgba(196,181,253,0.12);
    border: 1px solid rgba(196,181,253,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; color: rgba(196,181,253,0.5);
    font-weight: 600; letter-spacing: 0.04em;
  }

  @media (max-width: 960px) {
    .steps-v2 { grid-template-columns: 1fr; }
    .steps-connector-v2 { display: none; }
  }
`;


const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22,1,0.36,1] }
  })
};

function ConnectorLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="steps-connector-v2" ref={ref}>
      <svg width="100%" height="2" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3"/>
          </linearGradient>
          <linearGradient id="dotGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6"/>
            <stop offset="100%" stopColor="#c084fc"/>
          </linearGradient>
        </defs>
        {/* base line */}
        <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(196,181,253,0.15)" strokeWidth="1.5" strokeDasharray="6 4"/>
        {/* animated fill line */}
        <motion.line
          x1="0" y1="1" x2="100%" y2="1"
          stroke="url(#lineGrad)" strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
        />
        {/* travel dot */}
        {inView && (
          <motion.circle
            r="4" cy="1"
            fill="url(#dotGrad)"
            filter="drop-shadow(0 0 4px #c084fc)"
            initial={{ cx: "0%" }}
            animate={{ cx: "100%" }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}

export default function Process() {
  return (
    <>
      <style>{styles}</style>

      <section className="process-v2" id="process">
        <div className="process-blob pb-1" />
        <div className="process-blob pb-2" />

        <div className="process-inner">
          <motion.div
            className="process-header-v2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <div className="section-tag-light-v2">
              <span className="section-tag-dot" />
              How It Works
            </div>
            <h2 className="section-h-dark">Simple 3-Step Process</h2>
            <p className="section-sub-dark">
              Getting started is easy. Reach out and I will take care of the rest.
            </p>
          </motion.div>

          <div className="steps-v2">
            <ConnectorLine />

            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                className="step-card-v2"
                key={step.n}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{
                  scale: 1.04,
                  borderColor: "rgba(196,181,253,0.4)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  y: -6,
                }}>

                <div className="step-badge">0{step.n}</div>

                <motion.div
                  className="step-num-ring"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  {step.n}
                </motion.div>

                <motion.span
                  className="step-icon-v2"
                  whileHover={{ scale: 1.2, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  {step.icon}
                </motion.span>

                <h3>{step.title}</h3>
                <p>{step.desc}</p>

                {/* hover gradient overlay */}
                <motion.div
                  style={{
                    position:"absolute",inset:0,borderRadius:"24px",
                    background:"linear-gradient(135deg,rgba(244,114,182,0.1),rgba(196,181,253,0.08))",
                    pointerEvents:"none",opacity:0,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}