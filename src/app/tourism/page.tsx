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
        {tourism.map((place) => {
          const excerpt = place.description.length > 120
            ? `${place.description.slice(0, 120)}…`
            : place.description;

          return (
            <article key={place.id} className="card content-card tourism-card">
              {place.image ? (
                <img
                  src={place.image.startsWith("/") ? place.image : `/images/${place.image}`}
                  alt={place.name}
                  className="card-image"
                />
              ) : null}
              <h2>{place.name}</h2>
              <p>{excerpt}</p>
              <details className="card-details">
                <summary>Read more</summary>
                <p>{place.description}</p>
              </details>
            </article>
          );
        })}
      </section>
    </main>
  );
}
