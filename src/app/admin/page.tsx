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
  const [activeTab, setActiveTab] = useState<'overview' | 'contact' | 'gallery'>('overview');
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const error = await updateContent({ contactEmail: contact.email, contactPhone: contact.phone });
    setLoading(false);
    setMessage(error ? `Error: ${error}` : 'Contact information updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleGallerySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const error = await updateContent({ galleryItems });
    setLoading(false);
    setMessage(error ? `Error: ${error}` : 'Gallery items updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleGalleryItemChange = (index: number, field: keyof GalleryItem, value: string | number) => {
    const newItems = [...galleryItems];
    (newItems[index] as any)[field] = value;
    setGalleryItems(newItems);
  };

  const handleImageUpload = async (index: number, file: File | null) => {
    if (!file) return;

    try {
      const reader = new FileReader();
      const result = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result);
          else reject(new Error('Unable to read file'));
        };
        reader.onerror = () => reject(new Error('Unable to read file'));
        reader.readAsDataURL(file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: result, fileName: file.name })
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || 'Image upload failed.');
        return;
      }

      handleGalleryItemChange(index, 'image', data.url);
      setMessage('Image uploaded successfully!');
      setTimeout(() => setMessage(''), 2500);
    } catch (error) {
      setMessage('Image upload failed.');
      setTimeout(() => setMessage(''), 2500);
    }
  };

  const removeGalleryItem = (id: number) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
  };

  const addGalleryItem = () => {
    const newId = galleryItems.length > 0 ? Math.max(...galleryItems.map(item => item.id)) + 1 : 1;
    setGalleryItems([...galleryItems, { id: newId, title: 'New Item', image: '/images/placeholder.png' }]);
  };

  return (
    <div className="admin-container">
      {message && (
        <div className={`admin-toast ${message.includes('Error') ? 'error' : 'success'}`}>
          <span>{message}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-header">
          <div className="admin-profile">
            <div className="admin-avatar" aria-hidden="true">A</div>
            <h3>Admin Panel</h3>
            <p>Manage Your Site</p>
          </div>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span>Dashboard</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <span>Contact Info</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <span>Gallery</span>
          </button>
        </nav>

        <div className="admin-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-background">
          <div className="admin-bg-overlay"></div>
          <img 
            src="/images/waterfallBig.jfif" 
            alt="background" 
            className="admin-bg-image"
          />
        </div>

        <div className="admin-content">
          {/* Dashboard Overview */}
          {activeTab === 'overview' && (
            <div className="admin-section">
              <div className="section-header">
                <h1>Dashboard</h1>
                <p>Welcome back to your admin panel</p>
              </div>

              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <div className="card-content">
                    <p className="card-label">Gallery Items</p>
                    <p className="card-value">{galleryItems.length}</p>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-content">
                    <p className="card-label">Contact Email</p>
                    <p className="card-value">{contact.email.split('@')[0]}</p>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-content">
                    <p className="card-label">Last Updated</p>
                    <p className="card-value">Today</p>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-content">
                    <p className="card-label">Status</p>
                    <p className="card-value">Active</p>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <button className="action-btn" onClick={() => setActiveTab('contact')}>
                  Update Contact
                </button>
                <button className="action-btn" onClick={() => setActiveTab('gallery')}>
                  Add Gallery Item
                </button>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {activeTab === 'contact' && (
            <div className="admin-section">
              <div className="section-header">
                <h1>Contact Information</h1>
                <p>Update your contact details</p>
              </div>

              <div className="form-card">
                <form onSubmit={handleContactSubmit} className="admin-form">
                  <div className="form-group">
                    <label>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Information'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Gallery Management */}
          {activeTab === 'gallery' && (
            <div className="admin-section">
              <div className="section-header">
                <h1>Gallery Management</h1>
                <p>Manage your gallery items</p>
              </div>

              <div className="form-card">
                <form onSubmit={handleGallerySubmit} className="admin-form">
                  <div className="gallery-items-list">
                    {galleryItems.map((item, index) => (
                      <div key={item.id} className="gallery-item-edit">
                        <div className="form-row">
                          <div className="form-group flex-1">
                            <label>Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleGalleryItemChange(index, 'title', e.target.value)}
                              placeholder="Item title"
                              disabled={loading}
                            />
                          </div>
                          <div className="form-group flex-1 image-upload-group">
                            <label>Image</label>
                            <div className="image-upload-box">
                              {item.image ? (
                                <img src={item.image} alt={item.title || 'Gallery item'} className="gallery-upload-preview" />
                              ) : (
                                <div className="image-upload-placeholder" aria-label="No image selected">
                                  No image
                                </div>
                              )}
                              <label className="upload-button">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(index, e.target.files?.[0] || null)}
                                  disabled={loading}
                                />
                                Upload image
                              </label>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeGalleryItem(item.id)}
                            disabled={loading}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="add-btn"
                      onClick={addGalleryItem}
                      disabled={loading}
                    >
                      Add Gallery Item
                    </button>
                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? 'Updating...' : 'Update Gallery'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
