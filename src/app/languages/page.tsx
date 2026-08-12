import { Link } from "react-router-dom";
import languages from "../../data/languages";

const languageSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function LanguagesPage() {
  return <main className="page-content">
    <header className="page-header"><p className="eyebrow">Language directory</p><h1>Many voices, one living heritage.</h1><p>Southern Kaduna is home to a remarkable concentration of indigenous languages. Select a language for its documented context and preservation notes.</p></header>
    <aside className="language-note">Names, spellings and geographic descriptions vary between communities and sources. This directory is an introduction, not a complete census of speakers or communities.</aside>
    <section className="language-directory" aria-label="Southern Kaduna languages">
      {languages.map((language) => <Link className="card language-card language-card-button" key={language.name} to={`/languages/${languageSlug(language.name)}`}><h2>{language.name}</h2><p className="language-alias">{language.aliases}</p><p>{language.detail}</p><p className="language-area">{language.area} <span>↗</span></p></Link>)}
    </section>
  </main>;
}
