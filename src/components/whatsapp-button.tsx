"use client";

import { useCallback } from "react";

const whatsappUrl =
  "https://wa.me/447773754121?text=Hello%20ABS%20Properties%2C%20I%27d%20like%20to%20make%20an%20enquiry.";

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

function trackWhatsAppClick() {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.("event", "whatsapp_click", {
    event_category: "contact",
    event_label: "floating_button",
  });

  window.dispatchEvent(
    new CustomEvent("abs:whatsapp-click", {
      detail: { placement: "floating_button" },
    }),
  );
}

export function WhatsAppButton() {
  const handleClick = useCallback(() => {
    trackWhatsAppClick();
  }, []);

  return (
    <a
      className="whatsapp-button"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ABS Properties on WhatsApp"
      onClick={handleClick}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="currentColor"
      >
        <path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.56 0 .25 5.3.25 11.82c0 2.08.54 4.1 1.57 5.88L.15 24l6.44-1.62a11.8 11.8 0 0 0 5.48 1.35h.01c6.51 0 11.82-5.3 11.82-11.82 0-3.16-1.24-6.13-3.4-8.41ZM12.08 21.7h-.01a9.82 9.82 0 0 1-5-1.36l-.36-.21-3.82.96 1.02-3.72-.23-.38a9.84 9.84 0 1 1 8.4 4.71Zm5.4-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.44-1.5a9.1 9.1 0 0 1-1.69-2.1c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
