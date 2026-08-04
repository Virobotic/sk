import tourism from "../../tourism.json";

export default function TourismPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">Tourism</p>
        <h1>Places to visit in and around Southern Kaduna</h1>
        <p>Find natural landmarks, cultural sites, and local experiences.</p>
      </header>

      <section className="content-grid">
        {tourism.map((place) => (
          <article key={place.id} className="card content-card tourism-card">
            {place.image ? (
              <img src={place.image.startsWith("/") ? place.image : `/images/${place.image}`} alt={place.name} className="card-image" />
            ) : null}
            <h2>{place.name}</h2>
            <p>{place.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
