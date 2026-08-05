import MuseumGallery from "../../components/MuseumGallery";

export default function GalleryPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <p className="eyebrow">Gallery</p>
        <h1>Visual stories from Southern Kaduna</h1>
        <p>Images, crafts, and quiet cultural moments with a cleaner editorial presentation.</p>
      </header>

      <MuseumGallery />
    </main>
  );
}
