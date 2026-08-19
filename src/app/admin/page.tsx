'use client';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import React, { useState, FormEvent } from 'react';
import { useSiteContent, type GalleryItem } from '../../context/SiteContentContext';

export default function AdminPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { content, updateContent } = useSiteContent();
  const [contact, setContact] = useState({ email: content.contactEmail, phone: content.contactPhone });
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(content.galleryItems);
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = await updateContent({ contactEmail: contact.email, contactPhone: contact.phone });
    setMessage(error ?? 'Contact information updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleGallerySubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = await updateContent({ galleryItems });
    setMessage(error ?? 'Gallery items updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleGalleryItemChange = (index: number, field: keyof GalleryItem, value: string | number) => {
    const newItems = [...galleryItems];
    (newItems[index] as any)[field] = value;
    setGalleryItems(newItems);
  };

  const removeGalleryItem = (id: number) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
  };

  const addGalleryItem = () => {
    const newId = galleryItems.length > 0 ? Math.max(...galleryItems.map(item => item.id)) + 1 : 1;
    setGalleryItems([...galleryItems, { id: newId, title: 'New Item', image: '/images/placeholder.png' }]);
  };

  return (
    <main className="page-content contact-page">
      {message && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          background: 'green', color: 'white', padding: '10px 20px', borderRadius: '5px', zIndex: 1000
        }}>
          {message}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <button onClick={handleLogout} className="button secondary">
          Logout
        </button>
      </div>

      <header className="page-header">
        <h1>Admin Dashboard</h1>
      </header>

      <section className="contact-card card">
        <h2>Update Contact Information</h2>
        <form className="contact-form-inner" onSubmit={handleContactSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required />
          </div>
          <div className="field">
            <label className="label">Phone</label>
            <input className="input" type="text" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} required />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="button primary" type="submit">
              Update Information
            </button>
          </div>
        </form>
      </section>

      <section className="contact-card card" style={{ marginTop: '2rem' }}>
        <h2>Update Gallery Items</h2>
        <form className="contact-form-inner" onSubmit={handleGallerySubmit}>
          {galleryItems.map((item, index) => (
            <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <div className="field" style={{ flex: 1 }}>
                <label className="label">Title</label>
                <input className="input" type="text" value={item.title} onChange={(e) => handleGalleryItemChange(index, 'title', e.target.value)} />
              </div>
              <div className="field" style={{ flex: 1 }}>
                <label className="label">Image Path</label>
                <input className="input" type="text" value={item.image} onChange={(e) => handleGalleryItemChange(index, 'image', e.target.value)} />
              </div>
              <button type="button" className="button secondary" onClick={() => removeGalleryItem(item.id)} style={{ alignSelf: 'flex-end', marginBottom: '1rem' }}>
                Remove
              </button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: '1rem' }}>
            <button type="button" className="button" onClick={addGalleryItem}>
              Add Item
            </button>
            <button className="button primary" type="submit">
              Update Gallery
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
