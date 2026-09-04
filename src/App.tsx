import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Technologies from "./components/Technologies";
import Process from "./components/Process";
import Gallery from "./components/Gallery";
import Calculator from "./components/Calculator";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-pine-950 font-body antialiased">
      <div className="noise-layer" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Technologies />
        <Process />
        <Gallery />
        <Calculator />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
