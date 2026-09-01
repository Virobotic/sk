'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSiteContent, type GalleryItem } from '../../context/SiteContentContext';

export default function MuseumGallery() {
  const { content } = useSiteContent();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleItems = content.galleryItems.filter((item) => item.title.toLowerCase().includes(normalizedSearch));
  const selectedIndex = selectedItem ? visibleItems.findIndex((item) => item.id === selectedItem.id) : -1;

  const closeViewer = () => {
    setSelectedItem(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  const openItem = (item: GalleryItem, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setSelectedItem(item);
  };

  const showRelativeItem = (offset: number) => {
    if (selectedIndex < 0 || visibleItems.length < 2) return;
    setSelectedItem(visibleItems[(selectedIndex + offset + visibleItems.length) % visibleItems.length]);
  };

  useEffect(() => {
    if (!selectedItem) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeViewer();
      if (event.key === 'ArrowLeft') showRelativeItem(-1);
      if (event.key === 'ArrowRight') showRelativeItem(1);
    };
    document.body.classList.add('has-image-viewer');
    closeButtonRef.current?.focus();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('has-image-viewer');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedItem, selectedIndex, visibleItems.length]);

  return <>
    <div className="gallery-toolbar">
      <label className="gallery-search"><span className="sr-only">Search the collection</span><input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search the collection" /></label>
      <p aria-live="polite">{visibleItems.length} {visibleItems.length === 1 ? 'image' : 'images'}</p>
      <button type="button" className="gallery-surprise-button" disabled={!visibleItems.length} onClick={(event) => openItem(visibleItems[Math.floor(Math.random() * visibleItems.length)], event.currentTarget)}>Surprise me <span aria-hidden="true">&#10022;</span></button>
    </div>

    {visibleItems.length ? <section className="content-grid gallery-grid responsive-gallery-grid" aria-label="Museum collection">
      {visibleItems.map((item, index) => <article key={item.id} className="card content-card gallery-card gallery-card-interactive" style={{ '--gallery-delay': `${index * 65}ms` } as React.CSSProperties}>
        <button type="button" className="gallery-image-button" onClick={(event) => openItem(item, event.currentTarget)} aria-label={`Open ${item.title} image`}>
          <img src={item.image} alt={item.title} className="card-image" />
          <span className="gallery-card-overlay" aria-hidden="true"><span className="gallery-card-title">{item.title}</span><span className="gallery-card-hint">View image <span>&#8599;</span></span></span>
        </button>
      </article>)}
    </section> : <p className="gallery-empty" role="status">No images match &ldquo;{searchTerm}&rdquo;. Try another search.</p>}

    {selectedItem && createPortal(
      <div className="image-viewer-backdrop" role="presentation" onMouseDown={closeViewer}>
        <div className="image-viewer" role="dialog" aria-modal="true" aria-label={selectedItem.title} onMouseDown={(event) => event.stopPropagation()}>
          <button ref={closeButtonRef} type="button" className="image-viewer-close" onClick={closeViewer} aria-label="Close image viewer">&times;</button>
          <img src={selectedItem.image} alt={selectedItem.title} />
          {visibleItems.length > 1 && <><button type="button" className="image-viewer-navigation image-viewer-previous" onClick={() => showRelativeItem(-1)} aria-label="View previous image">&#8592;</button><button type="button" className="image-viewer-navigation image-viewer-next" onClick={() => showRelativeItem(1)} aria-label="View next image">&#8594;</button></>}
          <div className="image-viewer-caption"><p>{selectedItem.title}</p><span>{selectedIndex + 1} of {visibleItems.length} &middot; Use arrow keys to browse</span></div>
        </div>
      </div>, document.body,
    )}
  </>;
}
