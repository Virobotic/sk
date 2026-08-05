const galleryItems = [
  {
    id: 1,
    title: "Traditional Atyap dance",
    image: "/images/atyap.jfif"
  },
  {
    id: 2,
    title: "Gworok cultural scene",
    image: "/images/Gworok.png"
  },
  {
    id: 3,
    title: "Kagoro Hills landscape",
    image: "/images/kagorohill.jpg"
  },
  {
    id: 4,
    title: "Matsirga Waterfalls",
    image: "/images/waterfall.jfif"
  }
];

export default function MuseumGallery() {
  return (
    <section className="masonry-board">
      {galleryItems.map((item) => (
        <article key={item.id} className="pin-card">
          <img src={item.image} alt={item.title} className="card-image" />
          <h3>{item.title}</h3>
        </article>
      ))}
    </section>
  );
}
