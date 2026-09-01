import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CulturalMap from "../components/CulturalMap";
import LanguageExplorer from "../components/LanguageExplorer";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import { SiteContentProvider } from "../context/SiteContentContext";
import CulturesPage from "./cultures/page";
import FestivalsPage from "./festivals/page";
import FoodsPage from "./foods/page";
import GalleryPage from "./gallery/page";
import MuseumPage from "./museum/page";
import TourismPage from "./tourism/page";
import MapPage from "./map/page";
import ContactPage from "./contact/page";
import AboutPage from "./about/page";
import LanguagesPage from "./languages/page";
import TribePage from "./tribes/page";
import LanguageDetailPage from "./languages/detail-page";
import LoginPage from "./login/page";
import AdminPage from "./admin/page";
import southernKaduna from "../data/southernKaduna.json";

const experiences = [
  { number: "01", title: "Cultural encounters", text: "Meet the customs, food, languages and ceremonies that give every community its distinct voice." },
  { number: "02", title: "Heritage landmarks", text: "Trace the stories held in historic places, craft traditions and landscapes shaped over generations." },
  { number: "03", title: "Living traditions", text: "Step into festivals, music and shared practices that continue to bring people together today." },
];

function HomePage() {
  return <main className="home-page">
    <Hero />
    <section className="legacy-intro"><div><p className="section-kicker">A journey through Southern Kaduna</p><h2>Journeys rooted in legacy.</h2></div><div className="legacy-intro-text"><p>Southern Kaduna holds a remarkable wealth of language, landscape and community memory. Follow its stories through places, people and traditions that invite a slower, more meaningful way to explore.</p><a className="text-link" href="#experiences">Discover the stories <span>→</span></a></div></section>
    <section className="experience-section" id="experiences"><header className="section-heading centered-heading"><p className="section-kicker">Explore with intention</p><h2>More than a place to see.</h2></header><div className="experience-grid">{experiences.map((experience) => <article className="experience-card" key={experience.number}><span>{experience.number}</span><h3>{experience.title}</h3><p>{experience.text}</p></article>)}</div></section>
    <section className="feature-split"><div className="feature-split-image"><img src="/images/kagorohill1.png" alt="Kagoro Hills landscape" /></div><div className="feature-split-copy"><p className="section-kicker">A landscape with a memory</p><h2>Discover the stories behind every horizon.</h2><p>From the Kagoro Hills to the rhythms of market day, the region offers encounters shaped by generations of local knowledge and care for place.</p><a className="button outline-button" href="#gallery">Explore destinations</a></div></section>
    <section className="home-gallery-section" id="gallery"><header className="section-heading gallery-heading"><div><p className="section-kicker">Selected places</p><h2>Stories in every direction.</h2></div><a className="text-link" href="/gallery">View all images <span>→</span></a></header><div className="home-gallery">{southernKaduna.images.map((item) => <article key={item.src} className="gallery-card minimal-gallery-card"><img src={item.src} alt={item.caption} className="gallery-image" /><div className="gallery-overlay"><p>{item.caption}</p></div></article>)}</div></section>
    <section className="home-info-row"><CulturalMap /><LanguageExplorer /></section>
    <section className="journey-cta"><p className="section-kicker">Start exploring</p><h2>Let Southern Kaduna stay with you.</h2><p>Find a starting point among its cultures, gatherings, languages and landscapes.</p><a className="button light-button" href="/cultures">Begin your journey</a></section>
  </main>;
}

function ScrollMotion({ path }: { path: string }) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(
      ".legacy-intro, .experience-section .section-heading, .experience-card, .feature-split-image, .feature-split-copy, .home-gallery-section .section-heading, .minimal-gallery-card, .home-info-row .card, .journey-cta > *, .page-header, .content-grid, .grid-layout, .about-grid, .language-directory, .contact-card, .tribe-facts, .tribe-reading, .language-profile-grid"
    ));
    elements.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -36px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);

  return null;
}

function AppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isAdminPage = location.pathname.startsWith("/admin");
  const showSiteChrome = !isLoginPage && !isAdminPage;

  return <div className="app-frame">{showSiteChrome && <Navbar />}<ScrollMotion path={location.pathname} /><div className="route-transition" key={location.pathname}><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/cultures" element={<CulturesPage />} />
    <Route path="/festivals" element={<FestivalsPage />} />
    <Route path="/foods" element={<FoodsPage />} />
    <Route path="/gallery" element={<GalleryPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/languages" element={<LanguagesPage />} />
    <Route path="/languages/:slug" element={<LanguageDetailPage />} />
    <Route path="/tribes/:slug" element={<TribePage />} />
    <Route path="/museum" element={<MuseumPage />} />
    <Route path="/tourism" element={<TourismPage />} />
    <Route path="/map" element={<MapPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}><Route path="/admin" element={<AdminPage />} /></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></div>{showSiteChrome && <Footer />}</div>;
}

export default function AppPage() {
  return <BrowserRouter><AuthProvider><SiteContentProvider><AppRoutes /></SiteContentProvider></AuthProvider></BrowserRouter>;
}
