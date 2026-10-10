// Shared booking helpers: Calendly's popup script, the free-slot feed, and the event that opens the booking box.
import { CALENDLY_URL } from "../data/site";

const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";

// Hide Calendly's cookie banner and match the site colours (colours apply on plans that support them).
export const POPUP_PARAMS = {
  hide_gdpr_banner: "1",
  background_color: "111015",
  text_color: "f2f0f6",
  primary_color: "8d4cf6",
};

export const withParams = (url, params) => {
  const u = new URL(url);
  Object.entries(params).forEach(([k, v]) => v && u.searchParams.set(k, v));
  // URLSearchParams writes spaces as "+", which Calendly can show literally in prefilled names
  u.search = u.search.replace(/\+/g, "%20");
  return u.toString();
};

let calendlyReady;
export const loadCalendly = () => {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (!calendlyReady) {
    calendlyReady = new Promise((resolve, reject) => {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = CALENDLY_CSS;
      document.head.appendChild(css);

      const script = document.createElement("script");
      script.src = CALENDLY_JS;
      script.async = true;
      script.onload = () => (window.Calendly ? resolve(window.Calendly) : reject(new Error("Calendly missing")));
      script.onerror = () => {
        calendlyReady = null;
        reject(new Error("Calendly failed to load"));
      };
      document.body.appendChild(script);
    });
  }
  return calendlyReady;
};

// Open a Calendly page as a popup; if the script is blocked, open it in a new tab instead.
export const openCalendly = (url) =>
  loadCalendly()
    .then((Calendly) => Calendly.initPopupWidget({ url }))
    .catch(() => window.open(url, "_blank", "noopener"));

export const openFullCalendar = () => openCalendly(withParams(CALENDLY_URL, POPUP_PARAMS));

// Free slots from /api/availability, cached for two minutes. Rejects with err.status === 503
// when the Calendly token isn't set up, so callers can fall back to the full calendar.
const FRESH_MS = 2 * 60 * 1000;
let slotsCache = null;
export const loadAvailability = () => {
  if (slotsCache && Date.now() - slotsCache.at < FRESH_MS) return slotsCache.promise;
  const promise = fetch("/api/availability").then(async (res) => {
    if (!res.ok) throw Object.assign(new Error("Availability unavailable"), { status: res.status });
    return res.json();
  });
  slotsCache = { at: Date.now(), promise };
  promise.catch((err) => {
    // Keep a "not configured" answer cached; retry anything else on the next call
    if (err.status !== 503) slotsCache = null;
  });
  return promise;
};

export const OPEN_BOOKING_EVENT = "booking:open";
export const openBooking = () => window.dispatchEvent(new Event(OPEN_BOOKING_EVENT));
