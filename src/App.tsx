import "./styles/theme.css";
import NavBar from "./components/NavBar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import SkipLink from "./components/SkipLink";
import BackToTop from "./components/BackToTop";
import SeoHead from "./components/SeoHead";

export default function App(){
  return (
    <>
      <SeoHead />
      <SkipLink target="#main-content" />
      <NavBar />
      <main id="main-content" tabIndex={-1}>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
}
