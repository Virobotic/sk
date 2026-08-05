import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">Southern Kaduna</p>
        <h1>A calm, modern guide to a region shaped by community and memory.</h1>
        <p>
          Explore indigenous communities, food, festivals, landscapes, and the stories that
          connect them. The experience is intentionally minimal so the content can breathe.
        </p>
        <div className="hero-actions">
          <Link to="/cultures" className="button primary">
            Explore cultures
          </Link>
          <Link to="/tribes" className="button secondary">
            Open tribe atlas
          </Link>
        </div>
        <div className="hero-meta">
          <span>Heritage-first layout</span>
          <span>Fast, readable navigation</span>
          <span>Built for mobile and desktop</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-frame">
          <img
            src="/images/kagorohill.jpg"
            alt="Kagoro Hills in Southern Kaduna"
            className="hero-image"
          />
          <div className="hero-quote">
            <strong>Kagoro Hills</strong>
            <span>Landforms, trade routes, and community identity.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
