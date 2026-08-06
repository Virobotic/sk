import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./index.tsx";
import Cultures from "./Cultures.jsx";
import "./App.css";

function HomePage() {
  return (
    <div className="phone-landing">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">Southern Kaduna</p>
          <h1>Discover the culture of Southern Kaduna</h1>
          <p className="description">
            Southern Kaduna is a region in Kaduna State, Nigeria, known for its rich cultural
            heritage, diverse communities, and vibrant festivals.
          </p>

          <div className="actions">
            <Link className="primary" to="/cultures">
              Explore cultures
            </Link>
            <Link className="secondary" to="/cultures">
              Learn mo
            </Link>
          </div>

          <ul className="spec-list">
            <li>Traditional festivals</li>
            <li>Community craft and art</li>
            <li>Landscape and heritage</li>
          </ul>
        </div>

        <div className="phone-stage">
          <div className="phone-card" style={{ padding: "2rem" }}>
            <h2>About Southern Kaduna</h2>
            <p>
              This region is home to many indigenous peoples including the Bajju, Atyap,
              Agworok, and Irigwe. The community life is shaped by agriculture, storytelling,
              music, and strong local traditions.
            </p>
          </div>
        </div>
      </div>

      <section id="features" className="feature-grid">
        <article className="feature-card">
          <h2>Rich heritage</h2>
          <p>Local communities keep ancient traditions alive through dance, song, and craft.</p>
        </article>
        <article className="feature-card">
          <h2>Festival culture</h2>
          <p>Seasonal celebrations bring families and neighbors together around harvest stories.</p>
        </article>
        <article className="feature-card">
          <h2>Natural beauty</h2>
          <p>Rolling hills, forests, and farming landscapes define the region’s scenery.</p>
        </article>
      </section>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Page not found</h1>
      <p>Return to the home page using the navigation above.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cultures" element={<Cultures />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
