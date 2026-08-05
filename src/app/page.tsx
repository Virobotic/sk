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
import TribesPage from "./tribes/page";
import TribeDetailPage from "./tribes/detail";
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
          <h2>Heritage that feels editorial, calm, and easy to explore</h2>
        </div>

        <div className="split-grid">
          <article className="surface">
            <div className="stack">
              <p className="eyebrow">Overview</p>
              {southernKaduna.overview.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </article>

          <div className="stat-grid">
            {southernKaduna.facts.map((fact, index) => (
              <article key={index} className="stat-card">
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <p>{fact}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="masonry-board">
          <article className="pin-card pin-card-large">
            <p className="eyebrow">Featured place</p>
            <h3>Kagoro Hills</h3>
            <p>
              A landmark that gives the region its visual rhythm: steep terrain, layered settlements,
              and a sense of quiet scale.
            </p>
            <img src="/images/kagorohill.jpg" alt="Kagoro Hills in Southern Kaduna" className="card-image" />
          </article>

          <article className="pin-card">
            <p className="eyebrow">Heritage note</p>
            <h3>Festival life</h3>
            <p>Seasonal gatherings shape memory through dance, food, and communal rituals.</p>
          </article>

          <article className="pin-card pin-card-tall">
            <p className="eyebrow">Cultural pulse</p>
            <h3>Living communities</h3>
            <p>
              Southern Kaduna is not one story but many. The pinboard layout mirrors that layered
              identity by giving each piece its own visual space.
            </p>
            <img src="/images/atyap.jfif" alt="Atyap cultural heritage" className="card-image" />
          </article>

          {southernKaduna.images.map((item) => (
            <article key={item.src} className="pin-card">
              <img src={item.src} alt={item.caption} className="card-image" />
              <p>{item.caption}</p>
            </article>
          ))}
        </div>

        <div className="masonry-board secondary-board">
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
          <Route path="/tribes" element={<TribesPage />} />
          <Route path="/tribes/:slug" element={<TribeDetailPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
