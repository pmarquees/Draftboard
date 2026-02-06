"use client";

import { useEffect } from "react";

export function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure content is rendered
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return null;
}
