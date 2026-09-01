'use client';

import { FormEvent, useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';

export default function ContactPage() {
  return (
    <main className="page-content contact-page">
      <header className="page-header">
        <p className="eyebrow">Contact</p>
        <h1>Connect with Southern Kaduna culture</h1>
        <p>Reach out for collaborations, research, or cultural projects.</p>
      </header>

      <ContactSection />
    </main>
  );
}

function ContactSection() {
  const { content } = useSiteContent();

  return (
    <section className="contact-card card">
      <div className="contact-grid">
        <div>
          <h2>Get in touch</h2>
          <>
            <p>Email: {content.contactEmail}</p>
            <p>Phone: {content.contactPhone}</p>
          </>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [isSending, setIsSending] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSending(true); setStatus(null);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: formData.get('name'), email: formData.get('email'), message: formData.get('message') }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to send your message.');
      form.reset(); setStatus({ type: 'success', message: 'Thank you — your message has been sent.' });
    } catch (error) { setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to send your message.' }); } finally { setIsSending(false); }
  };
  return (
          <form className="contact-form-inner" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label"><span className="iconify" data-icon="mdi:account" /> Name</label>
              <input className="input" type="text" name="name" placeholder="Your name" required disabled={isSending} />
            </div>
            <div className="field">
              <label className="label"><span className="iconify" data-icon="mdi:email" /> Email</label>
              <input className="input" type="email" name="email" placeholder="you@example.com" required disabled={isSending} />
            </div>
            <div className="field">
              <label className="label"><span className="iconify" data-icon="mdi:message-text" /> Message</label>
              <textarea className="input" name="message" rows={5} placeholder="Write your message" required disabled={isSending} />
            </div>
            {status && <p role="status" className={`contact-form-status ${status.type}`}>{status.message}</p>}
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="button primary" type="submit" disabled={isSending}><span className="iconify" data-icon="mdi:send" /> {isSending ? 'Sending…' : 'Send'}</button>
              <button className="button secondary" type="reset" disabled={isSending}><span className="iconify" data-icon="mdi:refresh" /> Reset</button>
            </div>
          </form>
  );
}
