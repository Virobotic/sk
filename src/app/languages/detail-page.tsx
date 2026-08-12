import { Link, useParams } from "react-router-dom";
import languages from "../../data/languages";
import tribes from "../../data/tribes";

const languageSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function LanguageDetailPage() {
  const { slug } = useParams();
  const language = languages.find((item) => languageSlug(item.name) === slug);
  const tribe = tribes.find((item) => item.language.toLowerCase().includes(language?.name.toLowerCase() ?? ""));
  if (!language) return <main className="page-content"><header className="page-header"><h1>Language not found.</h1><Link className="button primary" to="/languages">Language directory</Link></header></main>;
  return <main className="language-profile-page page-content">
    <header className="page-header"><p className="eyebrow">Language profile</p><h1>{language.name}</h1><p className="language-alias">Also recorded as {language.aliases}</p></header>
    <section className="language-profile-grid"><aside className="tribe-facts"><p className="section-kicker">At a glance</p><dl><div><dt>Connected places</dt><dd>{language.area}</dd></div><div><dt>Community context</dt><dd>{language.detail}</dd></div></dl></aside><div className="tribe-reading"><section><p className="section-kicker">Language and heritage</p><h2>Knowledge carried in speech.</h2><p>Languages are not only a way to communicate. They preserve place names, family histories, songs, ceremonies and ways of interpreting the world. This profile is a starting point and does not replace the authority of speakers and community historians.</p></section><section><h3>Documentation and care</h3><p>Names and spellings may vary between speakers, communities and publications. Use locally preferred forms where possible, ask before recording cultural material, and support community-led teaching and documentation.</p></section>{tribe && <section className="related-profile"><h3>Explore the related community</h3><p>This language profile connects with the {tribe.name} community profile, which includes sourced historical and cultural reading.</p><Link className="button primary" to={`/tribes/${tribe.slug}`}>Read about {tribe.name}</Link></section>}</div></section>
  </main>;
}
