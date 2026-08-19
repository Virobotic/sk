import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import defaultGalleryItems from "../data/gallery-items.json";
import defaultContactInfo from "../data/contact-info.json";

export interface GalleryItem { id: number; title: string; image: string; }
export type SiteContent = { contactEmail: string; contactPhone: string; galleryItems: GalleryItem[]; };
export const defaultSiteContent: SiteContent = { contactEmail: defaultContactInfo.email, contactPhone: defaultContactInfo.phone, galleryItems: defaultGalleryItems };
type SiteContentContextValue = { content: SiteContent; isLoading: boolean; updateContent: (changes: Partial<SiteContent>) => Promise<string | null>; };
const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("/api/content")
      .then(async (response) => { if (!response.ok) return; const data = await response.json(); if (data.content) setContent({ ...defaultSiteContent, ...data.content }); })
      .finally(() => setIsLoading(false));
  }, []);
  const updateContent = async (changes: Partial<SiteContent>) => {
    const nextContent = { ...content, ...changes };
    try {
      const response = await fetch("/api/content", { method: "PUT", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: nextContent }) });
      if (!response.ok) return (await response.json().catch(() => ({}))).error || "Unable to save content.";
      setContent(nextContent);
      return null;
    } catch { return "The server is unavailable. Content was not saved."; }
  };
  return <SiteContentContext.Provider value={{ content, isLoading, updateContent }}>{children}</SiteContentContext.Provider>;
}
export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return context;
}
