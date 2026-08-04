const languages = [
  {
    name: "Bajju",
    detail: "The Bajju people speak a vibrant language in the Kachia area and are known for textile art."
  },
  {
    name: "Atyap",
    detail: "Spoken around Zangon Kataf and Kafanchan, Atyap is central to local ceremonies and storytelling."
  },
  {
    name: "Tuk-Ham",
    detail: "The Ham language is used by communities near Jaba and reflects a strong oral tradition."
  },
  {
    name: "Irigwe",
    detail: "Irigwe is spoken around Kafanchan and is an important part of local identity and song."
  }
];

export default function LanguageExplorer() {
  return (
    <article className="card languages-card">
      <h3>Language Explorer</h3>
      <p>Discover languages that carry song, tradition, and local history.</p>
      <div className="language-list">
        {languages.map((language) => (
          <article key={language.name} className="language-item">
            <strong>{language.name}</strong>
            <p>{language.detail}</p>
          </article>
        ))}
      </div>
    </article>
  );
}
