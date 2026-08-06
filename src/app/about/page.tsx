export default function AboutPage() {
  return (
    <main className="page-content about-page">
      <header className="page-header">
        <p className="eyebrow">About</p>
        <h1>Southern Kaduna in simple terms</h1>
        <p>
          Southern Kaduna is a region defined by its communities, languages, and rich
          culture. This page shares the heartbeat of the land in a gentle, clear way.
        </p>
      </header>

      <section className="about-grid">
        <article className="card about-card">
          <h2>Community life</h2>
          <p>
            Villages are shaped by shared work, festivals, and craft traditions.
            Community gatherings center around markets, dance, and seasonal rituals.
          </p>
        </article>

        <article className="card about-card">
          <h2>Cultural heritage</h2>
          <p>
            Music, storytelling, and food are all part of how people keep memory and
            belonging alive across generations.
          </p>
        </article>

        <article className="card about-card">
          <h2>Natural style</h2>
          <p>
            Southern Kaduna includes hills, waterfalls, and farming landscapes that shape
            local life and celebrations.
          </p>
        </article>
      </section>
    </main>
  );
}
