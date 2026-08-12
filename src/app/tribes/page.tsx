import { Link, useParams } from "react-router-dom";
import { tribeBySlug } from "../../data/tribes";

export default function TribePage() {
  const { slug } = useParams();
  const tribe = tribeBySlug(slug);
  if (!tribe) return <main className="page-content"><header className="page-header"><p className="eyebrow">Community profile</p><h1>Profile not found.</h1><p>This community profile has not been added yet.</p><Link className="button primary" to="/cultures">Browse communities</Link></header></main>;
  return <main className="tribe-page">
    <section className="tribe-hero"><img src={tribe.image} alt={tribe.name} /><div><p className="section-kicker">Community profile</p><h1>{tribe.name}</h1><p>{tribe.localName}</p></div></section>
    <section className="tribe-content">
      <aside className="tribe-facts"><p className="section-kicker">At a glance</p><dl><div><dt>Connected places</dt><dd>{tribe.places}</dd></div><div><dt>Language</dt><dd>{tribe.language}</dd></div></dl><Link className="text-link" to="/cultures">All communities <span>→</span></Link></aside>
      <div className="tribe-reading"><section><p className="section-kicker">Introduction</p><h2>A living community, not a museum piece.</h2><p>{tribe.overview}</p></section><section><h3>History and context</h3><p>{tribe.history}</p></section><section><h3>Culture and language</h3><p>{tribe.culture}</p></section><section><h3>Continuing today</h3><p>{tribe.today}</p></section><section className="profile-sources"><h3>Read the documented sources</h3><p>These are starting points for deeper study. Community voices and locally held records should remain central to any fuller account.</p><ul>{tribe.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} <span>↗</span></a></li>)}</ul></section></div>
    </section>
  </main>;
}
