export default function ContactPage() {
  return (
    <main className="page-content contact-page">
      <header className="page-header">
        <p className="eyebrow">Contact</p>
        <h1>Connect with Southern Kaduna culture</h1>
        <p>Reach out for collaborations, research, or cultural projects.</p>
      </header>

      <section className="contact-card card">
        <div className="contact-grid">
          <div>
            <h2>Get in touch</h2>
            <p>Email: info@southernkaduna.example</p>
            <p>Phone: +234 800 123 4567</p>
          </div>

          <form className="contact-form-inner" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label className="label"><span className="iconify" data-icon="mdi:account" /> Name</label>
              <input className="input" type="text" name="name" placeholder="Your name" />
            </div>
            <div className="field">
              <label className="label"><span className="iconify" data-icon="mdi:email" /> Email</label>
              <input className="input" type="email" name="email" placeholder="you@example.com" />
            </div>
            <div className="field">
              <label className="label"><span className="iconify" data-icon="mdi:message-text" /> Message</label>
              <textarea className="input" name="message" rows={5} placeholder="Write your message" />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="button primary" type="submit"><span className="iconify" data-icon="mdi:send" /> Send</button>
              <button className="button secondary" type="reset"><span className="iconify" data-icon="mdi:refresh" /> Reset</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
