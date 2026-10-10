import React from "react";
import { BOOK_CALL_HREF, CALENDLY_URL } from "../data/site";
import { loadAvailability, loadCalendly, openBooking } from "../lib/booking";

// A "Book a call" link that opens the on-site booking box (see BookingModal).
// Hovering or focusing it starts loading free slots and Calendly's script, so the box opens ready.
// Without a Calendly link it simply opens BOOK_CALL_HREF (WhatsApp) in a new tab.
const BookCallLink = ({ className, children, onClick }) => {
  const warmUp = () => {
    if (!CALENDLY_URL) return;
    loadAvailability().catch(() => {});
    loadCalendly().catch(() => {});
  };

  const open = (e) => {
    onClick?.(e);
    if (!CALENDLY_URL) return;
    e.preventDefault();
    openBooking();
  };

  return (
    <a
      href={BOOK_CALL_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={open}
      onMouseEnter={warmUp}
      onFocus={warmUp}
    >
      {children}
    </a>
  );
};

export default BookCallLink;
