// Free time slots for the "Book a call" event, read from the Calendly API.
// The token stays on the server; the browser only receives start times and per-slot booking links.
const API = 'https://api.calendly.com';
const EVENT_URL = (process.env.CALENDLY_EVENT_URL || 'https://calendly.com/wasifrehman58/new-meeting')
  .replace(/\/+$/, '')
  .toLowerCase();
const DAYS_AHEAD = 14;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

let cachedEventType = null;

async function calendly(path, token) {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`Calendly ${res.status}: ${text.slice(0, 200)}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function findEventType(token) {
  if (cachedEventType) return cachedEventType;
  const me = await calendly('/users/me', token);
  const list = await calendly(`/event_types?user=${encodeURIComponent(me.resource.uri)}&count=100`, token);
  const match = list.collection.find((et) => et.scheduling_url.replace(/\/+$/, '').toLowerCase() === EVENT_URL);
  if (!match) throw Object.assign(new Error(`No event type with link ${EVENT_URL}`), { status: 404 });
  cachedEventType = { uri: match.uri, name: match.name, duration: match.duration };
  return cachedEventType;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.CALENDLY_TOKEN;
  if (!token) {
    // The site falls back to Calendly's own popup when it sees this
    return res.status(503).json({ error: 'Calendly is not configured' });
  }

  try {
    const event = await findEventType(token);

    // Calendly returns at most one week per request, so ask for two weeks in two windows
    const slots = [];
    let start = Date.now() + 2 * 60 * 1000;
    for (let covered = 0; covered < DAYS_AHEAD; covered += 7) {
      const end = start + WEEK_MS - 60 * 1000;
      const page = await calendly(
        `/event_type_available_times?event_type=${encodeURIComponent(event.uri)}` +
          `&start_time=${new Date(start).toISOString()}&end_time=${new Date(end).toISOString()}`,
        token
      );
      for (const slot of page.collection) {
        if (slot.status === 'available') slots.push({ start: slot.start_time, url: slot.scheduling_url });
      }
      start = end;
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({ event: { name: event.name, duration: event.duration }, slots });
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
};
