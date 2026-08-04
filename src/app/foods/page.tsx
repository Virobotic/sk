import foods from "../../foods.json";

export default function FoodsPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">Foods</p>
        <h1>Traditional dishes from the region</h1>
        <p>Discover meals and ingredients that are central to Southern Kaduna life.</p>
      </header>

      <section className="content-grid">
        {foods.map((food) => (
          <article key={food.id} className="card content-card">
            <h2>{food.name}</h2>
            <p>{food.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
