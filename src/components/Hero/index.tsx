import { Link } from "react-router-dom";

const heroImage = "/images/all tribes.png";
const heroImageUrl = encodeURI(heroImage);

export default function Hero() {
  return (
    <section className="hero-card hero-fullscreen">
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      />
      <div className="hero-content hero-fullscreen-content">
        <div className="hero-copy">
          <p className="eyebrow">Southern Kaduna</p>
          <h1>Heritage, landscape, and quiet community life.</h1>
          <p>
            Discover a thoughtfully simple view of this region’s festival culture,
            language traditions, and scenic highlands.
          </p>
          <div className="hero-actions">
            <Link to="/cultures" className="button primary">
              Explore cultures
            </Link>
            <Link to="/gallery" className="button secondary">
              View gallery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
