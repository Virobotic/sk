import cultures from "../../cultures.json";

export default function CulturalMap() {
  return (
    <article className="card map-card">
      <h3>Southern Kaduna communities</h3>
      <p>Major communities and cultural centres across the southern district.</p>
      <div className="map-placeholder">
        <ul className="community-list">
          {cultures.map((culture) => (
            <li key={culture.id}>
              <strong>{culture.name}</strong>
              <p>{culture.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
