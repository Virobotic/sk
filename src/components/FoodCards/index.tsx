import foods from "../../foods.json";

export default function FoodCards() {
  return (
    <section className="content-grid">
      {foods.map((food) => (
        <article key={food.id} className="card content-card">
          <h3>{food.name}</h3>
          <p>{food.description}</p>
        </article>
      ))}
    </section>
  );
}
