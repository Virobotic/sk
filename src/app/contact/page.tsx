export default function ContactPage() {
  return (
    <main className="page-content contact-page">
      <header className="page-header">
        <p className="eyebrow">Contact</p>
        <h1>Connect with the project</h1>
        <p>Use this space for collaborations, research, event planning, or general cultural enquiries.</p>
      </header>

      <section className="contact-card card">
        <div className="contact-grid">
          <aside className="stack">
            <h2>Get in touch</h2>
            <p>
              Email: info@southernkaduna.example
              <br />
              Phone: +234 800 123 4567
            </p>

            <div className="contact-methods">
              <div>
                <span>Email</span>
                <strong>info@southernkaduna.example</strong>
                <p>Best for partnerships, publishing, and research requests.</p>
              </div>
              <div>
                <span>Phone</span>
                <strong>+234 800 123 4567</strong>
                <p>Use this for direct inquiries and coordination.</p>
              </div>
            </div>
          </aside>

          <form className="contact-form-inner" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label className="label" htmlFor="name">Name</label>
              <input className="input" id="name" type="text" name="name" placeholder="Your name" />
            </div>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <input className="input" id="email" type="email" name="email" placeholder="you@example.com" />
            </div>
            <div className="field">
              <label className="label" htmlFor="message">Message</label>
              <textarea className="input" id="message" name="message" rows={6} placeholder="Write your message" />
            </div>
            <div className="contact-actions">
              <button className="button primary" type="submit">Send message</button>
              <button className="button secondary" type="reset">Clear form</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
