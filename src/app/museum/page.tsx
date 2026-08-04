import MuseumGallery from "../../components/MuseumGallery";

export default function MuseumPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">Museum</p>
        <h1>Preserving local heritage</h1>
        <p>Explore cultural artifacts and the stories behind them.</p>
      </header>

      <MuseumGallery />
    </main>
  );
}
