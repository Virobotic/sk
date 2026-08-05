import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

const initialVisibleCount = 6;

export default function TribesPage() {
  const tribes = tribesData as Tribe[];
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(tribes[0]?.slug ?? "");

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(tribes.map((tribe) => tribe.region)))],
    [tribes]
  );

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(tribes.flatMap((tribe) => tribe.tags)))],
    [tribes]
  );

  const filteredTribes = useMemo(() => {
    return tribes.filter((tribe) => {
      const searchValue = search.toLowerCase();
      const matchesSearch =
        tribe.name.toLowerCase().includes(searchValue) ||
        tribe.district.toLowerCase().includes(searchValue) ||
        tribe.language.toLowerCase().includes(searchValue) ||
        tribe.festival.toLowerCase().includes(searchValue) ||
        tribe.tags.some((tag) => tag.toLowerCase().includes(searchValue));

      const matchesRegion = regionFilter === "All" || tribe.region === regionFilter;
      const matchesTag = tagFilter === "All" || tribe.tags.includes(tagFilter);
      return matchesSearch && matchesRegion && matchesTag;
    });
  }, [regionFilter, search, tagFilter, tribes]);

  const selectedTribe = useMemo(
    () => filteredTribes.find((tribe) => tribe.slug === selectedSlug) ?? filteredTribes[0] ?? tribes[0],
    [filteredTribes, selectedSlug, tribes]
  );

  const visibleTribes = showAll ? filteredTribes : filteredTribes.slice(0, initialVisibleCount);

  const mapSrc = `https://maps.google.com/maps?q=${selectedTribe.lat},${selectedTribe.lon}&z=11&t=k&output=embed`;

  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">Tribes</p>
        <h1>Southern Kaduna communities</h1>
        <p>Explore a broad list of Southern Kaduna peoples with region filters, tribe search, and slug-based deep links.</p>
      </header>

      <section className="grid-layout">
        <aside className="card tribe-control-card">
          <div className="smart-panel">
            <h3>Smart tribe discovery</h3>
            <p>Search by name, language, district, festival, or cultural tag. Use quick filters to narrow the list.</p>
          </div>

          <div className="filter-bar">
            <input
              type="search"
              className="input"
              placeholder="Search tribes, languages, festivals..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="filter-chips">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                className={`chip${regionFilter === region ? " active" : ""}`}
                onClick={() => setRegionFilter(region)}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="filter-chips">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`chip${tagFilter === tag ? " active" : ""}`}
                onClick={() => setTagFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="tribe-list">
            {visibleTribes.map((tribe) => (
              <button
                key={tribe.slug}
                type="button"
                className={`tribe-item${tribe.slug === selectedTribe.slug ? " selected" : ""}`}
                onClick={() => setSelectedSlug(tribe.slug)}
              >
                <div>
                  <strong>{tribe.name}</strong>
                  <p>{tribe.region} • {tribe.district}</p>
                </div>
                <span>{tribe.language}</span>
              </button>
            ))}
          </div>

          {filteredTribes.length > initialVisibleCount && (
            <div className="see-more-row">
              <button className="button secondary" type="button" onClick={() => setShowAll((value) => !value)}>
                {showAll ? "Show fewer tribes" : `See all ${filteredTribes.length} tribes`}
              </button>
            </div>
          )}
        </aside>

        <div className="card tribe-detail-card">
          <div className="detail-grid">
            <div>
              <p className="eyebrow">Selected tribe</p>
              <h2>{selectedTribe.name}</h2>
              <p className="detail-overview">{selectedTribe.description}</p>

              <div className="detail-list">
                <div><strong>Language</strong><span>{selectedTribe.language}</span></div>
                <div><strong>District</strong><span>{selectedTribe.district}</span></div>
                <div><strong>Region</strong><span>{selectedTribe.region}</span></div>
                <div><strong>Population</strong><span>{selectedTribe.population}</span></div>
                <div><strong>Festival</strong><span>{selectedTribe.festival}</span></div>
                <div><strong>Livelihood</strong><span>{selectedTribe.primaryLivelihood}</span></div>
              </div>

              <div className="detail-action-row">
                <Link to={`/tribes/${selectedTribe.slug}`} className="button primary">
                  Open tribe slug page
                </Link>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setShowAll(true)}
                >
                  View the full tribe list
                </button>
              </div>
            </div>

            <div className="map-preview-card">
              <iframe
                title={`map-${selectedTribe.slug}`}
                src={mapSrc}
                style={{ width: "100%", height: "100%", border: 0, borderRadius: 20 }}
              />
              <div className="map-links">
                <span>Slug:</span>
                <code>{`/tribes/${selectedTribe.slug}`}</code>
              </div>
            </div>
          </div>

          <div className="tribe-highlights">
            <h3>Live highlights</h3>
            <ul>
              {selectedTribe.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="see-more-row">
              <button className="button secondary" type="button" onClick={() => setSelectedSlug(selectedTribe.slug)}>
                See more about {selectedTribe.name}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
