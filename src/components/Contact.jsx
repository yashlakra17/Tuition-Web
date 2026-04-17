import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { SectionTag } from "./UI.jsx";
import { CONTACT_INFO } from "../data/siteData.js";

const styles = `
  .contact-v2 {
    background: linear-gradient(160deg, #fdf4ff 0%, #fce7f3 40%, #eff6ff 100%);
    padding: 7rem 7%;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .contact-blob {
    position:absolute;border-radius:50%;pointer-events:none;filter:blur(80px);opacity:0.55;
  }
  .contact-blob-1{width:500px;height:500px;top:-10%;right:-8%;background:radial-gradient(circle,#c4b5fd,transparent 70%);}
  .contact-blob-2{width:400px;height:400px;bottom:-10%;left:-5%;background:radial-gradient(circle,#f9a8d4,transparent 70%);}
  .contact-blob-3{width:300px;height:300px;top:40%;left:35%;background:radial-gradient(circle,#6ee7b7,transparent 70%);opacity:0.3;}

  .contact-grid-v2 {
    display:grid;
    grid-template-columns:1.15fr 1fr;
    gap:5rem;align-items:start;
    max-width:1080px;margin:0 auto;
    position:relative;z-index:1;
  }

  .section-h-light {
    font-family:'Playfair Display',serif;
    font-size:clamp(2rem,3.5vw,2.8rem);font-weight:800;
    color:#1e1b4b;line-height:1.2;letter-spacing:-0.02em;
    margin:0.6rem 0 1rem;
  }
  .section-sub-light{font-size:0.97rem;color:#6b7280;line-height:1.8;max-width:420px;}

  /* contact info rows */
  .contact-details-v2{display:flex;flex-direction:column;gap:1rem;margin-top:2rem;}
  .contact-row-v2 {
    display:flex;align-items:flex-start;gap:1rem;
    font-size:0.875rem;color:#6b7280;
    padding:1rem 1.2rem;
    background:#fff;
    border:1px solid #f3e8ff;
    border-radius:16px;
    transition:all 0.25s;
    cursor:default;
  }
  .contact-row-v2:hover{
    border-color:rgba(196,181,253,0.5);
    box-shadow:0 8px 24px rgba(196,181,253,0.15);
    transform:translateX(4px);
  }
  .contact-icon-v2 {
    width:44px;height:44px;
    border-radius:12px;
    background:linear-gradient(135deg,rgba(249,168,212,0.2),rgba(196,181,253,0.2));
    border:1px solid rgba(196,181,253,0.3);
    display:flex;align-items:center;justify-content:center;
    font-size:1.15rem;flex-shrink:0;
    transition:all 0.25s;
  }
  .contact-row-v2:hover .contact-icon-v2{
    background:linear-gradient(135deg,#f472b6,#c084fc);
    border-color:transparent;
  }
  .contact-info-label-v2 {
    font-size:0.68rem;text-transform:uppercase;
    letter-spacing:0.09em;color:#9ca3af;
    display:block;margin-bottom:0.2rem;
  }
  .contact-info-val{color:#374151;font-size:0.875rem;}

  /* form box */
  .form-box-v2 {
    background:#fff;
    border:1px solid #f3e8ff;
    border-radius:24px;
    padding:2.6rem;
    box-shadow:0 20px 60px rgba(196,181,253,0.15);
    position:relative;overflow:hidden;
  }
  .form-box-v2::before {
    content:'';position:absolute;top:-80px;right:-80px;
    width:200px;height:200px;border-radius:50%;
    background:radial-gradient(circle,rgba(249,168,212,0.15),transparent 70%);
    pointer-events:none;
  }
  .form-box-v2 h3 {
    font-family:'Playfair Display',serif;
    font-size:1.3rem;font-weight:700;color:#1e1b4b;margin-bottom:1.75rem;
  }

  .form-group-v2{margin-bottom:1rem;}
  .form-group-v2 label{
    display:block;font-size:0.7rem;
    text-transform:uppercase;letter-spacing:0.09em;
    color:#9ca3af;margin-bottom:0.5rem;font-weight:500;
  }
  .form-group-v2 input,
  .form-group-v2 select,
  .form-group-v2 textarea{
    width:100%;
    background:#faf5ff;
    border:1.5px solid #f3e8ff;
    border-radius:12px;
    padding:0.85rem 1rem;
    color:#1e1b4b;
    font-family:'DM Sans',sans-serif;font-size:0.875rem;
    outline:none;transition:all 0.25s;
  }
  .form-group-v2 input:focus,
  .form-group-v2 select:focus,
  .form-group-v2 textarea:focus{
    border-color:#c084fc;
    background:#fff;
    box-shadow:0 0 0 4px rgba(192,132,252,0.12);
  }
  .form-group-v2 input::placeholder,
  .form-group-v2 textarea::placeholder{color:#c4b5fd;}
  .form-group-v2 select option{background:#fff;color:#1e1b4b;}
  .form-group-v2 textarea{height:90px;resize:none;}

  .form-row-v2{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;}

  .submit-btn-v2 {
    width:100%;
    background:linear-gradient(135deg,#f472b6,#c084fc);
    color:#fff;border:none;border-radius:50px;
    padding:1rem;
    font-family:'DM Sans',sans-serif;font-size:0.92rem;font-weight:600;
    cursor:pointer;transition:all 0.3s;margin-top:0.5rem;
    letter-spacing:0.02em;
    display:flex;align-items:center;justify-content:center;gap:0.5rem;
    position:relative;overflow:hidden;
    box-shadow:0 4px 20px rgba(192,132,252,0.35);
  }
  .submit-btn-v2::before{
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,#fb923c,#f472b6,#c084fc);
    opacity:0;transition:opacity 0.35s;
  }
  .submit-btn-v2:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(192,132,252,0.5);}
  .submit-btn-v2:hover::before{opacity:1;}
  .submit-btn-v2:disabled{opacity:0.6;cursor:not-allowed;transform:none;}
  .submit-btn-v2 span{position:relative;z-index:1;}

  .form-note-v2{
    text-align:center;font-size:0.72rem;
    color:#9ca3af;margin-top:0.7rem;
  }

  /* success */
  .form-success-v2{
    text-align:center;padding:3rem 1rem;
  }
  .success-icon-wrap{
    width:72px;height:72px;border-radius:50%;
    background:linear-gradient(135deg,#f472b6,#c084fc);
    display:flex;align-items:center;justify-content:center;
    font-size:2rem;margin:0 auto 1.2rem;
    box-shadow:0 8px 24px rgba(192,132,252,0.4);
  }
  .form-success-v2 h4{
    font-family:'Playfair Display',serif;font-size:1.35rem;
    color:#1e1b4b;margin-bottom:0.5rem;
  }
  .form-success-v2 p{font-size:0.875rem;color:#6b7280;}

  @media(max-width:960px){
    .contact-grid-v2{grid-template-columns:1fr;gap:2.5rem;}
    .form-row-v2{grid-template-columns:1fr;}
  }
`;

const INITIAL = { name: "", phone: "", cls: "", subject: "", msg: "" };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Contact() {
  const [form, setForm]           = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.cls || !form.subject) {
      toast.error("Please fill in all required fields! 📝", {
        style: {
          background: "#fff",
          color: "#1e1b4b",
          border: "1px solid #f3e8ff",
          borderRadius: "14px",
          fontFamily: "'DM Sans', sans-serif",
        },
        progressStyle: { background: "linear-gradient(90deg,#f472b6,#c084fc)" },
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(INITIAL);
      toast.success("Enquiry sent! Ms. Vanshika will reach out soon 🎉", {
        style: {
          background: "#fff",
          color: "#1e1b4b",
          border: "1px solid #f3e8ff",
          borderRadius: "14px",
          fontFamily: "'DM Sans', sans-serif",
        },
        progressStyle: { background: "linear-gradient(90deg,#f472b6,#c084fc)" },
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1600);
  };

  return (
    <>
      <style>{styles}</style>

      <section className="contact-v2" id="contact">
        <div className="contact-blob contact-blob-1" />
        <div className="contact-blob contact-blob-2" />
        <div className="contact-blob contact-blob-3" />

        <div className="contact-grid-v2">

          {/* LEFT */}
          <div>
            <motion.div {...slideLeft(0)}>
              <SectionTag>Get in Touch</SectionTag>
              <h2 className="section-h-light">Book a Free<br />Demo Session</h2>
              <p className="section-sub-light">
                Reach out to discuss your child's needs and schedule a
                no-obligation trial class today.
              </p>
            </motion.div>

            <div className="contact-details-v2">
              {CONTACT_INFO.map(({ icon, label, value }, i) => (
                <motion.div className="contact-row-v2" key={label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.55 }}
                  whileHover={{ x: 4 }}>
                  <div className="contact-icon-v2">{icon}</div>
                  <div>
                    <span className="contact-info-label-v2">{label}</span>
                    <span className="contact-info-val">{value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <div className="form-box-v2">
              <h3>Send an Enquiry ✉️</h3>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="form-success-v2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}>
                    <motion.div
                      className="success-icon-wrap"
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.6, delay: 0.2 }}>
                      🎉
                    </motion.div>
                    <h4>Thank you!</h4>
                    <p>Ms. Vanshika will be in touch with you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>

                    <div className="form-row-v2">
                      <div className="form-group-v2">
                        <label>Parent's Name *</label>
                        <input type="text" placeholder="e.g. Rahul Gupta"
                          value={form.name} onChange={update("name")} />
                      </div>
                      <div className="form-group-v2">
                        <label>Phone / WhatsApp *</label>
                        <input type="tel" placeholder="+91 XXXXX XXXXX"
                          value={form.phone} onChange={update("phone")} />
                      </div>
                    </div>

                    <div className="form-row-v2">
                      <div className="form-group-v2">
                        <label>Child's Class *</label>
                        <select value={form.cls} onChange={update("cls")}>
                          <option value="">Select Class</option>
                          {[1,2,3,4,5,6,7,8,9].map((n) => (
                            <option key={n} value={n}>Class {n}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group-v2">
                        <label>Subject *</label>
                        <select value={form.subject} onChange={update("subject")}>
                          <option value="">Select Subject</option>
                          {["Mathematics","Science","English","Hindi","Social Studies","All Subjects"].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group-v2">
                      <label>Message (optional)</label>
                      <textarea
                        placeholder="Any specific concerns, schedule preferences, or questions…"
                        value={form.msg} onChange={update("msg")} />
                    </div>

                    <motion.button
                      className="submit-btn-v2"
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}>
                      <span>
                        {submitting ? "⏳ Sending…" : "Send Enquiry →"}
                      </span>
                    </motion.button>
                    <p className="form-note-v2">
                      ✓ Typically respond within a few hours · No spam, ever
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}