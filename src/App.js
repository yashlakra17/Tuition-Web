import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Subjects from './components/Subjects';
import Classes from './components/Classes';
import Process from './components/Process';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Navbar />

      {/* 🔥 All sections in one page */}
      <Home />
      <About />
      <Subjects />
      <Classes />
      <Process />
      <Reviews />
      <Contact />

      <Footer />

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}