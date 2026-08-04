import cultures from "./cultures.json";

export default function Cultures() {
  return (
    <main style={{ padding: "2rem" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>Southern Kaduna Cultures</h1>
        <p>
          Southern Kaduna is home to several indigenous communities with unique stories,
          festivals, and crafts.
        </p>
      </header>

      <section style={{ display: "grid", gap: "1rem" }}>
        {cultures.map((culture) => (
          <article
            key={culture.id}
            style={{ padding: "1.5rem", border: "1px solid #ccc", borderRadius: "0.75rem" }}
          >
            <h2>{culture.name}</h2>
            <p>{culture.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
