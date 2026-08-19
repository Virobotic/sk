import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import defaultGalleryItems from '../data/gallery-items.json';
import defaultContactInfo from '../data/contact-info.json';

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

export type SiteContent = {
  contactEmail: string;
  contactPhone: string;
  galleryItems: GalleryItem[];
};

export const defaultSiteContent: SiteContent = {
  contactEmail: defaultContactInfo.email,
  contactPhone: defaultContactInfo.phone,
  galleryItems: defaultGalleryItems,
};

type SiteContentContextValue = {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  resetContent: () => void;
};

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);
const storageKey = "sk-site-content";

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(defaultSiteContent);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      setContent({ ...defaultSiteContent, ...JSON.parse(saved) });
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, []);

  const updateContent = (newContent: Partial<SiteContent>) => {
    const updatedContent = { ...content, ...newContent };
    setContent(updatedContent);
    localStorage.setItem(storageKey, JSON.stringify(updatedContent));
  };

  const resetContent = () => {
    setContent(defaultSiteContent);
    localStorage.removeItem(storageKey);
  };

  return <SiteContentContext.Provider value={{ content, updateContent, resetContent }}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return context;
}
