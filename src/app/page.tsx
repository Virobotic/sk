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
import AboutPage from "./about/page";
import southernKaduna from "../data/southernKaduna.json";

function HomePage() {
  return (
    <main className="home-page">
      <section className="hero-panel">
        <Hero />
      </section>

      <section className="home-summary">
        <div className="section-title">
          <p>Discover Southern Kaduna</p>
          <h2>Quiet, clear, and curated by local tradition.</h2>
        </div>

        <div className="summary-grid">
          <article className="summary-card">
            <h3>Local heritage</h3>
            <p>
              The region’s identity lives in its people, patterns, and seasonal festivals.
            </p>
          </article>

          <article className="summary-card">
            <h3>Natural landmarks</h3>
            <p>
              Rolling hills, waterfalls, and market towns form a calm, scenic backdrop.
            </p>
          </article>

          <article className="summary-card">
            <h3>Living languages</h3>
            <p>
              Each community speaks through song, craft, and oral stories passed down
              through generations.
            </p>
          </article>
        </div>
      </section>

      <section className="featured-stories">
        <div className="section-title">
          <p>Featured stories</p>
          <h2>Voices from the region</h2>
        </div>
        <div className="featured-grid">
          <article className="story-card">
            <h3>Traditional basket weaving</h3>
            <p>Women from local communities carry forward generations of woven forms and patterns.</p>
          </article>
          <article className="story-card">
            <h3>Market day traditions</h3>
            <p>Market gatherings are social hubs where music, food, and storytelling meet.</p>
          </article>
          <article className="story-card">
            <h3>Language as heritage</h3>
            <p>Each language holds songs, prayers, and histories that connect families across time.</p>
          </article>
        </div>
      </section>

      <section className="home-gallery responsive-gallery-grid">
        {southernKaduna.images.map((item) => (
          <article key={item.src} className="gallery-card minimal-gallery-card">
            <img src={item.src} alt={item.caption} className="gallery-image" />
            <div className="gallery-overlay">
              <p>{item.caption}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="home-info-row">
        <CulturalMap />
        <LanguageExplorer />
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
        <Route path="/about" element={<AboutPage />} />
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
