import { useMemo, useState } from "react";

const languageLocations = [
  { id: 1, name: "Bajju", lat: 9.027, lon: 8.741 },
  { id: 2, name: "Atyap", lat: 9.032, lon: 8.292 },
  { id: 3, name: "Agworok (Kagoro)", lat: 8.938, lon: 8.152 },
  { id: 4, name: "Irigwe", lat: 9.071, lon: 8.512 },
];

function makeMapEmbed(lat: number, lon: number, view: "street" | "satellite") {
  const type = view === "satellite" ? "k" : "m";
  return `https://maps.google.com/maps?q=${lat},${lon}&z=12&t=${type}&output=embed`;
}

const mapViews = [
  { id: "street", label: "Street" },
  { id: "satellite", label: "Satellite" },
];

export default function MapPage() {
  const [selectedId, setSelectedId] = useState(languageLocations[0].id);
  const [viewType, setViewType] = useState<"street" | "satellite">("street");
  const selectedLocation = useMemo(
    () => languageLocations.find((loc) => loc.id === selectedId) ?? languageLocations[0],
    [selectedId]
  );

  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">Map</p>
        <h1>Language map</h1>
        <p>Click a language to view its location on the live map.</p>
      </header>

      <section className="grid-layout">
        <aside className="card" style={{ maxWidth: 360 }}>
          <h3>Languages</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {languageLocations.map((loc) => (
              <li key={loc.id} style={{ marginBottom: 10 }}>
                <button
                  className={`button secondary${selectedId === loc.id ? " active" : ""}`}
                  onClick={() => setSelectedId(loc.id)}
                  style={{ width: "100%", justifyContent: "start" }}
                >
                  <span className="iconify" data-icon="mdi:map-marker" /> {loc.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="card" style={{ minHeight: 420 }}>
          <div className="map-header">
            <div>
              <h3>Map: {selectedLocation.name}</h3>
              <p>Latitude {selectedLocation.lat}, Longitude {selectedLocation.lon}</p>
            </div>
            <div className="view-toggle-group">
              {mapViews.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  className={`button secondary${viewType === view.id ? " active" : ""}`}
                  onClick={() => setViewType(view.id as "street" | "satellite")}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: 420 }}>
            <iframe
              title="language-map"
              src={makeMapEmbed(selectedLocation.lat, selectedLocation.lon, viewType)}
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
