import festivals from "../../festivals.json";

export default function FestivalsPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">Festivals</p>
        <h1>Seasonal celebrations and gatherings</h1>
        <p>Learn about the festivals that bring people together in Southern Kaduna.</p>
      </header>

      <section className="content-grid">
        {festivals.map((festival) => (
          <article key={festival.id} className="card content-card festival-card">
            {festival.image ? (
              <img src={festival.image} alt={festival.name} className="card-image" />
            ) : null}
            <h2>{festival.name}</h2>
            <p>{festival.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
