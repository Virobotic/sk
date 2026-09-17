import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import languages from "../../data/languages";
import tribes from "../../data/tribes";

const languageSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type ChatMessage = {
  id: number;
  room_slug: string;
  display_name: string;
  message: string;
  created_at: string;
};

export default function LanguageDetailPage() {
  const { slug } = useParams();
  const language = useMemo(() => languages.find((item) => languageSlug(item.name) === slug), [slug]);
  const tribe = useMemo(() => tribes.find((item) => item.language.toLowerCase().includes(language?.name.toLowerCase() ?? "")), [language]);

  if (!language) return <main className="page-content"><header className="page-header"><h1>Language not found.</h1><Link className="button primary" to="/languages">Language directory</Link></header></main>;

  return (
    <main className="language-profile-page page-content">
      <header className="page-header">
        <p className="eyebrow">Language profile</p>
        <h1>{language.name}</h1>
        <p className="language-alias">Also recorded as {language.aliases}</p>
      </header>

      <section className="language-profile-grid">
        <aside className="tribe-facts">
          <p className="section-kicker">At a glance</p>
          <dl>
            <div><dt>Connected places</dt><dd>{language.area}</dd></div>
            <div><dt>Community context</dt><dd>{language.detail}</dd></div>
          </dl>
        </aside>

        <div className="tribe-reading">
          <section>
            <p className="section-kicker">Language and heritage</p>
            <h2>Knowledge carried in speech.</h2>
            <p>Languages are not only a way to communicate. They preserve place names, family histories, songs, ceremonies and ways of interpreting the world. This profile is a starting point and does not replace the authority of speakers and community historians.</p>
          </section>

          <section>
            <h3>Documentation and care</h3>
            <p>Names and spellings may vary between speakers, communities and publications. Use locally preferred forms where possible, ask before recording cultural material, and support community-led teaching and documentation.</p>
          </section>

          {tribe && (
            <section className="related-profile">
              <h3>Explore the related community</h3>
              <p>This language profile connects with the {tribe.name} community profile, which includes sourced historical and cultural reading.</p>
              <Link className="button primary" to={`/tribes/${tribe.slug}`}>Read about {tribe.name}</Link>
            </section>
          )}

          <LanguageChatPanel slug={slug ?? languageSlug(language.name)} languageName={language.name} />
        </div>
      </section>
    </main>
  );
}

function LanguageChatPanel({ slug, languageName }: { slug: string; languageName: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [displayName, setDisplayName] = useState(() => localStorage.getItem("sk-language-chat-name") || "Guest");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chatError, setChatError] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/chat/room/${slug}`);
      if (!response.ok) throw new Error("Unable to load chat messages.");
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error(error);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();

    const socketUrl = window.location.hostname === "localhost" ? "http://localhost:3001" : window.location.origin;
    const socket = io(socketUrl, { transports: ["websocket", "polling"] });
    socketRef.current = socket;

    socket.emit("join-language-room", slug);

    socket.on("language-message", (message: ChatMessage) => {
      setMessages((currentMessages) => {
        if (currentMessages.some((item) => item.id === message.id)) return currentMessages;
        return [...currentMessages, message];
      });
    });

    return () => {
      socket.emit("leave-language-room", slug);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [slug]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedDraft = draft.trim();
    if (!trimmedDraft || isSending) return;

    setIsSending(true);
    setChatError("");
    const name = displayName.trim() || "Guest";
    localStorage.setItem("sk-language-chat-name", name);

    try {
      const response = await fetch(`/api/chat/room/${slug}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: name, message: trimmedDraft })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Unable to send the message.");
      }

      setDraft("");
      await loadMessages();
    } catch (error) {
      console.error(error);
      setChatError(error instanceof Error ? error.message : "Unable to send the message right now.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="language-chat-panel">
      <div className="language-chat-header">
        <div>
          <p className="section-kicker">Community chat</p>
          <h3>{languageName} conversation</h3>
        </div>
        <span className="language-chat-badge">{messages.length} posts</span>
      </div>

      <div className="language-chat-messages" aria-live="polite">
        {isLoading ? (
          <p className="language-chat-empty">Loading messages…</p>
        ) : messages.length === 0 ? (
          <p className="language-chat-empty">No one has posted yet. Start the conversation for {languageName}.</p>
        ) : (
          messages.map((message) => (
            <article key={message.id} className="language-chat-message">
              <div className="language-chat-meta">
                <strong>{message.display_name}</strong>
                <span>{new Date(message.created_at).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span>
              </div>
              <p>{message.message}</p>
            </article>
          ))
        )}
      </div>

      {chatError && <p className="language-chat-error" role="alert">{chatError}</p>}

      <form className="language-chat-form" onSubmit={handleSubmit}>
        <div className="language-chat-name-box">
          <label htmlFor={`chat-name-${slug}`}>Name</label>
          <input id={`chat-name-${slug}`} type="text" value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={40} placeholder="Guest" />
        </div>

        <div className="language-chat-input-row">
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={3} maxLength={1000} placeholder={`Share something in ${languageName}`} required />
          <button type="submit" className="button primary" disabled={isSending || !draft.trim()}>
            {isSending ? "Sending…" : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}
