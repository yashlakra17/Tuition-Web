import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../data/siteData.js";
import { useScrolled } from "../hooks/useScrolled.js";
import { useActiveSection } from "../hooks/useActiveSection.js";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .nav-v2 {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 900;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 6%;
    transition: all 0.45s cubic-bezier(0.22,1,0.36,1);
    font-family: 'DM Sans', sans-serif;
  }

  .nav-v2.solid {
    padding: 0.85rem 6%;
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    box-shadow: 0 1px 0 rgba(196,181,253,0.2), 0 8px 32px rgba(30,27,75,0.06);
    border-bottom: 1px solid rgba(196,181,253,0.15);
  }

  /* progress bar */
  .nav-progress {
    position: absolute;
    bottom: 0; left: 0;
    height: 2px;
    background: linear-gradient(90deg, #f472b6, #c084fc, #818cf8);
    transform-origin: left;
    transition: none;
  }

  /* logo */
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem; font-weight: 800;
    color: rgba(255,255,255,0.92);
    text-decoration: none;
    letter-spacing: -0.01em;
    transition: color 0.35s;
    position: relative;
    z-index: 1;
  }
  .nav-logo em { font-style: normal; color: #f9a8d4; }
  .nav-v2.solid .nav-logo { color: #1e1b4b; }
  .nav-v2.solid .nav-logo em {
    background: linear-gradient(135deg, #f472b6, #c084fc);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* links */
  .nav-links {
    display: flex; list-style: none; gap: 0.15rem;
  }
  .nav-links a {
    font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    padding: 0.5rem 0.9rem;
    border-radius: 50px;
    transition: all 0.25s;
    position: relative;
  }
  .nav-v2.solid .nav-links a { color: #6b7280; }

  .nav-links a::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 50px;
    background: rgba(255,255,255,0.08);
    opacity: 0; transform: scale(0.85);
    transition: all 0.25s;
  }
  .nav-v2.solid .nav-links a::before { background: rgba(196,181,253,0.12); }

  .nav-links a:hover { color: #fff; }
  .nav-v2.solid .nav-links a:hover { color: #1e1b4b; }
  .nav-links a:hover::before { opacity: 1; transform: scale(1); }

  .nav-links a.active {
    color: #f9a8d4 !important;
    background: rgba(249,168,212,0.12);
    border: 1px solid rgba(249,168,212,0.25);
  }
  .nav-v2.solid .nav-links a.active {
    color: #c084fc !important;
    background: rgba(192,132,252,0.1);
    border-color: rgba(192,132,252,0.25);
  }

  /* CTA */
  .nav-cta {
    background: linear-gradient(135deg, #f472b6, #c084fc);
    color: #fff; border: none;
    padding: 0.6rem 1.4rem;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem; font-weight: 600;
    cursor: pointer; text-decoration: none;
    letter-spacing: 0.03em;
    transition: all 0.3s;
    box-shadow: 0 4px 16px rgba(192,132,252,0.35);
    position: relative; overflow: hidden;
  }
  .nav-cta::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #fb923c, #f472b6, #c084fc);
    opacity: 0; transition: opacity 0.35s;
  }
  .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(192,132,252,0.5); }
  .nav-cta:hover::before { opacity: 1; }
  .nav-cta span { position: relative; z-index: 1; }

  /* hamburger */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none; border: none;
    cursor: pointer; padding: 6px;
    border-radius: 10px;
    transition: background 0.2s;
  }
  .nav-hamburger:hover { background: rgba(255,255,255,0.08); }
  .nav-v2.solid .nav-hamburger:hover { background: rgba(196,181,253,0.12); }
  .nav-hamburger span {
    display: block; width: 22px; height: 2px;
    background: rgba(255,255,255,0.8);
    border-radius: 2px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    transform-origin: center;
  }
  .nav-v2.solid .nav-hamburger span { background: #1e1b4b; }
  .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* mobile drawer */
  .mobile-drawer-v2 {
    position: fixed;
    inset: 0; z-index: 850;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0;
    font-family: 'DM Sans', sans-serif;
    pointer-events: none;
  }

  .drawer-backdrop {
    position: absolute; inset: 0;
    background: rgba(15,10,40,0.92);
    backdrop-filter: blur(20px);
  }

  .drawer-content {
    position: relative; z-index: 1;
    display: flex; flex-direction: column;
    align-items: center; gap: 0.5rem;
    width: 100%;
  }

  .drawer-link {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem; font-weight: 700;
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    padding: 0.4rem 2rem;
    border-radius: 16px;
    transition: color 0.2s, background 0.2s;
    width: 100%; text-align: center;
    position: relative; overflow: hidden;
  }
  .drawer-link::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(244,114,182,0.1), rgba(196,181,253,0.1));
    opacity: 0; transition: opacity 0.25s;
  }
  .drawer-link:hover { color: #f9a8d4; }
  .drawer-link:hover::before { opacity: 1; }

  .drawer-cta {
    margin-top: 2rem;
    background: linear-gradient(135deg, #f472b6, #c084fc);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 1rem; font-weight: 600;
    padding: 0.9rem 2.5rem; border-radius: 50px;
    text-decoration: none; letter-spacing: 0.03em;
    box-shadow: 0 8px 32px rgba(192,132,252,0.4);
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .drawer-cta:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(192,132,252,0.55); }

  .drawer-close {
    position: absolute; top: 1.5rem; right: 6%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.5);
    width: 44px; height: 44px;
    border-radius: 50%; font-size: 1.2rem;
    cursor: pointer; display: flex;
    align-items: center; justify-content: center;
    transition: all 0.2s; z-index: 2;
  }
  .drawer-close:hover { background: rgba(244,114,182,0.15); border-color: rgba(244,114,182,0.3); color: #f9a8d4; }

  /* decorative orbs inside drawer */
  .drawer-orb {
    position: absolute; border-radius: 50%;
    pointer-events: none; filter: blur(80px); opacity: 0.3;
  }

  @media (max-width: 960px) {
    .nav-links, .nav-cta { display: none; }
    .nav-hamburger { display: flex; }
  }
`;

export default function Navbar() {
  const scrolled = useScrolled(70);
  const active   = useActiveSection(["home","about","subjects","classes","process","reviews","contact"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{styles}</style>

      <nav className={`nav-v2 ${scrolled ? "solid" : ""}`}>
        {/* scroll progress */}
        <motion.div
          className="nav-progress"
          style={{ width: `${progress}%` }}
        />

        {/* Logo */}
        <motion.a
          className="nav-logo" href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}>
          Ms. <em>Vanshika</em>
        </motion.a>

        {/* Desktop Links */}
        <motion.ul
          className="nav-links"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}>
          {NAV_LINKS.map(({ label, href }, i) => (
            <motion.li key={label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}>
              <a href={href} className={active === label.toLowerCase() ? "active" : ""}>
                {label}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.a
          className="nav-cta" href="#contact"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}>
          <span>Book a Demo</span>
        </motion.a>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-drawer-v2"
            style={{ pointerEvents: "auto" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>

            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* decorative orbs */}
            <div className="drawer-orb" style={{ width:300,height:300,top:"-5%",right:"-5%",background:"radial-gradient(circle,#f472b6,transparent 70%)" }} />
            <div className="drawer-orb" style={{ width:250,height:250,bottom:"5%",left:"-5%",background:"radial-gradient(circle,#818cf8,transparent 70%)" }} />

            <button className="drawer-close" onClick={() => setMenuOpen(false)}>✕</button>

            <div className="drawer-content">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  className="drawer-link"
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22,1,0.36,1] }}>
                  {label}
                </motion.a>
              ))}

              <motion.a
                className="drawer-cta"
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 180 }}>
                Book a Free Demo →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}