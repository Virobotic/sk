import { Link, useParams } from "react-router-dom";
import tribesData from "../../data/tribes.json";

interface Tribe {
  name: string;
  slug: string;
  district: string;
  lat: number;
  lon: number;
  language: string;
  population: string;
  region: string;
  primaryLivelihood: string;
  festival: string;
  tags: string[];
  description: string;
  highlights: string[];
  seeMore: string[];
}

export default function TribeDetailPage() {
  const { slug } = useParams();
  const tribes = tribesData as Tribe[];
  const tribe = tribes.find((item) => item.slug === slug);

  if (!tribe) {
    return (
      <main className="page-content">
        <div className="card">
          <h1>Tribe not found</h1>
          <p>We could not find a tribe for the slug <strong>{slug}</strong>.</p>
          <Link to="/tribes" className="button secondary">Back to tribe directory</Link>
        </div>
      </main>
    );
  }

  const mapSrc = `https://maps.google.com/maps?q=${tribe.lat},${tribe.lon}&z=12&t=k&output=embed`;

  return (
    <main className="page-content">
      <div className="detail-page-card card">
        <div className="detail-heading">
          <p className="eyebrow">Tribe profile</p>
          <h1>{tribe.name}</h1>
          <p>{tribe.description}</p>
        </div>

        <div className="detail-grid">
          <div className="detail-list detail-side">
            <div><strong>Language</strong><span>{tribe.language}</span></div>
            <div><strong>District</strong><span>{tribe.district}</span></div>
            <div><strong>Region</strong><span>{tribe.region}</span></div>
            <div><strong>Population</strong><span>{tribe.population}</span></div>
            <div><strong>Festival</strong><span>{tribe.festival}</span></div>
            <div><strong>Livelihood</strong><span>{tribe.primaryLivelihood}</span></div>
            <div><strong>Slug</strong><code>{`/tribes/${tribe.slug}`}</code></div>
            <div><strong>Tags</strong><span>{tribe.tags.join(", ")}</span></div>
          </div>

          <div className="map-preview-card">
            <iframe
              title={`tribe-${tribe.slug}`}
              src={mapSrc}
              style={{ width: "100%", height: "100%", border: 0, borderRadius: 20 }}
            />
          </div>
        </div>

        <div className="tribe-highlights">
          <h3>Community highlights</h3>
          <ul>
            {tribe.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div>
            {tribe.seeMore.map((item) => (
              <p key={item} className="see-more-text">{item}</p>
            ))}
          </div>
        </div>

        <div className="detail-action-row">
          <Link to="/tribes" className="button secondary">Explore all tribes</Link>
          <a href={mapSrc} target="_blank" rel="noreferrer" className="button primary">Open satellite map</a>
        </div>
      </div>
    </main>
  );
}
