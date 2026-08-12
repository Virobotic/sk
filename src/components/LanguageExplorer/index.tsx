import { Link } from "react-router-dom";
import languages from "../../data/languages";

export default function LanguageExplorer() {
  return (
    <article className="card languages-card">
      <h3>Language Explorer</h3>
      <p>Discover languages that carry song, tradition, and local history.</p>
      <div className="language-list">
        {languages.slice(0, 4).map((language) => (
          <article key={language.name} className="language-item">
            <strong>{language.name}</strong>
            <p>{language.detail}</p>
          </article>
        ))}
      </div>
      <Link className="button secondary" to="/languages" style={{ marginTop: 18 }}>
        Explore language directory
      </Link>
    </article>
  );
}
