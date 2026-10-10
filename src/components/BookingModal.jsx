import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowLeft, CalendarClock, MessageCircle } from "lucide-react";
import { whatsappLink } from "../data/site";
import Picture from "./Picture";
import { loadAvailability, openCalendly, openFullCalendar, withParams, POPUP_PARAMS } from "../lib/booking";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const dayKeyOf = (iso) => new Date(iso).toLocaleDateString("en-CA"); // YYYY-MM-DD in the visitor's zone
const fmtTime = (iso) => new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
const fmtLong = (iso) =>
  new Date(iso).toLocaleString(undefined, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" });

const MAX_DAYS = 10;

const BookingModal = ({ onClose }) => {
  const [state, setState] = useState({ status: "loading", slots: [] });
  const [dayKey, setDayKey] = useState(null);
  const [slot, setSlot] = useState(null);
  const [step, setStep] = useState("pick");
  const [form, setForm] = useState({ name: "", email: "", project: "" });
  const dialogRef = useRef(null);

  // Load free slots; without a Calendly token, hand over to the full Calendly calendar
  useEffect(() => {
    let alive = true;
    loadAvailability()
      .then((data) => alive && setState({ status: data.slots.length ? "ready" : "empty", slots: data.slots }))
      .catch((err) => {
        if (!alive) return;
        if (err.status === 503) {
          onClose();
          openFullCalendar();
        } else {
          setState({ status: "error", slots: [] });
        }
      });
    return () => {
      alive = false;
    };
  }, [onClose]);

  // Esc closes; the page behind doesn't scroll; focus returns to the button that opened the box
  useEffect(() => {
    const previous = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose]);

  const days = useMemo(() => {
    const map = new Map();
    for (const s of state.slots) {
      const key = dayKeyOf(s.start);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(s);
    }
    return [...map.entries()].slice(0, MAX_DAYS).map(([key, slots]) => ({ key, slots, date: new Date(slots[0].start) }));
  }, [state.slots]);

  const activeDay = days.find((d) => d.key === dayKey) || days[0];

  const pickDay = (key) => {
    setDayKey(key);
    setSlot(null);
  };

  const confirm = (e) => {
    e.preventDefault();
    openCalendly(
      withParams(slot.url, {
        ...POPUP_PARAMS,
        hide_event_type_details: "1",
        name: form.name.trim(),
        email: form.email.trim(),
        a1: form.project.trim(),
      })
    );
    onClose();
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <motion.div
      className="booking-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="booking"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        ref={dialogRef}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="booking--head">
          <Picture base="img/me/avatar" alt="" sizes="48px" width={48} height={48} className="booking--avatar" eager />
          <div>
            <h2 id="booking-title">15-minute project call</h2>
            <p>With Wasif on Google Meet. Free, no obligation.</p>
          </div>
          <button type="button" className="booking--close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        {state.status === "loading" && (
          <div className="booking--body" aria-busy="true" aria-live="polite">
            <p className="booking--label">Finding free times…</p>
            <div className="booking--days">
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className="booking--day booking--skeleton" />
              ))}
            </div>
            <div className="booking--times">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} className="booking--time booking--skeleton" />
              ))}
            </div>
          </div>
        )}

        {(state.status === "error" || state.status === "empty") && (
          <div className="booking--body booking--fallback">
            <p>
              {state.status === "empty"
                ? "There are no free times in the next two weeks."
                : "Free times didn't load just now."}{" "}
              You can still pick a time on the full calendar, or message me directly.
            </p>
            <div className="booking--fallback-actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  onClose();
                  openFullCalendar();
                }}
              >
                <CalendarClock size={18} aria-hidden="true" /> Open the full calendar
              </button>
              <a
                className="btn btn--ghost"
                href={whatsappLink("Hi Wasif, I'd like to book a quick call about a project.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
        )}

        {state.status === "ready" && step === "pick" && (
          <>
            <div className="booking--body">
              <p className="booking--label" id="booking-days-label">Pick a day</p>
              <div className="booking--days" role="group" aria-labelledby="booking-days-label">
                {days.map((d) => {
                  const selected = d.key === activeDay.key;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      className={`booking--day ${selected ? "is-selected" : ""}`}
                      aria-pressed={selected}
                      onClick={() => pickDay(d.key)}
                    >
                      <span className="booking--day-name">{d.date.toLocaleDateString(undefined, { weekday: "short" })}</span>
                      <span className="booking--day-num">{d.date.toLocaleDateString(undefined, { day: "numeric" })}</span>
                      <span className="booking--day-month">{d.date.toLocaleDateString(undefined, { month: "short" })}</span>
                    </button>
                  );
                })}
              </div>

              <p className="booking--label" id="booking-times-label">
                Pick a time <span>shown in your time zone ({timeZone.replace(/_/g, " ")})</span>
              </p>
              <div className="booking--times" role="group" aria-labelledby="booking-times-label">
                {activeDay.slots.map((s) => {
                  const selected = slot?.start === s.start;
                  return (
                    <button
                      key={s.start}
                      type="button"
                      className={`booking--time ${selected ? "is-selected" : ""}`}
                      aria-pressed={selected}
                      onClick={() => setSlot(s)}
                    >
                      {fmtTime(s.start)}
                    </button>
                  );
                })}
              </div>
            </div>

            <footer className="booking--foot">
              <p>{slot ? fmtLong(slot.start) : "Choose a time to continue"}</p>
              <button type="button" className="btn btn--primary" disabled={!slot} onClick={() => setStep("details")}>
                Continue
              </button>
            </footer>
          </>
        )}

        {state.status === "ready" && step === "details" && slot && (
          <form className="booking--body booking--form" onSubmit={confirm}>
            <button type="button" className="booking--back" onClick={() => setStep("pick")}>
              <ArrowLeft size={16} aria-hidden="true" /> Change time
            </button>
            <p className="booking--chosen">
              <CalendarClock size={18} aria-hidden="true" /> {fmtLong(slot.start)}
            </p>

            <label className="connect--field">
              <span>Your name</span>
              <input type="text" required autoComplete="name" {...field("name")} />
            </label>
            <label className="connect--field">
              <span>Email</span>
              <input type="email" required autoComplete="email" {...field("email")} />
            </label>
            <label className="connect--field">
              <span>What are you building?</span>
              <textarea rows={3} placeholder="A sentence or two is plenty" {...field("project")} />
            </label>

            <button type="submit" className="btn btn--primary booking--submit">
              Confirm my call
            </button>
            <p className="booking--fine">Calendly opens with your details filled in. Press "Schedule Event" there to finish.</p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;
