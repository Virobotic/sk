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
        {foods.map((food) => {
          const excerpt = food.description.length > 120
            ? `${food.description.slice(0, 120)}…`
            : food.description;

          return (
            <article key={food.id} className="card content-card food-card">
              {food.image ? (
                <img src={food.image} alt={food.name} className="card-image" />
              ) : null}
              <h2>{food.name}</h2>
              <p>{excerpt}</p>
              <details className="card-details">
                <summary>Read more</summary>
                <p>{food.description}</p>
              </details>
            </article>
          );
        })}
      </section>
    </main>
  );
}
