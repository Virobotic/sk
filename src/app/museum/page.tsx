import MuseumGallery from "../../components/MuseumGallery";

export default function MuseumPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">Museum</p>
        <h1>Preserving local heritage</h1>
        <p>Artifacts, imagery, and context arranged as a calm digital exhibition.</p>
      </header>

      <MuseumGallery />
    </main>
  );
}
