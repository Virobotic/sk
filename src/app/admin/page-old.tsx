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
          <Icon icon={message.includes('Error') ? 'mdi:alert-circle' : 'mdi:check-circle'} />
          {message}
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-header">
          <div className="admin-profile">
            <div className="admin-avatar">
              <Icon icon="mdi:account-circle" width="48" height="48" />
            </div>
            <h3>Admin Panel</h3>
            <p>Manage Your Site</p>
          </div>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Icon icon="mdi:view-dashboard" />
            <span>Dashboard</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <Icon icon="mdi:phone-in" />
            <span>Contact Info</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <Icon icon="mdi:image-multiple" />
            <span>Gallery</span>
          </button>
        </nav>

        <div className="admin-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <Icon icon="mdi:logout" />
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
                  <div className="card-icon gallery">
                    <Icon icon="mdi:image-multiple" />
                  </div>
                  <div className="card-content">
                    <p className="card-label">Gallery Items</p>
                    <p className="card-value">{galleryItems.length}</p>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-icon contact">
                    <Icon icon="mdi:email" />
                  </div>
                  <div className="card-content">
                    <p className="card-label">Contact Email</p>
                    <p className="card-value">{contact.email.split('@')[0]}</p>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-icon settings">
                    <Icon icon="mdi:cog" />
                  </div>
                  <div className="card-content">
                    <p className="card-label">Last Updated</p>
                    <p className="card-value">Today</p>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-icon status">
                    <Icon icon="mdi:check-circle" />
                  </div>
                  <div className="card-content">
                    <p className="card-label">Status</p>
                    <p className="card-value">Active</p>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <button className="action-btn" onClick={() => setActiveTab('contact')}>
                  <Icon icon="mdi:pencil" />
                  Update Contact
                </button>
                <button className="action-btn" onClick={() => setActiveTab('gallery')}>
                  <Icon icon="mdi:plus" />
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
                      <Icon icon="mdi:email" />
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
                      <Icon icon="mdi:phone" />
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
                    <Icon icon={loading ? 'mdi:loading' : 'mdi:check'} />
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
                          <div className="form-group flex-1">
                            <label>Image Path</label>
                            <input
                              type="text"
                              value={item.image}
                              onChange={(e) => handleGalleryItemChange(index, 'image', e.target.value)}
                              placeholder="/images/..."
                              disabled={loading}
                            />
                          </div>
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeGalleryItem(item.id)}
                            disabled={loading}
                          >
                            <Icon icon="mdi:trash-can" />
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
                      <Icon icon="mdi:plus" />
                      Add Gallery Item
                    </button>
                    <button type="submit" className="submit-btn" disabled={loading}>
                      <Icon icon={loading ? 'mdi:loading' : 'mdi:check'} />
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
