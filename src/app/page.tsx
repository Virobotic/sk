import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CulturalMap from "../components/CulturalMap";
import LanguageExplorer from "../components/LanguageExplorer";
import CulturesPage from "./cultures/page";
import FestivalsPage from "./festivals/page";
import FoodsPage from "./foods/page";
import GalleryPage from "./gallery/page";
import MuseumPage from "./museum/page";
import TourismPage from "./tourism/page";
import MapPage from "./map/page";
import ContactPage from "./contact/page";
import southernKaduna from "../data/southernKaduna.json";

function HomePage() {
  return (
    <main className="home-page">
      <section className="hero-panel">
        <Hero />
      </section>

      <section className="overview-panel">
        <div className="section-title">
          <p>Discover Southern Kaduna</p>
          <h2>Heritage that shapes every community</h2>
        </div>

        <div className="home-intro">
          <div className="intro-copy">
            {southernKaduna.overview.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          <div className="facts-grid">
            {southernKaduna.facts.map((fact, index) => (
              <article key={index} className="card fact-item">
                <p>{fact}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="feature-gallery">
          {southernKaduna.images.map((item) => (
            <article key={item.src} className="card gallery-feature">
              <img src={item.src} alt={item.caption} className="card-image" />
              <p>{item.caption}</p>
            </article>
          ))}
        </div>

        <div className="grid-layout">
          <CulturalMap />
          <LanguageExplorer />
        </div>
      </section>
    </main>
  );
}

export default function AppPage() {
  return (
    <BrowserRouter>
      <div className="app-frame">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cultures" element={<CulturesPage />} />
          <Route path="/festivals" element={<FestivalsPage />} />
          <Route path="/foods" element={<FoodsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/museum" element={<MuseumPage />} />
          <Route path="/tourism" element={<TourismPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
