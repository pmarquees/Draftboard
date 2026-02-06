"use client";

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import { Lightbox } from "./lightbox";

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  filename: string;
  thumbnailUrl?: string | null;
}

interface MediaLightboxContextValue {
  registerItem: (item: MediaItem) => void;
  unregisterItem: (id: string) => void;
  openAt: (id: string) => void;
}

const MediaLightboxContext = createContext<MediaLightboxContextValue | null>(null);

export function useMediaLightbox() {
  return useContext(MediaLightboxContext);
}

export function MediaLightboxProvider({ children }: { children: ReactNode }) {
  // Use ref to track items to avoid re-renders when items change
  const itemsRef = useRef<MediaItem[]>([]);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    items: MediaItem[];
    currentIndex: number;
  }>({
    isOpen: false,
    items: [],
    currentIndex: 0,
  });

  const registerItem = useCallback((item: MediaItem) => {
    // Don't add if already exists
    if (!itemsRef.current.some((i) => i.id === item.id)) {
      itemsRef.current = [...itemsRef.current, item];
    }
  }, []);

  const unregisterItem = useCallback((id: string) => {
    itemsRef.current = itemsRef.current.filter((i) => i.id !== id);
  }, []);

  const openAt = useCallback((id: string) => {
    const items = itemsRef.current;
    const index = items.findIndex((i) => i.id === id);
    if (index !== -1) {
      setLightboxState({
        isOpen: true,
        items: [...items],
        currentIndex: index,
      });
    }
  }, []);

  const close = useCallback(() => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <MediaLightboxContext.Provider
      value={{
        registerItem,
        unregisterItem,
        openAt,
      }}
    >
      {children}
      <Lightbox
        images={lightboxState.items}
        initialIndex={lightboxState.currentIndex}
        isOpen={lightboxState.isOpen}
        onClose={close}
      />
    </MediaLightboxContext.Provider>
  );
}
