import cultures from "../../cultures.json";
import { Link } from "react-router-dom";

const tribeSlugs: Record<string, string> = { Bajju: "bajju", Atyap: "atyap", "Agworok (Kagoro)": "agworok", Irigwe: "irigwe", kamanton: "kamantan", "Ham (Jaba)": "ham", "Gbagyi (Gwari)": "gbagyi", Adara: "adara" };

export default function CulturesPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">Cultures</p>
        <h1>Communities of Southern Kaduna</h1>
        <p>Explore a selection of communities and the stories they carry.</p>
      </header>

      <section className="content-grid">
        {cultures.map((culture) => {
          const excerpt = culture.description.length > 120
            ? `${culture.description.slice(0, 120)}…`
            : culture.description;

          return (
            <article key={culture.id} className="card content-card culture-card">
              {culture.image ? (
                <img src={culture.image} alt={culture.name} className="card-image" />
              ) : null}
              <h2>{culture.name}</h2>
              <p>{excerpt}</p>
              <details className="card-details">
                <summary>Read more</summary>
                <p>{culture.description}</p>
              </details>
              {tribeSlugs[culture.name] && <Link className="text-link card-profile-link" to={`/tribes/${tribeSlugs[culture.name]}`}>Explore community profile <span>→</span></Link>}
            </article>
          );
        })}
      </section>
    </main>
  );
}
