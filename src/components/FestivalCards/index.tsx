import festivals from "../../festivals.json";

export default function FestivalCards() {
  return (
    <section className="content-grid">
      {festivals.map((festival) => (
        <article key={festival.id} className="card content-card">
          <h3>{festival.name}</h3>
          <p>{festival.description}</p>
        </article>
      ))}
    </section>
  );
}
