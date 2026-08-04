export default function Hero() {
  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">Southern Kaduna</p>
        <h1>Explore a region rich in history, music, and living tradition.</h1>
        <p>
          From mountains to marketplaces, Southern Kaduna communities preserve stories,
          crafts, and celebrations that connect people across generations.
        </p>
        <div className="hero-actions">
          <a href="/cultures" className="button primary">
            View Cultures
          </a>
          <a href="/festivals" className="button secondary">
            Upcoming Festivals
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card-accent" />
      </div>
    </section>
  );
}
