// ── Main page — assembles all section components ──────────────────
import { useToast } from "../hooks/useToast.js";
import { ToastContainer } from "../components/UI.jsx";

import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
import About from "../components/About.jsx";
import Subjects from "../components/Subjects.jsx";
import Home from "../components/Home.jsx";
import Classes from "../components/Classes.jsx";
import Process from "../components/Process.jsx";
import Reviews from "../components/Reviews.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

import "../styles/globals.css";

export default function VanshikaTutoring() {
  const { toasts, add: toast } = useToast();

  return (
    <>
      {/* Global toast notifications */}
      <ToastContainer toasts={toasts} />

      {/* Fixed navigation bar */}
      <Navbar />

      {/* Page sections in order */}
      <main>
        <Home />
        <Header />
        <About />
        <Subjects />
        <Classes />
        <Process />
        <Reviews />
        <Contact onToast={toast} />
      </main>

      {/* Site footer */}
      <Footer />
    </>
  );
}
