import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { FOOTER_LINKS } from "../data/siteData.js";

const styles = `
  .footer-v3 {
    background: #0a0818;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgba(196,181,253,0.1);
  }

  .footer-top-bar {
    height: 3px;
    background: linear-gradient(90deg, #f472b6, #c084fc, #818cf8, #6ee7b7, #fcd34d, #f472b6);
    background-size: 200% 100%;
    animation: barShimmer 4s linear infinite;
  }
  @keyframes barShimmer { from{background-position:0% 0%} to{background-position:200% 0%} }

  .ft-blob {
    position: absolute; border-radius: 50%;
    pointer-events: none; filter: blur(90px); opacity: 0.18;
  }
  .ft-blob-1{width:500px;height:500px;top:-20%;right:-10%;background:radial-gradient(circle,#c084fc,transparent 70%);}
  .ft-blob-2{width:400px;height:400px;bottom:-20%;left:-8%;background:radial-gradient(circle,#f472b6,transparent 70%);}

  /* NEWSLETTER */
  .footer-nl {
    padding: 3.5rem 7%;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: relative; z-index: 1;
  }
  .footer-nl-inner {
    max-width: 1140px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    gap: 2rem; flex-wrap: wrap;
  }
  .nl-text h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem;
  }
  .nl-text p { font-size: 0.85rem; color: rgba(255,255,255,0.32); }
  .nl-form { display: flex; gap: 0.6rem; flex-wrap: wrap; }
  .nl-input {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50px; padding: 0.75rem 1.3rem;
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem; outline: none;
    transition: all 0.25s; width: 240px;
  }
  .nl-input::placeholder { color: rgba(255,255,255,0.2); }
  .nl-input:focus { border-color: rgba(196,181,253,0.4); background: rgba(255,255,255,0.07); box-shadow: 0 0 0 4px rgba(196,181,253,0.08); }
  .nl-btn {
    background: linear-gradient(135deg, #f472b6, #c084fc);
    color: #fff; border: none; border-radius: 50px;
    padding: 0.75rem 1.5rem;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 600;
    cursor: pointer; transition: all 0.3s;
    box-shadow: 0 4px 16px rgba(192,132,252,0.3);
    position: relative; overflow: hidden;
  }
  .nl-btn::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #fb923c, #f472b6, #c084fc);
    opacity: 0; transition: opacity 0.35s;
  }
  .nl-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(192,132,252,0.5); }
  .nl-btn:hover::before { opacity: 1; }
  .nl-btn span { position: relative; z-index: 1; }
  .nl-success {
    display: flex; align-items: center; gap: 0.6rem;
    background: rgba(110,231,183,0.08); border: 1px solid rgba(110,231,183,0.2);
    border-radius: 50px; padding: 0.75rem 1.3rem;
    color: #6ee7b7; font-size: 0.875rem;
  }

  /* MAIN BODY */
  .footer-body {
    padding: 4rem 7% 3rem;
    position: relative; z-index: 1;
  }
  .footer-grid {
    max-width: 1140px; margin: 0 auto;
    display: grid;
    grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
    gap: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  /* brand */
  .ft-brand-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-weight: 800;
    text-decoration: none; display: inline-block;
    margin-bottom: 1rem; line-height: 1;
  }
  .ft-brand-logo .plain { color: rgba(255,255,255,0.45); }
  .ft-brand-logo em {
    font-style: normal;
    background: linear-gradient(135deg, #f9a8d4, #c4b5fd);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ft-brand-desc {
    font-size: 0.83rem; color: rgba(255,255,255,0.25);
    line-height: 1.85; margin-bottom: 1.4rem; max-width: 240px;
  }
  .ft-avail {
    display: inline-flex; align-items: center; gap: 0.55rem;
    background: rgba(74,222,128,0.07);
    border: 1px solid rgba(74,222,128,0.18);
    border-radius: 50px; padding: 0.42rem 0.9rem;
    font-size: 0.73rem; color: rgba(74,222,128,0.75);
    margin-bottom: 1.3rem;
  }
  .avail-dot-ft {
    width: 6px; height: 6px; border-radius: 50%;
    background: #4ade80;
    animation: ftPulse 2s ease-in-out infinite;
  }
  @keyframes ftPulse {
    0%,100%{box-shadow:0 0 0 2px rgba(74,222,128,0.2)}
    50%{box-shadow:0 0 0 5px rgba(74,222,128,0.05)}
  }
  .ft-rating-strip {
    display: flex; align-items: center; gap: 0.35rem; margin-bottom: 1.3rem;
  }
  .ft-star { font-size: 0.75rem; color: #fcd34d; }
  .ft-rating-txt { font-size: 0.72rem; color: rgba(255,255,255,0.18); margin-left: 0.2rem; }
  .ft-socials { display: flex; gap: 0.55rem; }
  .ft-social {
    width: 36px; height: 36px; border-radius: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; text-decoration: none; cursor: pointer;
    transition: all 0.25s;
  }
  .ft-social:hover { background: rgba(196,181,253,0.12); border-color: rgba(196,181,253,0.28); transform: translateY(-3px); }

  /* nav cols */
  .ft-col-title {
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: rgba(255,255,255,0.22); margin-bottom: 1.25rem;
  }
  .ft-col-links { display: flex; flex-direction: column; gap: 0.7rem; }
  .ft-col-links a {
    font-size: 0.83rem; color: rgba(255,255,255,0.3);
    text-decoration: none; transition: all 0.22s;
    display: flex; align-items: center;
    position: relative; padding-left: 0;
  }
  .ft-col-links a:hover { color: rgba(255,255,255,0.72); padding-left: 1rem; }
  .ft-col-links a::before {
    content: '→'; font-size: 0.68rem;
    position: absolute; left: 0;
    opacity: 0; transform: translateX(-4px);
    transition: all 0.22s; color: #c4b5fd;
  }
  .ft-col-links a:hover::before { opacity: 1; transform: translateX(0); }

  /* contact col */
  .ft-contact-item {
    display: flex; align-items: flex-start; gap: 0.75rem;
    margin-bottom: 0.85rem;
    font-size: 0.82rem; color: rgba(255,255,255,0.3);
  }
  .ft-contact-icon {
    width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
    background: rgba(196,181,253,0.08);
    border: 1px solid rgba(196,181,253,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.82rem;
  }
  .ft-book-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    margin-top: 0.5rem;
    background: linear-gradient(135deg, rgba(244,114,182,0.1), rgba(192,132,252,0.1));
    border: 1px solid rgba(196,181,253,0.22);
    color: #c4b5fd; font-size: 0.8rem; font-weight: 600;
    padding: 0.6rem 1.2rem; border-radius: 50px;
    text-decoration: none; transition: all 0.25s;
  }
  .ft-book-btn:hover { background: rgba(196,181,253,0.18); color: #e9d5ff; transform: translateY(-2px); }

  /* BOTTOM */
  .footer-bottom {
    max-width: 1140px; margin: 0 auto;
    display: flex; align-items: center;
    justify-content: space-between; flex-wrap: wrap;
    gap: 1rem; padding-top: 2rem;
  }
  .ft-copy { font-size: 0.74rem; color: rgba(255,255,255,0.13); }
  .ft-copy em { font-style: normal; color: rgba(196,181,253,0.35); }
  .ft-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .ft-badge {
    font-size: 0.68rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.2);
    padding: 0.28rem 0.72rem; border-radius: 50px;
    transition: all 0.2s;
  }
  .ft-badge:hover { border-color: rgba(196,181,253,0.25); color: rgba(255,255,255,0.4); }
  .ft-back-top {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(196,181,253,0.13);
    color: rgba(255,255,255,0.28);
    font-size: 0.74rem; font-family: 'DM Sans', sans-serif;
    padding: 0.48rem 1.1rem; border-radius: 50px;
    cursor: pointer; text-decoration: none;
    display: flex; align-items: center; gap: 0.4rem;
    transition: all 0.25s;
  }
  .ft-back-top:hover { background: rgba(196,181,253,0.08); border-color: rgba(196,181,253,0.3); color: rgba(255,255,255,0.65); }

  @media (max-width: 960px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .footer-nl-inner { flex-direction: column; align-items: flex-start; }
    .footer-bottom { flex-direction: column; text-align: center; }
    .ft-badges { justify-content: center; }
  }
  @media (max-width: 500px) {
    .footer-grid { grid-template-columns: 1fr; }
    .nl-input { width: 100%; }
  }
`;

const NAV_COLS = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "#home" },
      { label: "About Me", href: "#about" },
      { label: "Subjects", href: "#subjects" },
      { label: "Classes", href: "#classes" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Process", href: "#process" },
      { label: "Reviews", href: "#reviews" },
      { label: "Contact", href: "#contact" },
      { label: "Book Demo", href: "#contact" },
    ],
  },
];

const CONTACT_ITEMS = [
  { icon: "📍", text: "Delhi NCR — Home Visits" },
  { icon: "⏰", text: "Mon–Sat · 7 AM – 8 PM" },
  { icon: "📋", text: "CBSE & ICSE Specialist" },
  { icon: "🎓", text: "Class 1–9 · All Subjects" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [nlSent, setNlSent] = useState(false);

  const handleNl = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNlSent(true);
    setEmail("");
    setTimeout(() => setNlSent(false), 6000);
  };

  return (
    <>
      <style>{styles}</style>

      <footer className="footer-v3">
        <div className="footer-top-bar" />
        <div className="ft-blob ft-blob-1" />
        <div className="ft-blob ft-blob-2" />

        {/* NEWSLETTER */}
        <div className="footer-nl">
          <div className="footer-nl-inner">
            <motion.div
              className="nl-text"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Stay updated 📬</h3>
              <p>
                Study tips, exam prep guides & availability alerts — straight to
                your inbox.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                {nlSent ? (
                  <motion.div
                    key="ok"
                    className="nl-success"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220 }}
                  >
                    ✅ Subscribed! Thanks for joining.
                  </motion.div>
                ) : (
                  <motion.form
                    key="nl"
                    className="nl-form"
                    onSubmit={handleNl}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <input
                      className="nl-input"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <motion.button
                      className="nl-btn"
                      type="submit"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <span>Subscribe →</span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* BODY */}
        <div className="footer-body">
          <div className="footer-grid">
            {/* Brand col */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a href="#home" className="ft-brand-logo">
                <span className="plain">Ms. </span>
                <em>Vanshika</em>
              </a>
              <p className="ft-brand-desc">
                Dedicated home tutor for Class 1–9 across all subjects in Delhi
                NCR. Building confidence and strong academic foundations since
                2019.
              </p>
              <div className="ft-avail">
                <div className="avail-dot-ft" />
                Currently accepting new students
              </div>
              <div className="ft-rating-strip">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="ft-star">
                    ★
                  </span>
                ))}
                <span className="ft-rating-txt">5.0 · 100+ reviews</span>
              </div>
              <div className="ft-socials">
                {["💬", "📱", "📧", "📘"].map((icon, i) => (
                  <motion.div
                    key={i}
                    className="ft-social"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Nav cols */}
            {NAV_COLS.map((col, ci) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + ci * 0.08 }}
              >
                <div className="ft-col-title">{col.title}</div>
                <div className="ft-col-links">
                  {col.links.map(({ label, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Contact col */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28 }}
            >
              <div className="ft-col-title">Contact Info</div>
              {CONTACT_ITEMS.map((c, i) => (
                <motion.div
                  key={i}
                  className="ft-contact-item"
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="ft-contact-icon">{c.icon}</div>
                  <span>{c.text}</span>
                </motion.div>
              ))}
              <motion.a
                href="#contact"
                className="ft-book-btn"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                📅 Book Free Demo
              </motion.a>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <motion.p
              className="ft-copy"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              © 2025 <em>Ms. Vanshika</em> · All rights reserved · Delhi NCR
            </motion.p>

            <motion.div
              className="ft-badges"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {[
                "CBSE Specialist",
                "ICSE Specialist",
                "Home Visits",
                "Class 1–9",
              ].map((b) => (
                <motion.span
                  key={b}
                  className="ft-badge"
                  whileHover={{ scale: 1.05 }}
                >
                  {b}
                </motion.span>
              ))}
            </motion.div>

            <motion.a
              className="ft-back-top"
              href="#home"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              ↑ Back to top
            </motion.a>
          </div>
        </div>
      </footer>
    </>
  );
}
