import { motion } from "framer-motion";
import { SectionTag } from "./UI.jsx";
import { TESTIMONIALS } from "../data/siteData.js";

const styles = `
  .reviews-v2 {
    background: linear-gradient(160deg, #fdf4ff 0%, #fce7f3 35%, #eff6ff 70%, #f0fdf4 100%);
    padding: 7rem 7%;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .reviews-blob {
    position:absolute; border-radius:50%; pointer-events:none;
    filter:blur(80px); opacity:0.5;
  }
  .rv-blob-1{width:500px;height:500px;top:-10%;right:-8%;background:radial-gradient(circle,#c4b5fd,transparent 70%);}
  .rv-blob-2{width:400px;height:400px;bottom:-10%;left:-5%;background:radial-gradient(circle,#f9a8d4,transparent 70%);}

  .reviews-head {
    max-width: 1140px; margin: 0 auto;
    position: relative; z-index: 1;
  }

  .section-h-light {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem,3.5vw,2.8rem); font-weight: 800;
    color: #1e1b4b; line-height: 1.2;
    letter-spacing: -0.02em; margin: 0.6rem 0 1rem;
  }
  .section-sub-light { font-size: 0.97rem; color: #6b7280; line-height: 1.8; }

  /* rating banner */
  .rating-banner-v2 {
    display: inline-flex; align-items: center; gap: 1.5rem;
    background: #fff;
    border: 1px solid #f3e8ff;
    border-radius: 20px;
    padding: 1.4rem 2rem;
    margin: 2rem 0 3rem;
    box-shadow: 0 4px 24px rgba(196,181,253,0.15);
    position: relative; overflow: hidden;
  }
  .rating-banner-v2::before {
    content: '';
    position: absolute; top: 0; left: 0; bottom: 0; width: 4px;
    background: linear-gradient(180deg, #f472b6, #c084fc);
  }
  .rating-big-v2 {
    font-family: 'Playfair Display', serif;
    font-size: 3.2rem; font-weight: 800;
    background: linear-gradient(135deg, #f472b6, #c084fc);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }
  .rating-stars-v2 {
    font-size: 1.1rem; letter-spacing: 3px; margin-bottom: 0.2rem;
    background: linear-gradient(90deg, #f472b6, #fcd34d);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .rating-count-v2 { font-size: 0.8rem; color: #9ca3af; }

  /* grid */
  .reviews-grid-v2 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 1140px; margin: 0 auto;
    position: relative; z-index: 1;
  }

  /* card */
  .review-card-v2 {
    background: #fff;
    border: 1px solid #f3e8ff;
    border-radius: 22px;
    padding: 2rem;
    position: relative; overflow: hidden;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    cursor: default;
  }
  .review-card-v2::before {
    content: '';
    position: absolute; inset: 0; border-radius: 22px;
    background: linear-gradient(135deg, rgba(249,168,212,0.06), rgba(196,181,253,0.06));
    opacity: 0; transition: opacity 0.35s;
  }
  .review-card-v2:hover::before { opacity: 1; }
  .review-card-v2:hover {
    border-color: rgba(196,181,253,0.45);
    box-shadow: 0 16px 48px rgba(196,181,253,0.2);
    transform: translateY(-6px);
  }

  /* giant quote mark */
  .review-quote-mark {
    position: absolute; right: 1.5rem; top: 1rem;
    font-family: 'Playfair Display', serif;
    font-size: 5rem; line-height: 1;
    background: linear-gradient(135deg, rgba(244,114,182,0.12), rgba(196,181,253,0.12));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    pointer-events: none;
    transition: all 0.35s;
  }
  .review-card-v2:hover .review-quote-mark {
    background: linear-gradient(135deg, rgba(244,114,182,0.25), rgba(196,181,253,0.25));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* stars */
  .review-stars-v2 {
    display: flex; gap: 3px; margin-bottom: 0.75rem;
  }
  .star-icon {
    font-size: 0.9rem;
    background: linear-gradient(135deg, #f472b6, #fcd34d);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* grade pill */
  .review-grade-v2 {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: rgba(196,181,253,0.12);
    border: 1px solid rgba(196,181,253,0.3);
    color: #7c3aed;
    font-size: 0.72rem; font-weight: 600;
    padding: 0.28rem 0.8rem; border-radius: 100px;
    margin-bottom: 1rem; letter-spacing: 0.04em;
  }

  .review-text-v2 {
    font-size: 0.9rem; color: #4b5563;
    line-height: 1.9; font-style: italic;
    font-weight: 300; margin-bottom: 1.6rem;
    position: relative; z-index: 1;
  }

  .review-author-v2 {
    display: flex; align-items: center; gap: 0.85rem;
    padding-top: 1.25rem;
    border-top: 1px solid #f3e8ff;
    position: relative; z-index: 1;
  }
  .review-avatar-v2 {
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, #f472b6, #c084fc);
    color: #fff;
    font-family: 'Playfair Display', serif;
    font-size: 1rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(192,132,252,0.35);
  }
  .review-author-name-v2 { font-size: 0.875rem; font-weight: 600; color: #1e1b4b; }
  .review-author-role-v2 { font-size: 0.76rem; color: #9ca3af; margin-top: 0.1rem; }

  /* card accent bottom line */
  .review-card-accent {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f472b6, #c084fc, #818cf8);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    border-radius: 0 0 22px 22px;
  }
  .review-card-v2:hover .review-card-accent { transform: scaleX(1); }

  @media (max-width: 960px) {
    .reviews-grid-v2 { grid-template-columns: 1fr; }
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.93 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22,1,0.36,1] }
  })
};

export default function Reviews() {
  return (
    <>
      <style>{styles}</style>

      <section className="reviews-v2" id="reviews">
        <div className="reviews-blob rv-blob-1" />
        <div className="reviews-blob rv-blob-2" />

        <div className="reviews-head">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <SectionTag>Testimonials</SectionTag>
            <h2 className="section-h-light">What Parents Say</h2>
            <p className="section-sub-light">
              Real feedback from families who have seen lasting results with their children.
            </p>
          </motion.div>

          <motion.div
            className="rating-banner-v2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22,1,0.36,1] }}
            whileHover={{ scale: 1.02 }}>
            <div className="rating-big-v2">5.0</div>
            <div>
              <div className="rating-stars-v2">★★★★★</div>
              <div className="rating-count-v2">Based on 100+ student reviews</div>
            </div>
          </motion.div>
        </div>

        <div className="reviews-grid-v2">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              className="review-card-v2"
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6 }}>

              <div className="review-quote-mark">❝</div>
              <div className="review-card-accent" />

              <div className="review-stars-v2">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <motion.span
                    className="star-icon" key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 + j * 0.06, type: "spring", stiffness: 300 }}>
                    ★
                  </motion.span>
                ))}
              </div>

              <div className="review-grade-v2">
                📈 Grade Improvement: {t.grade}
              </div>

              <p className="review-text-v2">"{t.text}"</p>

              <div className="review-author-v2">
                <motion.div
                  className="review-avatar-v2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  {t.initials}
                </motion.div>
                <div>
                  <div className="review-author-name-v2">{t.name}</div>
                  <div className="review-author-role-v2">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}