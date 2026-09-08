import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Lock,
  Unlock,
  ChevronDown,
  Eye,
  EyeOff,
  Play,
  Shuffle,
  ArrowRight,
  RotateCcw,
  X,
} from "lucide-react";
import SEO from "./SEO";
import "./Playbook.css";

const SESSION_KEY = "playbook.key";
const KNOWN_KEY = "playbook.known";
const PRACTICE_KEY = "playbook.practice";
const TAB_KEY = "playbook.tab";
const LEVELS = ["basic", "intermediate", "advanced"];
const LEVEL_LABEL = { basic: "Basic", intermediate: "Intermediate", advanced: "Advanced" };
const FREQ_LABEL = { top: "Most asked", common: "Common", deep: "Deep-dive" };

const local = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      /* storage unavailable: progress simply is not remembered */
    }
  },
};

const session = {
  get(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (err) {
      return null;
    }
  },
  set(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch (err) {
      /* ignore */
    }
  },
  remove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (err) {
      /* ignore */
    }
  },
};

async function fetchPlaybook(password) {
  const res = await fetch("/api/playbook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (res.status === 401) {
    const err = new Error("Wrong password. Please try again.");
    err.code = 401;
    throw err;
  }
  if (!res.ok) {
    throw new Error("The playbook could not be loaded right now. Please try again in a moment.");
  }
  return res.json();
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function countByLevel(items) {
  const counts = { basic: 0, intermediate: 0, advanced: 0 };
  items.forEach((it) => {
    counts[it.level] = (counts[it.level] || 0) + 1;
  });
  return counts;
}

/* ------------------------------------------------------------------ */
/* Password gate                                                       */
/* ------------------------------------------------------------------ */
function Gate({ onUnlock, error, busy }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className="playbook--gate">
      <form
        className="playbook--gate-card"
        onSubmit={(e) => {
          e.preventDefault();
          if (!busy && value) onUnlock(value);
        }}
      >
        <span className="playbook--gate-icon" aria-hidden="true">
          <Lock size={22} />
        </span>
        <h1 className="playbook--gate-title">Interview Playbook</h1>
        <p className="playbook--gate-text">
          This page is private. Enter the password to open the question bank.
        </p>
        <label className="playbook--gate-field">
          <span className="playbook--sr-only">Password</span>
          <input
            ref={inputRef}
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            aria-invalid={error ? "true" : "false"}
          />
          <button
            type="button"
            className="playbook--gate-eye"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>
        {error && (
          <p className="playbook--gate-error" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="playbook--btn playbook--btn-primary"
          disabled={busy || !value}
        >
          {busy ? "Checking…" : "Unlock"} <Unlock size={16} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Question card                                                       */
/* ------------------------------------------------------------------ */
function QuestionCard({ section, item, practice, open, onToggle, known, onKnown, showDomain }) {
  const expanded = !practice || open;
  const isRapid = section.kind === "rapid";

  return (
    <article
      className={`playbook--q${known ? " is-known" : ""}${expanded ? " is-open" : ""}`}
    >
      <button
        type="button"
        className="playbook--q-head"
        aria-expanded={expanded}
        tabIndex={practice ? 0 : -1}
        onClick={() => practice && onToggle(item.id)}
      >
        <span className="playbook--q-text">
          {showDomain && <span className="playbook--q-dom">{section.label}</span>}
          {item.q}
        </span>
        <span className="playbook--q-chips">
          <span className={`playbook--chip playbook--chip-${item.level}`}>
            {LEVEL_LABEL[item.level]}
          </span>
          {!isRapid && item.f && (
            <span className={`playbook--chip playbook--chip-f-${item.f}`}>
              {FREQ_LABEL[item.f]}
            </span>
          )}
        </span>
        {practice && <ChevronDown size={16} className="playbook--q-chev" aria-hidden="true" />}
      </button>
      {expanded && (
        <div className="playbook--q-body">
          <p className="playbook--q-ans">{item.a}</p>
          {item.me && (
            <div className="playbook--q-me">
              <span>Say it like this</span>
              <p>{item.me}</p>
            </div>
          )}
          <label className="playbook--known">
            <input
              type="checkbox"
              checked={known}
              onChange={(e) => onKnown(item.id, e.target.checked)}
            />
            I can answer this without looking
          </label>
        </div>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Level filter                                                        */
/* ------------------------------------------------------------------ */
function LevelFilter({ counts, level, onChange, total }) {
  return (
    <div className="playbook--levels" role="group" aria-label="Filter by level">
      <button
        type="button"
        className={`playbook--level${level === "all" ? " is-active" : ""}`}
        onClick={() => onChange("all")}
      >
        All <span>{total}</span>
      </button>
      {LEVELS.map((lv) => (
        <button
          key={lv}
          type="button"
          className={`playbook--level playbook--level-${lv}${level === lv ? " is-active" : ""}`}
          onClick={() => onChange(lv)}
          disabled={!counts[lv]}
        >
          {LEVEL_LABEL[lv]} <span>{counts[lv] || 0}</span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main app (after unlock)                                             */
/* ------------------------------------------------------------------ */
function PlaybookApp({ data, onLock }) {
  const sections = data.sections;
  const qaSections = useMemo(() => sections.filter((s) => s.kind !== "rapid"), [sections]);
  const byId = useMemo(() => Object.fromEntries(sections.map((s) => [s.id, s])), [sections]);
  const itemById = useMemo(() => {
    const map = new Map();
    sections.forEach((s) => s.items.forEach((it) => map.set(it.id, { section: s, item: it })));
    return map;
  }, [sections]);
  const standardIds = useMemo(
    () => (data.mockStandard || []).filter((id) => itemById.has(id)),
    [data.mockStandard, itemById]
  );

  const [active, setActive] = useState(() => {
    const saved = local.get(TAB_KEY, sections[0].id);
    return byId[saved] || saved === "mock" ? saved : sections[0].id;
  });
  const [query, setQuery] = useState("");
  const [practice, setPractice] = useState(() => !!local.get(PRACTICE_KEY, false));
  const [level, setLevel] = useState("all");
  const [known, setKnown] = useState(() => new Set(local.get(KNOWN_KEY, [])));
  const [open, setOpen] = useState(() => new Set());
  const [mock, setMock] = useState(null);
  const [tick, setTick] = useState(0);
  const topRef = useRef(null);

  useEffect(() => local.set(TAB_KEY, active), [active]);
  useEffect(() => local.set(PRACTICE_KEY, practice), [practice]);
  useEffect(() => local.set(KNOWN_KEY, Array.from(known)), [known]);

  // one-second clock for the mock timer
  useEffect(() => {
    if (!mock || mock.finished) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [mock]);

  const totalQ = sections.reduce((n, s) => n + s.items.length, 0);
  const knownIn = useCallback(
    (s) => s.items.reduce((n, it) => n + (known.has(it.id) ? 1 : 0), 0),
    [known]
  );

  const scrollTop = useCallback(() => {
    const el = topRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }, []);

  const selectTab = (id) => {
    setActive(id);
    setQuery("");
    setLevel("all");
    if (id !== "mock") setMock(null);
    scrollTop();
  };

  const onTabKey = (e) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const tabs = Array.from(e.currentTarget.querySelectorAll('[role="tab"]'));
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    let n = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % tabs.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = tabs.length - 1;
    tabs[n].focus();
    tabs[n].click();
  };

  const toggleKnown = useCallback((id, value) => {
    setKnown((prev) => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const toggleOpen = useCallback((id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  /* ---------- search ---------- */
  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return null;
    const out = [];
    sections.forEach((s) =>
      s.items.forEach((it) => {
        if (level !== "all" && it.level !== level) return;
        const hay = `${it.q} ${it.a} ${it.me || ""}`.toLowerCase();
        if (hay.includes(q)) out.push({ section: s, item: it });
      })
    );
    return out;
  }, [q, sections, level]);

  /* ---------- mock interview ---------- */
  const startMock = (kind) => {
    const ids =
      kind === "standard"
        ? standardIds
        : qaSections.map((s) => s.items[Math.floor(Math.random() * s.items.length)].id);
    if (!ids.length) return;
    const now = Date.now();
    setMock({ kind, ids, idx: 0, revealed: false, started: now, qStart: now, times: [], finished: false });
    setActive("mock");
    setQuery("");
    scrollTop();
  };
  const revealMock = () => setMock((m) => ({ ...m, revealed: true }));
  const nextMock = () => {
    setMock((m) => {
      const now = Date.now();
      const times = [...m.times, Math.floor((now - m.qStart) / 1000)];
      const idx = m.idx + 1;
      return { ...m, times, idx, revealed: false, qStart: now, finished: idx >= m.ids.length };
    });
    scrollTop();
  };
  const endMock = () => {
    setMock(null);
    setActive(sections[0].id);
    scrollTop();
  };

  const renderCards = (list, showDomain) =>
    list.map(({ section, item }) => (
      <QuestionCard
        key={item.id}
        section={section}
        item={item}
        practice={practice}
        open={open.has(item.id)}
        onToggle={toggleOpen}
        known={known.has(item.id)}
        onKnown={toggleKnown}
        showDomain={showDomain}
      />
    ));

  /* ---------- panels ---------- */
  let panel;
  if (results) {
    const all = sections.flatMap((s) => s.items);
    panel = (
      <>
        <div className="playbook--panel-head">
          <h2>Search results</h2>
          <p>
            {results.length} question{results.length === 1 ? "" : "s"} matching “{query.trim()}”.
          </p>
          <LevelFilter counts={countByLevel(all)} level={level} onChange={setLevel} total={all.length} />
        </div>
        {results.length ? (
          renderCards(results, true)
        ) : (
          <p className="playbook--empty">No matches. Try a shorter word, like “auth” or “cache”.</p>
        )}
      </>
    );
  } else if (active === "mock") {
    panel = (
      <MockPanel
        mock={mock}
        tick={tick}
        itemById={itemById}
        standardCount={standardIds.length}
        domainCount={qaSections.length}
        onStart={startMock}
        onReveal={revealMock}
        onNext={nextMock}
        onEnd={endMock}
      />
    );
  } else {
    const section = byId[active] || sections[0];
    const counts = countByLevel(section.items);
    const ready = knownIn(section);
    const visible = section.items.filter((it) => level === "all" || it.level === level);
    const cards = renderCards(visible.map((item) => ({ section, item })), false);
    panel = (
      <>
        <div className="playbook--panel-head">
          <h2>{section.label}</h2>
          {section.blurb && <p>{section.blurb}</p>}
          <div className="playbook--panel-meta">
            <span className="playbook--pill">{section.items.length} questions</span>
            <span className={`playbook--pill${ready === section.items.length ? " is-ok" : ""}`}>
              {ready} ready
            </span>
            {practice && (
              <span className="playbook--hint">Practice mode: click a question to reveal its answer.</span>
            )}
          </div>
          <LevelFilter counts={counts} level={level} onChange={setLevel} total={section.items.length} />
        </div>
        {section.kind === "rapid" ? <div className="playbook--rapid">{cards}</div> : cards}
        {!visible.length && (
          <p className="playbook--empty">No {LEVEL_LABEL[level]} questions in this domain yet.</p>
        )}
      </>
    );
  }

  return (
    <section className="playbook section" ref={topRef}>
      <div className="playbook--container container">
        <header className="playbook--top">
          <div>
            <h1 className="playbook--title">Interview Playbook</h1>
            <p className="playbook--subtitle">
              {totalQ} questions across {sections.length} domains, from basic to advanced. Tick a question
              once you can answer it without looking.
            </p>
          </div>
          <div className="playbook--tools">
            <label className="playbook--search">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: JWT, useEffect, sharding…"
                aria-label="Search questions"
                autoComplete="off"
              />
              {query && (
                <button type="button" className="playbook--search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </label>
            <button
              type="button"
              className={`playbook--toggle${practice ? " is-on" : ""}`}
              aria-pressed={practice}
              onClick={() => {
                setPractice((p) => !p);
                setOpen(new Set());
              }}
              title="Hide answers until you click a question"
            >
              <span className="playbook--dot" aria-hidden="true" />
              Practice mode
            </button>
            <button type="button" className="playbook--toggle" onClick={onLock} title="Lock the playbook">
              <Lock size={14} aria-hidden="true" />
              Lock
            </button>
          </div>
        </header>

        <div className="playbook--stats" aria-label="Progress">
          <div>
            <b>{sections.length}</b>
            <span>domains</span>
          </div>
          <div>
            <b>{totalQ}</b>
            <span>questions</span>
          </div>
          <div>
            <b className="is-ok">{known.size}</b>
            <span>ready</span>
          </div>
        </div>

        <div className="playbook--layout">
          <nav className="playbook--side" role="tablist" aria-label="Domains" onKeyDown={onTabKey}>
            <span className="playbook--grp">Domains</span>
            {sections.map((s) => {
              const k = knownIn(s);
              const selected = active === s.id && !q;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`playbook--tab${selected ? " is-active" : ""}`}
                  onClick={() => selectTab(s.id)}
                >
                  <span className="playbook--tab-bar" aria-hidden="true" />
                  {s.short}
                  <span className={`playbook--tab-n${k === s.items.length ? " is-done" : ""}`}>
                    {k}/{s.items.length}
                  </span>
                </button>
              );
            })}
            <span className="playbook--grp">Practice</span>
            <button
              type="button"
              role="tab"
              aria-selected={active === "mock" && !q}
              className={`playbook--tab${active === "mock" && !q ? " is-active" : ""}`}
              onClick={() => selectTab("mock")}
            >
              <span className="playbook--tab-bar" aria-hidden="true" />
              Mock interview
              <span className="playbook--tab-n">{standardIds.length} Q</span>
            </button>
          </nav>

          <div className="playbook--content">{panel}</div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mock interview panel                                                */
/* ------------------------------------------------------------------ */
function MockPanel({ mock, tick, itemById, standardCount, domainCount, onStart, onReveal, onNext, onEnd }) {
  if (!mock) {
    return (
      <>
        <div className="playbook--panel-head">
          <h2>Mock interview</h2>
          <p>
            A timed round, one question at a time. Answer out loud before you reveal the model answer, then
            move on. Aim for under two minutes per question.
          </p>
        </div>
        <div className="playbook--mock-start">
          <div className="playbook--card">
            <h3>Standard round</h3>
            <p>
              {standardCount} questions in the order a real full-stack interview usually follows: intro,
              JavaScript, React and Next.js, Node, databases, mobile, AI, system design, stack choices, and
              your questions for them.
            </p>
            <button type="button" className="playbook--btn playbook--btn-primary" onClick={() => onStart("standard")}>
              <Play size={16} aria-hidden="true" /> Start standard round
            </button>
          </div>
          <div className="playbook--card">
            <h3>Random round</h3>
            <p>
              One random question from each of the {domainCount} domains. Different every time, good for a
              quick daily warm-up.
            </p>
            <button type="button" className="playbook--btn" onClick={() => onStart("random")}>
              <Shuffle size={16} aria-hidden="true" /> Start random round
            </button>
          </div>
        </div>
      </>
    );
  }

  if (mock.finished) {
    const total = mock.times.reduce((n, t) => n + t, 0);
    return (
      <div className="playbook--mock">
        <div className="playbook--panel-head">
          <h2>Round complete</h2>
          <p>
            {mock.ids.length} questions in {formatTime(total)}. Review the ones that felt shaky, then run it
            again tomorrow.
          </p>
        </div>
        <ol className="playbook--mock-summary">
          {mock.ids.map((id, i) => {
            const entry = itemById.get(id);
            if (!entry) return null;
            return (
              <li key={id}>
                <b>{entry.item.q}</b>
                <span className="playbook--pill">{entry.section.short}</span>
                <span className="playbook--pill">{formatTime(mock.times[i] || 0)}</span>
              </li>
            );
          })}
        </ol>
        <div className="playbook--mock-actions">
          <button type="button" className="playbook--btn playbook--btn-primary" onClick={() => onStart(mock.kind)}>
            <RotateCcw size={16} aria-hidden="true" /> Run again
          </button>
          <button
            type="button"
            className="playbook--btn"
            onClick={() => onStart(mock.kind === "random" ? "standard" : "random")}
          >
            {mock.kind === "random" ? "Standard round" : "Random round"}
          </button>
          <button type="button" className="playbook--btn" onClick={onEnd}>
            Back to domains
          </button>
        </div>
      </div>
    );
  }

  const entry = itemById.get(mock.ids[mock.idx]);
  if (!entry) return null;
  const { section, item } = entry;
  const elapsed = Math.max(0, Math.floor((Date.now() - mock.qStart) / 1000));
  const pct = Math.round((mock.idx / mock.ids.length) * 100);
  const last = mock.idx + 1 === mock.ids.length;

  return (
    <div className="playbook--mock" data-tick={tick}>
      <div className="playbook--mock-bar">
        <span className="playbook--mock-step">
          Question {mock.idx + 1} of {mock.ids.length}
        </span>
        <span className="playbook--mock-timer">{formatTime(elapsed)}</span>
      </div>
      <div className="playbook--mock-progress" aria-hidden="true">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div className="playbook--mock-dom">
        {section.label} · {LEVEL_LABEL[item.level]}
      </div>
      <h2 className="playbook--mock-q">{item.q}</h2>
      <p className="playbook--mock-note">Answer out loud first. Then reveal and compare.</p>
      {mock.revealed && (
        <div className="playbook--mock-ans">
          <p className="playbook--q-ans">{item.a}</p>
          {item.me && (
            <div className="playbook--q-me">
              <span>Say it like this</span>
              <p>{item.me}</p>
            </div>
          )}
        </div>
      )}
      <div className="playbook--mock-actions">
        {!mock.revealed && (
          <button type="button" className="playbook--btn playbook--btn-primary" onClick={onReveal}>
            <Eye size={16} aria-hidden="true" /> Reveal answer
          </button>
        )}
        <button
          type="button"
          className={`playbook--btn${mock.revealed ? " playbook--btn-primary" : ""}`}
          onClick={onNext}
        >
          {last ? "Finish round" : "Next question"} <ArrowRight size={16} aria-hidden="true" />
        </button>
        <button type="button" className="playbook--btn" onClick={onEnd}>
          End round
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Route component                                                     */
/* ------------------------------------------------------------------ */
const Playbook = () => {
  const [status, setStatus] = useState(() => (session.get(SESSION_KEY) ? "loading" : "locked"));
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const unlock = useCallback(async (password) => {
    setStatus("loading");
    setError("");
    try {
      const payload = await fetchPlaybook(password);
      session.set(SESSION_KEY, password);
      setData(payload);
      setStatus("ready");
    } catch (err) {
      if (err.code === 401) session.remove(SESSION_KEY);
      setError(err.message);
      setStatus("locked");
    }
  }, []);

  // Re-open automatically within the same browser session
  useEffect(() => {
    const saved = session.get(SESSION_KEY);
    if (saved) unlock(saved);
  }, [unlock]);

  const lock = () => {
    session.remove(SESSION_KEY);
    setData(null);
    setError("");
    setStatus("locked");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SEO
        title="Interview Playbook | Wasif Rehman"
        description="Private interview preparation notes."
        path="/playbook"
        noindex={true}
      />
      {status === "ready" && data ? (
        <PlaybookApp data={data} onLock={lock} />
      ) : (
        <section className="playbook section">
          <div className="playbook--container container">
            <Gate onUnlock={unlock} error={error} busy={status === "loading"} />
          </div>
        </section>
      )}
    </>
  );
};

export default Playbook;
