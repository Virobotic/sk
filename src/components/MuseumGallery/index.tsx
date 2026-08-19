'use client';

import { useSiteContent } from '../../context/SiteContentContext';

export default function MuseumGallery() {
  const { content } = useSiteContent();

  return (
    <section className="content-grid gallery-grid responsive-gallery-grid">
      {content.galleryItems.map((item) => (
        <article key={item.id} className="card content-card gallery-card">
          <img src={item.image} alt={item.title} className="card-image" />
          <h3>{item.title}</h3>
        </article>
      ))}
    </section>
  );
}
