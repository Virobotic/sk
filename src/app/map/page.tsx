import { useMemo, useState } from "react";

const languageLocations = [
  { id: 1, name: "Bajju", detail: "Jju-speaking communities", lat: 9.027, lon: 8.741 },
  { id: 2, name: "Atyap", detail: "Tyap-speaking communities", lat: 9.032, lon: 8.292 },
  { id: 3, name: "Agworok (Kagoro)", detail: "Kagoro and the Kaura area", lat: 8.938, lon: 8.152 },
  { id: 4, name: "Irigwe", detail: "Communities connected to Kauru", lat: 9.071, lon: 8.512 },
];

function makeMapEmbed(lat: number, lon: number, view: "street" | "satellite") {
  return `https://maps.google.com/maps?q=${lat},${lon}&z=12&t=${view === "satellite" ? "k" : "m"}&output=embed`;
}

export default function MapPage() {
  const [selectedId, setSelectedId] = useState(languageLocations[0].id);
  const [viewType, setViewType] = useState<"street" | "satellite">("street");
  const [mapEnabled] = useState(true);
  const [mapLoading, setMapLoading] = useState(true);
  const selectedLocation = useMemo(() => languageLocations.find((loc) => loc.id === selectedId) ?? languageLocations[0], [selectedId]);
  const googleMapsUrl = `https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lon}`;

  const selectLocation = (id: number) => {
    setSelectedId(id);
    if (mapEnabled) setMapLoading(true);
  };

  return <main className="page-content map-page">
    <header className="page-header map-page-header"><p className="eyebrow">Map</p><h1>Explore by language.</h1><p>Choose a community to explore its location. The interactive map loads only when you request it, keeping this page quick on slower connections.</p></header>
    <section className="map-explorer">
      <aside className="map-community-panel"><p className="map-panel-kicker">Communities</p><div className="map-location-list" aria-label="Community locations">
        {languageLocations.map((loc, index) => <button key={loc.id} type="button" className={`map-location-button${selectedId === loc.id ? " is-selected" : ""}`} onClick={() => selectLocation(loc.id)}><span className="map-location-number">0{index + 1}</span><span><strong>{loc.name}</strong><small>{loc.detail}</small></span><span className="map-location-arrow" aria-hidden="true">↗</span></button>)}
      </div></aside>
      <section className="map-stage" aria-label={`${selectedLocation.name} map`}>
        <div className="map-stage-topline"><span>Southern Kaduna</span><span>Community guide</span></div>
        <div className="map-stage-copy"><p className="eyebrow">Selected community</p><h2>{selectedLocation.name}</h2><p>{selectedLocation.detail}</p><div className="map-coordinates"><span>Latitude <strong>{selectedLocation.lat}</strong></span><span>Longitude <strong>{selectedLocation.lon}</strong></span></div></div>
        {mapEnabled && <div className="map-frame-wrap">{mapLoading && <div className="map-loading" role="status"><span /><p>Loading live map…</p></div>}<iframe key={`${selectedId}-${viewType}`} title={`${selectedLocation.name} live map`} src={makeMapEmbed(selectedLocation.lat, selectedLocation.lon, viewType)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" onLoad={() => setMapLoading(false)} /><div className="map-view-switcher" aria-label="Map view"><button type="button" className={viewType === "street" ? "active" : ""} onClick={() => { setViewType("street"); setMapLoading(true); }}>Street</button><button type="button" className={viewType === "satellite" ? "active" : ""} onClick={() => { setViewType("satellite"); setMapLoading(true); }}>Satellite</button></div></div>}
        <a className="map-external-link" href={googleMapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <span>↗</span></a>
      </section>
    </section>
  </main>;
}
