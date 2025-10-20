import "./styles/theme.css";

import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

import NavBar from "./components/NavBar";
import MobileBar from "./components/MobileBar";
import SkipLink from "./components/SkipLink";
import BackToTop from "./components/BackToTop";
import SeoHead from "./components/SeoHead";
import Orbs from "./components/orbs";

export default function App() {
  return (
    <>
      <SeoHead />
      <SkipLink target="#main-content" />
      <NavBar />
      {/* Ajuste de espaciado para evitar que el nav y la barra móvil tapen contenido */}
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen pt-[4.5rem] pb-[4.5rem] md:pb-0"
      >
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Orbs />
      </main>
      <BackToTop />
      <MobileBar />
    </>
  );
}
