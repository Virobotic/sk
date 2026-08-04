import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">Southern Kaduna</p>
        <h1>Celebrate a living tapestry of culture, craft, and highland heritage.</h1>
        <p>
          Southern Kaduna is home to diverse ethnic communities, historic market towns,
          and scenic landscapes like Kagoro Hills and Matsirga Waterfalls.
        </p>
        <div className="hero-actions">
          <Link to="/cultures" className="button primary">
            View Cultures
          </Link>
          <Link to="/festivals" className="button secondary">
            Upcoming Festivals
          </Link>
        </div>
      </div>
      <div className="hero-visual">
        <img
          src="/images/kagorohill.jpg"
          alt="Kagoro Hills in Southern Kaduna"
          className="hero-image"
        />
      </div>
    </section>
  );
}
