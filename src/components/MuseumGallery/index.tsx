const galleryItems = [
  { id: 1, title: "Adara", image: "/images/adara.jpeg" },
  { id: 2, title: "Adara", image: "/images/adara.png" },
  { id: 3, title: "Afan", image: "/images/afan.jpg" },
  { id: 4, title: "Afans", image: "/images/afans.jpg" },
  { id: 5, title: "All Tribes", image: "/images/all tribes.jfif" },
  { id: 6, title: "Atap", image: "/images/atap.jfif" },
  { id: 7, title: "Atap", image: "/images/atap.png" },
  { id: 8, title: "Atyap", image: "/images/atyap.jfif" },
  { id: 9, title: "Bajju", image: "/images/Bajju.jpg" },
  { id: 10, title: "Bajju 1", image: "/images/bajju1.jfif" },
  { id: 11, title: "Camb", image: "/images/camb1.jfif" },
  { id: 12, title: "Castle", image: "/images/castle.jfif" },
  { id: 13, title: "Comb", image: "/images/comb.png" },
  { id: 14, title: "Comb 1", image: "/images/comb1.png" },
  { id: 15, title: "Gworok", image: "/images/Gworok.png" },
  { id: 16, title: "Ham", image: "/images/ham.jfif" },
  { id: 17, title: "House", image: "/images/house.jfif" },
  { id: 18, title: "Image Collection", image: "/images/images.jfif" },
  { id: 19, title: "Kagoro Hill", image: "/images/kagorohill1.png" },
  { id: 20, title: "Kataf", image: "/images/kataf.jfif" },
  { id: 21, title: "Katagwan", image: "/images/katagwan.jfif" },
  { id: 22, title: "Ninzo Cultural Dance", image: "/images/ninzo cultural dance.jfif" },
  { id: 23, title: "Ninzo", image: "/images/ninzo.jfif" },
  { id: 24, title: "Ninzo", image: "/images/ninzo.png" },
  { id: 25, title: "Nok", image: "/images/nok.jfif" },
  { id: 26, title: "Statue Nok", image: "/images/statueNok.jfif" },
  { id: 27, title: "Waterfall", image: "/images/waterfall.jfif" },
  { id: 28, title: "Waterfall Big", image: "/images/waterfallBig.jfif" },
  { id: 29, title: "SK Fest", image: "/images/sk fest.jpg" },
  { id: 30, title: "Scenic Panorama", image: "/images/yTx_vIZuLPhC3QB2PZuoJZSfr7FEhjrnryWDPMmh_Z9eepMP16JFqBJiNmfCJ836hybD5goXKKKqBS_AuQcxFjX29N4R_tHGT7EgZ4AIdJVs_YcQvz69UxT8eEmFstT6d63mCLspC-6jGXQFn8AJM4ZYM8_Dgymbg.jfif" },
];

export default function MuseumGallery() {
  return (
    <section className="content-grid gallery-grid responsive-gallery-grid">
      {galleryItems.map((item) => (
        <article key={item.id} className="card content-card gallery-card">
          <img src={item.image} alt={item.title} className="card-image" />
          <h3>{item.title}</h3>
        </article>
      ))}
    </section>
  );
}
