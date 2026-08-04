import cultures from "../../cultures.json";

export default function CulturesPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">Cultures</p>
        <h1>Communities of Southern Kaduna</h1>
        <p>Explore a selection of communities and the stories they carry.</p>
      </header>

      <section className="content-grid">
        {cultures.map((culture) => (
          <article key={culture.id} className="card content-card culture-card">
            {culture.image ? (
              <img src={culture.image} alt={culture.name} className="card-image" />
            ) : null}
            <h2>{culture.name}</h2>
            <p>{culture.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
