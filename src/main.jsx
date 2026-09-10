import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bathtub,
  Buildings,
  CalendarBlank,
  ChartLineUp,
  Check,
  CirclesFour,
  Clock,
  Compass,
  EnvelopeSimple,
  Eye,
  FacebookLogo,
  Heart,
  House,
  InstagramLogo,
  List,
  MapPin,
  Minus,
  MagnifyingGlass,
  Phone,
  Plus,
  ShareNetwork,
  SlidersHorizontal,
  SwimmingPool,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import {
  agencies,
  developments,
  enquiries as seedEnquiries,
  properties,
  regions,
} from "./data";
import newsSnapshot from "./scraped-news.json";
import { translateDocument } from "./i18n";
import "./styles.css";
import "./advanced.css";
import "./refresh.css";
import "./directory-more.css";
import "./review-fixes.css";

const euro = (n) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
const short = (n) =>
  n >= 1e6
    ? `€${(n / 1e6).toFixed(n % 1e6 ? 1 : 0)}m`
    : `€${Math.round(n / 1000)}k`;
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
const nav = [
  ["Buy", "/properties"],
  ["New Developments", "/developments"],
  ["Explore Portugal", "/#destinations"],
  ["Agencies", "/agencies"],
  ["News", "/news"],
  ["Notary and legal support", "/legal-support"],
  ["Mortgage simulator", "/mortgage"],
  ["Private seller", "/private-seller"],
];
const go = (p) => {
  history.pushState({}, "", p);
  window.dispatchEvent(new PopStateEvent("popstate"));
  scrollTo({ top: 0, behavior: "smooth" });
};
function Link({ to, children, className = "", onClick, ...anchorProps }) {
  return (
    <a
      href={to}
      className={className}
      {...anchorProps}
      onClick={(e) => {
        if (to.startsWith("/")) {
          e.preventDefault();
          go(to);
        }
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? "light" : ""}`}>
      <span className="logo-mark">P</span>
      <span>
        Properties
        <br />
        <b>in Portugal</b>
      </span>
    </Link>
  );
}
function TranslationWidget() {
  const [locale, setLocale] = useState(() => {
    try {
      return localStorage.getItem("pip-locale") === "pt" ? "pt" : "en";
    } catch {
      return "en";
    }
  });
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-PT" : "en";
    translateDocument(locale);
    const onRouteChange = () => requestAnimationFrame(() => translateDocument(locale));
    const observer = new MutationObserver(() => {
      if (locale === "pt") requestAnimationFrame(() => translateDocument(locale));
    });
    window.addEventListener("popstate", onRouteChange);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      window.removeEventListener("popstate", onRouteChange);
      observer.disconnect();
    };
  }, [locale]);
  const choose = (next) => {
    try {
      localStorage.setItem("pip-locale", next);
    } catch {
      // Translation still works for the current session if storage is unavailable.
    }
    setLocale(next);
  };
  return (
    <div className="language-widget" role="group" aria-label={locale === "pt" ? "Idioma do site" : "Site language"}>
      <button type="button" className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} onClick={() => choose("en")}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" className={locale === "pt" ? "active" : ""} aria-pressed={locale === "pt"} onClick={() => choose("pt")}>PT</button>
    </div>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="shell nav">
        <Logo />
        <nav>
          {nav.map(([n, p]) => (
            <Link key={n} to={p}>
              {n}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <TranslationWidget />
          <Link to="/account/favourites">
            <Heart /> Saved
          </Link>
          <Link to="/agency" className="button small dark">
            Agency portal <ArrowUpRight />
          </Link>
        </div>
        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          {open ? <X /> : <List />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="mobile-nav"
          >
            {nav.map(([n, p]) => (
              <Link key={n} to={p} onClick={() => setOpen(false)}>
                {n}
              </Link>
            ))}
            <TranslationWidget />
            <Link to="/agency">Agency portal</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div className="shell footer-grid">
        <div>
          <Logo light />
          <p>
            Exceptional homes, local expertise and clear guidance for your move
            to Portugal.
          </p>
        </div>
        <div>
          <h4>Discover</h4>
          <Link to="/properties">Properties</Link>
          <Link to="/developments">New developments</Link>
          <Link to="/agencies">Agencies</Link>
          <Link to="/news">Property news</Link>
        </div>
        <div>
          <h4>Buyer services</h4>
          <Link to="/mortgage">Mortgage simulator</Link>
          <Link to="/legal-support">Notary and legal support</Link>
          <Link to="/private-seller">Private seller</Link>
        </div>
        <div>
          <h4>Follow</h4>
          <span className="socials">
            <InstagramLogo />
            <FacebookLogo />
          </span>
          <p className="tiny">
            Prototype experience. Listings and analytics shown are seeded demo
            data.
          </p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Properties in Portugal</span>
        <span>Privacy · Cookies · Terms</span>
      </div>
    </footer>
  );
}
function Shell({ children }) {
  return (
    <>
      <Header />
      <PageTransition key={location.pathname}>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </>
  );
}
function PageTransition({ children }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      key={location.pathname + location.search}
      className="route-content"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}
const filterParamKeys = {
  location: "location",
  type: "type",
  min: "minPrice",
  max: "maxPrice",
  beds: "beds",
  baths: "baths",
  area: "minArea",
  feature: "feature",
  source: "source",
};
const emptyFilters = {
  location: "",
  type: "",
  min: "",
  max: "",
  beds: "",
  baths: "",
  area: "",
  feature: "",
  source: "",
};
const propertyTypes = [
  "Villa",
  "Apartment",
  "House",
  "Townhouse",
  "Land",
  "Commercial",
  "Farm",
];
const availableRegions = [...new Set(properties.map((p) => p.region))].sort();
const propertySearchPath = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filterParamKeys).forEach(([key, param]) => {
    if (filters[key]) params.set(param, filters[key]);
  });
  return `/properties${params.toString() ? `?${params}` : ""}`;
};

const HomeSearchOptions = {
  location: [
    { label: "All Portugal", value: "" },
    ...availableRegions.map((name) => ({ label: name, value: name })),
  ],
  type: [
    { label: "Any property", value: "" },
    ...propertyTypes.map((x) => ({ label: x, value: x })),
  ],
  min: [
    { label: "No minimum", value: "" },
    { label: "From €100k", value: "100000" },
    { label: "From €250k", value: "250000" },
    { label: "From €500k", value: "500000" },
    { label: "From €750k", value: "750000" },
    { label: "From €1m", value: "1000000" },
  ],
  max: [
    { label: "No maximum", value: "" },
    { label: "Up to €250k", value: "250000" },
    { label: "Up to €500k", value: "500000" },
    { label: "Up to €750k", value: "750000" },
    { label: "Up to €1m", value: "1000000" },
    { label: "Up to €1.5m", value: "1500000" },
    { label: "Up to €2m", value: "2000000" },
  ],
  beds: [
    { label: "Any bedrooms", value: "" },
    { label: "1+ bedrooms", value: "1" },
    { label: "2+ bedrooms", value: "2" },
    { label: "3+ bedrooms", value: "3" },
    { label: "4+ bedrooms", value: "4" },
    { label: "5+ bedrooms", value: "5" },
  ],
  baths: [
    { label: "Any bathrooms", value: "" },
    { label: "1+ bathrooms", value: "1" },
    { label: "2+ bathrooms", value: "2" },
    { label: "3+ bathrooms", value: "3" },
    { label: "4+ bathrooms", value: "4" },
  ],
  area: [
    { label: "Any size", value: "" },
    { label: "75+ m²", value: "75" },
    { label: "100+ m²", value: "100" },
    { label: "150+ m²", value: "150" },
    { label: "250+ m²", value: "250" },
  ],
  feature: [
    { label: "Any feature", value: "" },
    ...[
      "Swimming Pool",
      "Sea View",
      "Garden",
      "Garage",
      "Terrace",
      "New Build",
      "Golf",
      "Reduced Price",
    ].map((value) => ({ label: value, value })),
  ],
  source: [
    { label: "All listings", value: "" },
    { label: "Source catalogue", value: "scraped" },
    { label: "Curated showcase", value: "curated" },
  ],
};

function LeadPrompt({ filters, destination, onClose }) {
  const dialogRef = useRef(null);
  const [brief, setBrief] = useState("");
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
        go(destination);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  const continueToResults = () => {
    onClose();
    go(destination);
  };
  const saveBrief = (event) => {
    event.preventDefault();
    const savedEnquiries = JSON.parse(localStorage.getItem("pip-enquiries") || "[]");
    localStorage.setItem(
      "pip-enquiries",
      JSON.stringify([
        ...savedEnquiries,
        {
          id: `search-${Date.now()}`,
          type: "property-search",
          subject: "Property search brief",
          brief: brief.trim(),
          filters,
          query: destination,
          date: new Date().toISOString(),
        },
      ]),
    );
    continueToResults();
  };

  return (
    <div
      className="lead-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) continueToResults();
      }}
    >
      <section
        className="lead-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-prompt-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button className="lead-close" type="button" onClick={continueToResults} aria-label="Close and view results">
          <X />
        </button>
        <div className="lead-kicker"><EnvelopeSimple /> A BETTER BRIEF, IF YOU WANT IT</div>
        <h2 id="lead-prompt-title">Tell us what would make this search feel like yours.</h2>
        <p className="lead-dialog-intro">
          Add a few words about the home, lifestyle or must-haves you have in mind. It helps a local property professional sharpen the next suggestions.
        </p>
        <form onSubmit={saveBrief} className="lead-form">
          <label htmlFor="property-brief">What are you looking for?</label>
          <textarea
            id="property-brief"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            placeholder="For example: a quiet two-bedroom apartment near the coast, with outdoor space for morning coffee."
            rows="5"
            required
          />
          <button className="button dark lead-submit" type="submit">
            Save my brief & continue <ArrowRight />
          </button>
        </form>
        <button className="lead-skip" type="button" onClick={continueToResults}>
          Continue without sharing <ArrowRight />
        </button>
        <small>Your note stays in this demo browser and is saved with your chosen filters.</small>
      </section>
    </div>
  );
}

function HomeSearch() {
  const [filters, setFilters] = useState(emptyFilters);
  const [prompt, setPrompt] = useState(null);
  const update = (key, value) => {
    setFilters((current) => {
      const next = { ...current, [key]: value };
      if (key === "min" && value && next.max && +value > +next.max) next.max = "";
      if (key === "max" && value && next.min && +value < +next.min) next.min = "";
      return next;
    });
  };
  const apply = (event) => {
    event.preventDefault();
    const destination = propertySearchPath(filters);
    setPrompt({ filters: { ...filters }, destination });
  };
  return (
    <>
      <form className="home-search" onSubmit={apply}>
        <div className="home-search-head">
          <div>
            <span className="home-search-label">START WITH THE DETAILS</span>
            <strong>Shape your search.</strong>
          </div>
          <span className="home-search-count">9 ways to narrow it down</span>
        </div>
        <div className="home-search-grid">
          <label className="home-search-field location-field">
            <span>Location / region</span>
            <FilterSelect value={filters.location} label="All Portugal" onChange={(value) => update("location", value)} options={HomeSearchOptions.location} />
          </label>
          <label className="home-search-field">
            <span>Property type</span>
            <FilterSelect value={filters.type} label="Any property" onChange={(value) => update("type", value)} options={HomeSearchOptions.type} />
          </label>
          <label className="home-search-field">
            <span>Minimum price</span>
            <FilterSelect value={filters.min} label="No minimum" onChange={(value) => update("min", value)} options={HomeSearchOptions.min} />
          </label>
          <label className="home-search-field">
            <span>Maximum price</span>
            <FilterSelect value={filters.max} label="No maximum" onChange={(value) => update("max", value)} options={HomeSearchOptions.max} />
          </label>
          <label className="home-search-field">
            <span>Bedrooms</span>
            <FilterSelect value={filters.beds} label="Any bedrooms" onChange={(value) => update("beds", value)} options={HomeSearchOptions.beds} />
          </label>
          <label className="home-search-field">
            <span>Bathrooms</span>
            <FilterSelect value={filters.baths} label="Any bathrooms" onChange={(value) => update("baths", value)} options={HomeSearchOptions.baths} />
          </label>
          <label className="home-search-field">
            <span>Minimum interior area</span>
            <FilterSelect value={filters.area} label="Any size" onChange={(value) => update("area", value)} options={HomeSearchOptions.area} />
          </label>
          <label className="home-search-field">
            <span>Key feature</span>
            <FilterSelect value={filters.feature} label="Any feature" onChange={(value) => update("feature", value)} options={HomeSearchOptions.feature} />
          </label>
          <label className="home-search-field">
            <span>Listing source</span>
            <FilterSelect value={filters.source} label="All listings" onChange={(value) => update("source", value)} options={HomeSearchOptions.source} />
          </label>
          <div className="home-search-actions">
            <button className="home-search-submit" type="submit">
              <MagnifyingGlass /> <span>Apply search</span>
            </button>
          </div>
        </div>
      </form>
      {prompt ? <LeadPrompt filters={prompt.filters} destination={prompt.destination} onClose={() => setPrompt(null)} /> : null}
    </>
  );
}
function PropertyCard({ p, favs, setFavs }) {
  const saved = favs.includes(p.id);
  return (
    <article className="property-card">
      <div className="card-image" onClick={() => go(`/properties/${p.slug}`)}>
        <img
          src={p.image}
          alt={`${p.title} in ${p.city}`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        {p.status !== "Live" && (
          <span className="status image-status">{p.status}</span>
        )}
        <button
          className={`save ${saved ? "saved" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setFavs(saved ? favs.filter((x) => x !== p.id) : [...favs, p.id]);
          }}
          aria-label={saved ? "Remove from saved" : "Save property"}
        >
          <Heart weight={saved ? "fill" : "regular"} />
        </button>
      </div>
      <div className="card-copy" onClick={() => go(`/properties/${p.slug}`)}>
        <div className="price">{euro(p.price)}</div>
        <h3>{p.title}</h3>
        <p>
          <MapPin /> {p.city}, {p.region}
        </p>
        <div className="specs">
          {p.beds ? <span>{p.beds} beds</span> : null}
          {p.baths ? <span>{p.baths} baths</span> : null}
          {p.area ? <span>{p.area} m²</span> : null}
          {!p.beds && !p.baths && !p.area ? (
            <span>Details available from agent</span>
          ) : null}
        </div>
        <div className="card-reference">Ref. {p.ref}</div>
        <div className="agency-mini">
          <span>{p.agency.mark}</span>
          {p.agency.name}{p.agency.isSample ? " (demo)" : ""}
        </div>
      </div>
    </article>
  );
}
function useFavs() {
  const [favs, setState] = useState(() =>
    JSON.parse(localStorage.getItem("pip-favourites") || "[]"),
  );
  const setFavs = (v) => {
    setState(v);
    localStorage.setItem("pip-favourites", JSON.stringify(v));
  };
  return [favs, setFavs];
}
function AgencyLogo({ agency, large = false }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(agency.logoUrl) && !failed;
  return (
    <span className={`agency-logo ${large ? "large" : ""} ${showImage ? "has-image" : "fallback"}`}>
      {showImage ? <img src={agency.logoUrl} alt={`${agency.name} logo`} loading="lazy" onError={() => setFailed(true)} /> : null}
      <i aria-hidden={showImage}>{agency.mark}</i>
    </span>
  );
}
function Home() {
  const [favs, setFavs] = useFavs();
  // scraped-listings.json is requested with sort=latest; its stable array order is
  // therefore the only "newest" signal used here (the source does not publish dates).
  const newest = properties.filter((property) => property.source === "scraped").slice(0, 6);
  const newestIds = new Set(newest.map((property) => property.id));
  const coastal = properties.filter((property) => property.source === "scraped").filter((property) => {
    const text = `${property.region} ${property.city} ${(property.features || []).join(" ")}`;
    return !newestIds.has(property.id) && /Algarve|Cascais|Silver Coast|Madeira|Sea View|Beach Nearby/i.test(text);
  }).slice(0, 6);
  return (
    <Shell>
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=88"
          alt="Contemporary villa overlooking the Portuguese coast"
        />
        <div className="hero-scrim" />
        <div className="shell hero-inner">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="eyebrow light"
          >
            PORTUGAL, BEAUTIFULLY FOUND
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Find your place
            <br />
            in Portugal.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Exceptional homes and new developments, brought together with
            trusted local expertise.
          </motion.p>
          <HomeSearch />
        </div>
      </section>
      <section className="section shell">
        <div className="section-heading">
          <p className="eyebrow">JUST ARRIVED</p>
          <h2>
            Newest listings.
          </h2>
          <Link to="/properties" className="text-link">
            View all properties <ArrowRight />
          </Link>
        </div>
        <div className="property-grid">
          {newest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.04}>
              <PropertyCard p={p} favs={favs} setFavs={setFavs} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section coastal-listings">
        <div className="shell">
          <div className="section-heading coastal-heading">
            <p className="eyebrow light">LIFE BY THE ATLANTIC</p>
            <h2>Coastal listings.</h2>
            <p>Homes selected by coastal region and sea or beach features.</p>
            <Link to="/properties?location=Algarve" className="text-link">
              Explore coastal properties <ArrowRight />
            </Link>
          </div>
          <div className="property-grid coastal-grid">
            {coastal.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.04}>
                <PropertyCard p={p} favs={favs} setFavs={setFavs} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section id="destinations" className="section destinations">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">EXPLORE PORTUGAL</p>
            <h2>
              Six regions.
              <br />
              Endless ways to live.
            </h2>
          </div>
          <div className="destination-grid">
            {regions.map((r, i) => (
              <Reveal className={`destination d${i}`} key={r.name}>
                <Link className="destination-link" to={`/properties?location=${r.name}`} aria-label={`Explore ${r.name}`}>
                  <img src={r.image} alt={`${r.name} property region`} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = properties.find((property) => property.region === r.name)?.image || FALLBACK_IMAGE; }} />
                  <div>
                    <h3>{r.name}</h3>
                    <p>{properties.filter((property) => property.region === r.name).length} local listings</p>
                  </div>
                  <span className="destination-arrow"><ArrowUpRight /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell">
        <div className="development-feature">
          <img src={developments[0].image} alt="Atlantic Residences" />
          <div>
            <p className="eyebrow">NEW DEVELOPMENTS</p>
            <h2>Portugal’s next chapter is taking shape.</h2>
            <p>
              Explore exceptional new-build homes from the Algarve to the Douro,
              with clear availability and considered detail.
            </p>
            <Link to="/developments" className="button dark">
              Explore developments <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="section services">
        <div className="shell">
          <div className="section-heading">
            <h2>
              Make your move
              <br />
              with confidence.
            </h2>
          </div>
          <div className="service-list">
            <Link to="/mortgage">
              <span>01</span>
              <div>
                <h3>Mortgage planning</h3>
                <p>Understand deposits and estimated monthly costs.</p>
              </div>
              <ArrowUpRight />
            </Link>
            <Link to="/legal-support">
              <span>02</span>
              <div>
                <h3>Legal and notary support</h3>
                <p>A clearer route through the Portuguese purchase process.</p>
              </div>
              <ArrowUpRight />
            </Link>
            <Link to="/agencies">
              <span>03</span>
              <div>
                <h3>Trusted local agencies</h3>
                <p>
                  Connect with professionals who know each place personally.
                </p>
              </div>
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
function FilterSelect({ value, onChange, label, options }) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((option) => option.value === value)?.label;
  return (
    <div className="filter-select">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={label}
      >
        {selectedLabel || label}
        <span>⌄</span>
      </button>
      {open && (
        <div className="filter-menu">
          {options.map((o) => (
            <button
              type="button"
              key={o.value}
              className={value === o.value ? "chosen" : ""}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
            >
              {o.label}
              {value === o.value && <Check />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
function Filters({ state, setState, advanced, setAdvanced }) {
  const update = (key, value) => setState({ ...state, [key]: value });
  return (
    <div className="filter-shell">
      <div className="filters">
        <FilterSelect
          value={state.location}
          label="All Portugal"
          onChange={(v) => update("location", v)}
          options={[
            { label: "All Portugal", value: "" },
            ...availableRegions.map((name) => ({ label: name, value: name })),
          ]}
        />
        <FilterSelect
          value={state.type}
          label="Any property"
          onChange={(v) => update("type", v)}
          options={[
            { label: "Any property", value: "" },
            ...propertyTypes.map((x) => ({ label: x, value: x })),
          ]}
        />
        <FilterSelect
          value={state.max}
          label="Maximum price"
          onChange={(v) =>
            setState({
              ...state,
              max: v,
              min: v && +state.min > +v ? "" : state.min,
            })
          }
          options={[
            { label: "No maximum", value: "" },
            { label: "Up to €250k", value: "250000" },
            { label: "Up to €500k", value: "500000" },
            { label: "Up to €750k", value: "750000" },
            { label: "Up to €1m", value: "1000000" },
            { label: "Up to €1.5m", value: "1500000" },
            { label: "Up to €2m", value: "2000000" },
          ]}
        />
        <FilterSelect
          value={state.beds}
          label="Bedrooms"
          onChange={(v) => update("beds", v)}
          options={[
            { label: "Any bedrooms", value: "" },
            { label: "1+ bedrooms", value: "1" },
            { label: "2+ bedrooms", value: "2" },
            { label: "3+ bedrooms", value: "3" },
            { label: "4+ bedrooms", value: "4" },
            { label: "5+ bedrooms", value: "5" },
          ]}
        />
        <button
          className={`filter-button ${advanced ? "active" : ""}`}
          onClick={() => setAdvanced(!advanced)}
          aria-expanded={advanced}
        >
          <SlidersHorizontal /> More filters
        </button>
      </div>
      <AnimatePresence>
        {advanced ? (
          <motion.div
            className="advanced-filters"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div>
              <label>Minimum price</label>
              <FilterSelect
                value={state.min}
                label="No minimum"
                onChange={(v) =>
                  setState({
                    ...state,
                    min: v,
                    max: v && +state.max < +v ? "" : state.max,
                  })
                }
                options={[
                  { label: "No minimum", value: "" },
                  { label: "From €100k", value: "100000" },
                  { label: "From €250k", value: "250000" },
                  { label: "From €500k", value: "500000" },
                  { label: "From €750k", value: "750000" },
                  { label: "From €1m", value: "1000000" },
                ]}
              />
            </div>
            <div>
              <label>Bathrooms</label>
              <FilterSelect
                value={state.baths}
                label="Any bathrooms"
                onChange={(v) => update("baths", v)}
                options={["", "1", "2", "3", "4"].map((v) => ({
                  label: v ? `${v}+ bathrooms` : "Any bathrooms",
                  value: v,
                }))}
              />
            </div>
            <div>
              <label>Minimum interior area</label>
              <FilterSelect
                value={state.area}
                label="Any size"
                onChange={(v) => update("area", v)}
                options={["", "75", "100", "150", "250"].map((v) => ({
                  label: v ? `${v}+ m²` : "Any size",
                  value: v,
                }))}
              />
            </div>
            <div>
              <label>Key feature</label>
              <FilterSelect
                value={state.feature}
                label="Any feature"
                onChange={(v) => update("feature", v)}
                options={[
                  "",
                  "Swimming Pool",
                  "Sea View",
                  "Garden",
                  "Garage",
                  "Terrace",
                  "New Build",
                  "Golf",
                  "Reduced Price",
                ].map((v) => ({ label: v || "Any feature", value: v }))}
              />
            </div>
            <div>
              <label>Listing source</label>
              <FilterSelect
                value={state.source}
                label="All listings"
                onChange={(v) => update("source", v)}
                options={[
                  { label: "All listings", value: "" },
                  { label: "Source catalogue", value: "scraped" },
                  { label: "Curated showcase", value: "curated" },
                ]}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
function Properties() {
  const qs = new URLSearchParams(location.search);
  const [state, setState] = useState({
    location: qs.get("location") || "",
    type: qs.get("type") || "",
    min: qs.get("minPrice") || "",
    max: qs.get("maxPrice") || "",
    beds: qs.get("beds") || "",
    baths: qs.get("baths") || "",
    area: qs.get("minArea") || "",
    feature: qs.get("feature") || "",
    source: qs.get("source") || "",
  });
  const [sort, setSort] = useState("Recommended");
  const [map, setMap] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [visible, setVisible] = useState(24);
  const [favs, setFavs] = useFavs();
  React.useEffect(() => {
    const params = new URLSearchParams();
    const keys = { location: "location", type: "type", min: "minPrice", max: "maxPrice", beds: "beds", baths: "baths", area: "minArea", feature: "feature", source: "source" };
    Object.entries(keys).forEach(([key, param]) => state[key] && params.set(param, state[key]));
    history.replaceState({}, "", `/properties${params.size ? `?${params}` : ""}`);
    setVisible(24);
  }, [state]);
  const result = useMemo(
    () =>
      properties
        .filter(
          (p) =>
            (!state.location ||
              (p.region + " " + p.city)
                .toLowerCase()
                .includes(state.location.toLowerCase())) &&
            (!state.type || p.type === state.type) &&
            (!state.min || p.price >= +state.min) &&
            (!state.max || p.price <= +state.max) &&
            (!state.beds || (p.beds && p.beds >= +state.beds)) &&
            (!state.baths || (p.baths && p.baths >= +state.baths)) &&
            (!state.area || (p.area && p.area >= +state.area)) &&
            (!state.feature || p.features.includes(state.feature)) &&
            (!state.source || (state.source === "scraped" ? p.source === "scraped" : p.source !== "scraped")),
        )
        .sort((a, b) =>
          sort === "Price low to high"
            ? a.price - b.price
            : sort === "Price high to low"
              ? b.price - a.price
              : sort === "Largest first"
                ? (b.area || 0) - (a.area || 0)
                : a.id - b.id,
        ),
    [state, sort],
  );
  return (
    <Shell>
      <section className="search-page-head shell">
        <p className="eyebrow">PROPERTY SEARCH</p>
        <h1>Homes for sale in Portugal</h1>
        <p>{result.length} curated properties in this prototype collection</p>
        <Filters state={state} setState={setState} advanced={advanced} setAdvanced={setAdvanced} />
        {Object.values(state).some(Boolean) ? (
          <div className="applied-filters" aria-label="Applied filters">
            <span>{Object.values(state).filter(Boolean).length} filters applied</span>
            {Object.entries(state).filter(([, value]) => value).map(([key, value]) => (
              <button key={key} onClick={() => setState({ ...state, [key]: "" })}>
                {key === "min" ? `From ${euro(+value)}` : key === "max" ? `Up to ${euro(+value)}` : key === "area" ? `${value}+ m²` : key === "beds" ? `${value}+ beds` : key === "baths" ? `${value}+ baths` : value}
                <X />
              </button>
            ))}
            <button className="clear-filters" onClick={() => setState(emptyFilters)}>Clear all</button>
          </div>
        ) : null}
        <div className="result-tools">
          <span>{result.length} results</span>
          <div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Recommended</option>
              <option>Price low to high</option>
              <option>Price high to low</option>
              <option>Largest first</option>
            </select>
            <button
              className={map ? "" : "active"}
              onClick={() => setMap(false)}
            >
              <CirclesFour /> Grid
            </button>
            <button
              className={map ? "active" : ""}
              onClick={() => setMap(true)}
            >
              <MapPin /> Map
            </button>
          </div>
        </div>
      </section>
      {result.length ? (
        <section className={`results shell ${map ? "map-mode" : ""}`}>
          <div className="property-grid">
            {result.slice(0, visible).map((p) => (
              <PropertyCard key={p.id} p={p} favs={favs} setFavs={setFavs} />
            ))}
            {visible < result.length ? (
              <div className="load-more-wrap">
                <button className="button dark" onClick={() => setVisible(visible + 24)}>
                  Show 24 more
                </button>
                <span>Showing {visible} of {result.length}</span>
              </div>
            ) : null}
          </div>
          {map && <MapView data={result} />}
        </section>
      ) : (
        <section className="empty shell">
          <Compass />
          <h2>No exact matches yet.</h2>
          <p>Try expanding your location or price range.</p>
          <button
            className="button dark"
            onClick={() =>
              setState(emptyFilters)
            }
          >
            Clear filters
          </button>
        </section>
      )}
    </Shell>
  );
}
function MapView({ data }) {
  const [pos, setPos] = useState(null);
  return (
    <div className="map">
      <div className="map-label">
        <MapPin /> Explore the map <span>Approximate demo locations</span>
      </div>
      {data.map((p, i) => (
        <button
          key={p.id}
          onClick={() => setPos(p)}
          style={{
            left: `${12 + ((i * 23) % 75)}%`,
            top: `${18 + ((i * 31) % 65)}%`,
          }}
        >
          {short(p.price)}
        </button>
      ))}
      {pos && (
        <div className="map-preview">
          <img src={pos.image} alt={`${pos.title} preview`} />
          <div>
            <b>{short(pos.price)}</b>
            <span>{pos.title}</span>
            <small>
              {pos.city} · {pos.beds ? `${pos.beds} beds` : "Details on request"}
            </small>
          </div>
          <Link to={`/properties/${pos.slug}`}>
            <ArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}
function EnquiryForm({ subject }) {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const arr = JSON.parse(localStorage.getItem("pip-enquiries") || "[]");
    localStorage.setItem(
      "pip-enquiries",
      JSON.stringify([...arr, { subject, date: new Date().toISOString() }]),
    );
    setSent(true);
  };
  return sent ? (
    <div className="success">
      <Check />
      <h3>Thank you. Your enquiry is saved.</h3>
      <p>A property professional would follow up from here in production.</p>
    </div>
  ) : (
    <form onSubmit={submit} className="enquiry">
      <div className="field-row">
        <label>
          Name
          <input required placeholder="Your name" />
        </label>
        <label>
          Email
          <input required type="email" placeholder="you@example.com" />
        </label>
      </div>
      <label>
        Phone
        <input placeholder="Country code and number" />
      </label>
      <label>
        Message
        <textarea
          defaultValue={`I'm interested in ${subject}. Please send me more information.`}
        />
      </label>
      <button className="button dark">
        Request information <ArrowRight />
      </button>
      <small>Demo form. Your enquiry is stored locally in this browser.</small>
    </form>
  );
}
function ListingMortgage({ price }) {
  const [deposit, setDeposit] = useState(20);
  const [years, setYears] = useState(30);
  const rate = 0.033 / 12;
  const loan = price * (1 - deposit / 100);
  const months = years * 12;
  const payment = loan * rate * (1 + rate) ** months / ((1 + rate) ** months - 1);
  return (
    <section className="listing-mortgage">
      <div>
        <p className="eyebrow">MORTGAGE ESTIMATE</p>
        <h2>Plan around this home.</h2>
        <p>Adjust the deposit and term for an indicative monthly payment.</p>
      </div>
      <div className="mortgage-controls">
        <label>
          <span>Deposit</span><b>{deposit}%</b>
          <input type="range" min="10" max="60" step="5" value={deposit} onChange={(e) => setDeposit(+e.target.value)} />
        </label>
        <label>
          <span>Mortgage term</span><b>{years} years</b>
          <input type="range" min="15" max="35" step="5" value={years} onChange={(e) => setYears(+e.target.value)} />
        </label>
      </div>
      <div className="listing-payment">
        <span>Estimated monthly payment</span>
        <b>{euro(Math.round(payment))}<small> / month</small></b>
        <p>{euro(Math.round(loan))} mortgage at an indicative 3.3% rate. This is not a lending offer.</p>
      </div>
      <Link to="/mortgage" className="text-link">Open full calculator <ArrowRight /></Link>
    </section>
  );
}
function PropertyDetail({ slug }) {
  const p = properties.find((x) => x.slug === slug) || properties[0];
  const [favs, setFavs] = useFavs();
  const saved = favs.includes(p.id);
  const gallery = p.source
    ? [p.image]
    : [
        p.image,
        ...properties
          .filter((x) => x.id !== p.id)
          .slice(0, 4)
          .map((x) => x.image),
      ];
  const similar = properties
    .filter((x) => x.id !== p.id)
    .sort((a, b) => {
      const score = (x) =>
        (x.region === p.region ? 3 : 0) +
        (x.type === p.type ? 2 : 0) -
        Math.abs(x.price - p.price) / Math.max(p.price, 1);
      return score(b) - score(a);
    })
    .slice(0, 3);
  return (
    <Shell>
      <section className="detail shell">
        <div className="crumb">
          Buy / {p.region} / {p.title}
        </div>
        <div className={`gallery ${gallery.length === 1 ? "single" : ""}`}>
          {gallery.slice(0, 3).map((im, i) => (
            <img
              key={im}
              className={`g${i}`}
              src={im}
              alt={`${p.title} view ${i + 1}`}
            />
          ))}
          <button>
            {gallery.length} photos <Plus />
          </button>
        </div>
        <div className="detail-layout">
          <div>
            <div className="property-title">
              <p>
                {p.city}, {p.region}
              </p>
              <h1>{p.title}</h1>
              <div className="price">{euro(p.price)}</div>
            </div>
            <div className="fact-row">
              <span><House /> {p.beds ? `${p.beds} bedrooms` : "Bedrooms not supplied"}</span>
              <span><Bathtub /> {p.baths ? `${p.baths} bathrooms` : "Bathrooms not supplied"}</span>
              <span><Buildings /> {p.area ? `${p.area} m² interior` : "Area not supplied"}</span>
            </div>
            <section className="prose">
              <h2>{p.source === "scraped" ? "About this listing" : `A considered way to live in ${p.city}.`}</h2>
              <p>{p.description}</p>
              {!p.source ? <p>
                Floor-to-ceiling openings connect the interior with terraces and
                landscaped gardens. The result is a relaxed, elegant home
                equally suited to permanent living and long Portuguese summers.
              </p> : null}
            </section>
            <section className="material-info">
              <h2>Property information</h2>
              <div>
                <span><small>Listing reference</small><b>{p.ref}</b></span>
                <span><small>Property type</small><b>{p.type}</b></span>
                <span><small>Energy rating</small><b>{p.energyRating || "Not supplied"}</b></span>
                <span><small>Listing status</small><b>{p.status}</b></span>
              </div>
              {p.sourceUrl ? <a href={p.sourceUrl} target="_blank" rel="noreferrer">View original source listing <ArrowUpRight /></a> : null}
            </section>
            <ListingMortgage price={p.price} />
            <section>
              <h2>Features</h2>
              <div className="feature-grid">
                {p.features.length ? p.features.map((f) => (
                  <span key={f}>
                    <Check /> {f}
                  </span>
                )) : <p>Feature details have not been supplied for this listing.</p>}
              </div>
            </section>
            <section className="location-block">
              <div>
                <p className="eyebrow">LOCATION</p>
                <h2>
                  {p.city}, {p.region}
                </h2>
                <p>
                  Well connected to local restaurants, daily essentials and the
                  coast.
                </p>
              </div>
              <MapPin />
            </section>
          </div>
          <aside className="contact-card">
            <div className="contact-intro">
              <span>Enquire about this property</span>
              <p>Send your questions or request a viewing.</p>
            </div>
            <div className="agency-head">
              <span>{p.agency.mark}</span>
              <div>
                <b>{p.agency.name}</b>
                <small>{p.agency.location}, Portugal</small>
              </div>
            </div>
            <EnquiryForm subject={p.title} />
            <div className="contact-actions">
              <button>
                <WhatsappLogo /> WhatsApp
              </button>
              <button>
                <Phone /> Call
              </button>
              <button
                onClick={() =>
                  setFavs(
                    saved ? favs.filter((x) => x !== p.id) : [...favs, p.id],
                  )
                }
              >
                <Heart weight={saved ? "fill" : "regular"} />{" "}
                {saved ? "Saved" : "Save"}
              </button>
              <button>
                <ShareNetwork /> Share
              </button>
            </div>
          </aside>
        </div>
        <section className="similar">
          <h2>Similar homes</h2>
          <div className="property-grid">
              {similar.map((x) => (
                <PropertyCard key={x.id} p={x} favs={favs} setFavs={setFavs} />
                ))}
          </div>
        </section>
      </section>
    </Shell>
  );
}
function Developments() {
  return (
    <Shell>
      <section className="development-hero">
        <img src={developments[1].image} />
        <div className="hero-scrim" />
        <div>
          <p className="eyebrow light">NEW DEVELOPMENTS</p>
          <h1>
            Designed for
            <br />
            what comes next.
          </h1>
          <p>
            New-build residences and investment opportunities in Portugal’s most
            compelling locations.
          </p>
        </div>
      </section>
      <section className="section shell">
        <div className="development-list">
          {developments.map((d, i) => (
            <article key={d.slug}>
              <div className="number">0{i + 1}</div>
              <img src={d.image} alt={d.name} />
              <div>
                <p>{d.place}</p>
                <h2>{d.name}</h2>
                <p>{d.copy}</p>
                <dl>
                  <div>
                    <dt>From</dt>
                    <dd>{euro(d.from)}</dd>
                  </div>
                  <div>
                    <dt>Residences</dt>
                    <dd>{d.beds}</dd>
                  </div>
                  <div>
                    <dt>Completion</dt>
                    <dd>{d.completion}</dd>
                  </div>
                </dl>
                <Link to={`/developments/${d.slug}`} className="text-link">
                  Discover the development <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Shell>
  );
}
function DevelopmentDetail({ slug }) {
  const d = developments.find((x) => x.slug === slug) || developments[0];
  const [selected, setSelected] = useState("");
  return (
    <Shell>
      <section className="dev-detail-hero">
        <img src={d.image} />
        <div className="hero-scrim" />
        <div>
          <p>{d.place}</p>
          <h1>{d.name}</h1>
          <p>From {euro(d.from)}</p>
        </div>
      </section>
      <nav className="anchor-nav">
        <a href="#overview">Overview</a>
        <a href="#residences">Residences</a>
        <a href="#amenities">Amenities</a>
        <a href="#contact">Enquire</a>
      </nav>
      <section id="overview" className="section shell dev-intro">
        <p className="eyebrow">A NEW PERSPECTIVE</p>
        <h2>{d.copy}</h2>
        <p>
          Every detail has been composed to make daily life feel effortless,
          from the relationship with the landscape to the materials you touch.
        </p>
      </section>
      <section id="amenities" className="wide-image">
        <img src={properties[4].image} />
        <div>
          <h2>
            Designed around
            <br />
            the way you live.
          </h2>
          <div>
            {d.amenities.map((x) => (
              <span key={x}>
                <Check /> {x}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section id="residences" className="section shell units">
        <div className="section-heading">
          <h2>Available residences</h2>
          <p>{d.available} homes currently available</p>
        </div>
        <div className="unit-table">
          <div className="unit-row head">
            <span>Residence</span>
            <span>Type</span>
            <span>Interior</span>
            <span>Price</span>
            <span>Status</span>
          </div>
          {d.units.map((u) => (
            <button
              key={u.unit}
              disabled={u.status === "Sold"}
              onClick={() => setSelected(u.unit)}
              className={`unit-row ${selected === u.unit ? "selected" : ""}`}
            >
              <span>{u.unit}</span>
              <span>{u.type}</span>
              <span>{u.size} m²</span>
              <span>{euro(u.price)}</span>
              <span className={`status ${u.status.toLowerCase()}`}>
                {u.status}
              </span>
            </button>
          ))}
        </div>
      </section>
      <section id="contact" className="dev-contact">
        <div>
          <p className="eyebrow light">PRIVATE APPOINTMENTS</p>
          <h2>
            Request the full
            <br />
            development details.
          </h2>
          <p>Receive availability, floor plans and the latest brochure.</p>
        </div>
        <EnquiryForm
          subject={`${d.name}${selected ? `, unit ${selected}` : ""}`}
        />
      </section>
    </Shell>
  );
}
function Agencies() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);
  const areaOptions = [...new Set(agencies.map((agency) => agency.location.split(",").at(-1)?.trim()).filter(Boolean))].sort().slice(0, 30);
  const visible = agencies.filter((agency) => {
    const needle = query.toLowerCase().trim();
    return (!needle || `${agency.name} ${agency.ami}`.toLowerCase().includes(needle)) && (!area || agency.location.includes(area));
  });
  return (
    <Shell>
      <section className="agency-directory-hero">
        <div className="shell">
          <p className="eyebrow light">PUBLIC DIRECTORY</p>
          <h1>Local expertise,<br />across Portugal.</h1>
          <p>Browse {agencies.length} agencies imported from the public Properties in Portugal directory.</p>
          <div className="directory-stats"><span><b>{agencies.length}</b> agencies</span><span><b>{agencies.reduce((sum, a) => sum + a.count, 0).toLocaleString()}</b> displayed listings</span><span>Source refreshed {new Date("2026-09-10").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span></div>
        </div>
      </section>
      <section className="section shell directory-section">
        <div className="directory-tools">
          <label><MagnifyingGlass /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search agency name or AMI" /></label>
          <select value={area} onChange={(event) => setArea(event.target.value)} aria-label="Filter by displayed area"><option value="">All displayed areas</option>{areaOptions.map((option) => <option key={option}>{option}</option>)}</select>
          <span>{visible.length} results</span>
        </div>
        {visible.length ? <><div className="agency-grid">{visible.slice(0, visibleCount).map((a) => (
          <Link to={`/agencies/${a.slug}`} className="agency-card" key={a.slug}>
            <AgencyLogo agency={a} />
            <div>
              <p>{a.location || "Portugal"}</p>
              <h2>{a.name}</h2>
              <p>{a.ami ? `AMI ${a.ami}` : "AMI not displayed"}</p>
              <b>
                {a.count} properties displayed <ArrowRight />
              </b>
            </div>
          </Link>
        ))}</div>{visibleCount < visible.length && <div className="directory-more"><button className="button dark" onClick={() => setVisibleCount((count) => count + 24)}>Show more agencies</button><span>Showing {Math.min(visibleCount, visible.length)} of {visible.length}</span></div>}</> : <div className="empty directory-empty"><Buildings /><h2>No agencies found.</h2><p>Try a broader name, AMI number or area.</p><button className="button dark" onClick={() => { setQuery(""); setArea(""); }}>Clear filters</button></div>}
        <p className="source-note">Directory information is attributed to <a href="https://www.propertiesinportugal.com/agents" target="_blank" rel="noreferrer">propertiesinportugal.com <ArrowUpRight /></a>. Counts reflect what the source displayed when refreshed.</p>
      </section>
    </Shell>
  );
}
function AgencyProfile({ slug }) {
  const a = agencies.find((x) => x.slug === slug);
  const [favs, setFavs] = useFavs();
  if (!a) return <Shell><section className="empty"><Buildings /><h1>Agency not found.</h1><p>This directory entry may have moved or is no longer available.</p><Link className="button dark" to="/agencies">Return to agencies</Link></section></Shell>;
  const ps = properties.filter((p) => p.agency.slug === a.slug);
  return (
    <Shell>
      <section className="agency-profile shell">
        <AgencyLogo agency={a} large />
        <div>
          <p>{a.location}, Portugal</p>
          <h1>{a.name}</h1>
          <p>{a.about}</p>
          <div className="agency-contacts"><span>{a.ami ? `AMI ${a.ami}` : "AMI not displayed"}</span><span><MapPin /> {a.location || "Portugal"}</span></div>
        </div>
        <a className="button dark" href={a.sourceUrl} target="_blank" rel="noreferrer">View source profile <ArrowUpRight /></a>
      </section>
      <section className="section shell">
        <div className="section-heading">
          <h2>Properties from {a.name}</h2>
          <p>{ps.length} in the prototype collection</p>
        </div>
        {ps.length ? <div className="property-grid">
          {ps.map((p) => (
            <PropertyCard key={p.id} p={p} favs={favs} setFavs={setFavs} />
          ))}
        </div> : <div className="empty directory-empty"><House /><h2>No matching local listings.</h2><p>View the source profile for the agency’s current catalogue.</p></div>}
      </section>
    </Shell>
  );
}
function News() {
  const stories = newsSnapshot.records || [];
  const [lead, ...rest] = stories;
  return (
    <Shell>
      <section className="news-hero"><div className="shell"><p className="eyebrow light">PROPERTY NEWS</p><h1>Portugal,<br />in perspective.</h1><p>A first-page editorial snapshot from Properties in Portugal, linking directly to the original reporting.</p></div></section>
      <section className="section shell news-section">
        {lead ? <>
          <a className="lead-story" href={lead.sourceUrl} target="_blank" rel="noreferrer"><img src={lead.imageUrl} alt={lead.title} /><div><p className="eyebrow">LEAD STORY</p><h2>{lead.title}</h2><p>{lead.summary}</p><b>Read on the source site <ArrowUpRight /></b></div></a>
          <div className="news-grid">{rest.map((story, index) => <a className={`news-card n${index}`} href={story.sourceUrl} target="_blank" rel="noreferrer" key={story.sourceUrl}><img src={story.imageUrl} alt={story.title} loading="lazy" onError={(event) => { event.currentTarget.src = FALLBACK_IMAGE; }} /><div><span>Property news</span><h2>{story.title}</h2><p>{story.summary}</p><b>Continue reading <ArrowUpRight /></b></div></a>)}</div>
          <p className="source-note">Titles, summaries and images are attributed to <a href={newsSnapshot.source} target="_blank" rel="noreferrer">propertiesinportugal.com <ArrowUpRight /></a>. Articles open on the source website.</p>
        </> : <div className="empty"><CalendarBlank /><h2>News is being refreshed.</h2><p>Please visit the source publication for the latest property reporting.</p><a className="button dark" href="https://www.propertiesinportugal.com/news" target="_blank" rel="noreferrer">Visit the source</a></div>}
      </section>
    </Shell>
  );
}
const agencyNav = [
  ["Overview", "/agency"],
  ["Properties", "/agency/properties"],
  ["Enquiries", "/agency/enquiries"],
  ["Analytics", "/agency/analytics"],
  ["Feed Integration", "/agency/feed"],
  ["Agency Profile", "/agency/profile"],
  ["Settings", "/agency/settings"],
];
function AgencyLayout({ children, active }) {
  return (
    <div className="portal">
      <aside>
        <Logo light />
        <div className="demo-label">DEMO WORKSPACE</div>
        <nav>
          {agencyNav.map(([n, p]) => (
            <Link className={active === n ? "active" : ""} to={p} key={n}>
              {n}
            </Link>
          ))}
        </nav>
        <Link to="/" className="back">
          ← Public website
        </Link>
      </aside>
      <main>
        <div className="portal-top">
          <TranslationWidget />
          <div>
            <small>Casa Nova Portugal</small>
            <b>MF</b>
          </div>
        </div>
        <PageTransition key={location.pathname}>{children}</PageTransition>
      </main>
    </div>
  );
}
function Sparkline() {
  return (
    <div className="chart">
      <div className="chart-bars">
        {[38, 45, 42, 58, 51, 67, 61, 73, 68, 82, 77, 91, 86, 100].map(
          (n, i) => (
            <motion.i
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${n}%` }}
              transition={{ delay: i * 0.03 }}
            />
          ),
        )}
      </div>
      <div className="chart-meta">
        <span>12 Aug</span>
        <span>Today</span>
      </div>
    </div>
  );
}
function Dashboard() {
  return (
    <AgencyLayout active="Overview">
      <div className="portal-page">
        <p className="eyebrow">THURSDAY, 10 SEPTEMBER</p>
        <h1>Good morning, Maria.</h1>
        <p>Here is how your portfolio is performing.</p>
        <div className="metrics">
          {[
            ["Active listings", "84", "+3 this month"],
            ["New enquiries", "18", "6 need a reply"],
            ["Property views", "4,821", "+12.4%"],
            ["Saved properties", "312", "+8.1%"],
          ].map(([l, n, s]) => (
            <div key={l}>
              <span>{l}</span>
              <b>{n}</b>
              <small>{s}</small>
            </div>
          ))}
        </div>
        <div className="dashboard-grid">
          <section>
            <div className="panel-title">
              <div>
                <h2>Listing views</h2>
                <p>Last 30 days · seeded demo analytics</p>
              </div>
              <b>
                4,821 <small>views</small>
              </b>
            </div>
            <Sparkline />
          </section>
          <section className="tasks">
            <h2>Needs your attention</h2>
            <Link to="/agency/enquiries">
              <span>
                <EnvelopeSimple />
              </span>
              <div>
                <b>6 new enquiries</b>
                <small>Oldest received 3 hours ago</small>
              </div>
              <ArrowRight />
            </Link>
            <Link to="/agency/feed">
              <span>
                <Check />
              </span>
              <div>
                <b>Feed healthy</b>
                <small>84 listings synced today</small>
              </div>
              <ArrowRight />
            </Link>
          </section>
        </div>
      </div>
    </AgencyLayout>
  );
}
function AgencyProperties() {
  const [items, setItems] = useState(
    properties
      .filter((p) => p.agency.slug === "casa-nova")
      .map((p) => ({ ...p })),
  );
  return (
    <AgencyLayout active="Properties">
      <div className="portal-page">
        <div className="portal-heading">
          <div>
            <p className="eyebrow">PORTFOLIO</p>
            <h1>Properties</h1>
            <p>{items.length} listings in this demo workspace</p>
          </div>
          <button className="button dark">
            <Plus /> Add property
          </button>
        </div>
        <div className="data-list">
          <div className="data-row head">
            <span>Property</span>
            <span>Price</span>
            <span>Views</span>
            <span>Status</span>
            <span></span>
          </div>
          {items.map((p) => (
            <div className="data-row" key={p.id}>
              <span className="data-property">
                <img src={p.image} />
                <span>
                  <b>{p.title}</b>
                  <small>
                    {p.city} · {p.ref}
                  </small>
                </span>
              </span>
              <span>{short(p.price)}</span>
              <span>{390 + p.id * 61}</span>
              <select
                value={p.status}
                onChange={(e) =>
                  setItems(
                    items.map((x) =>
                      x.id === p.id ? { ...x, status: e.target.value } : x,
                    ),
                  )
                }
              >
                <option>Live</option>
                <option>Under Offer</option>
                <option>Sold</option>
                <option>Draft</option>
              </select>
              <button onClick={() => go(`/agency/properties/${p.id}`)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </AgencyLayout>
  );
}
function EditProperty({ id }) {
  const base = properties.find((p) => p.id === +id) || properties[0];
  const [p, setP] = useState({ ...base });
  const [saved, setSaved] = useState(false);
  return (
    <AgencyLayout active="Properties">
      <div className="portal-page">
        <div className="portal-heading">
          <div>
            <Link to="/agency/properties" className="muted">
              ← Properties
            </Link>
            <h1>Edit listing</h1>
            <p>{p.ref}</p>
          </div>
          <button
            className="button dark"
            onClick={() => {
              localStorage.setItem(`pip-property-${p.id}`, JSON.stringify(p));
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }}
          >
            {saved ? (
              <>
                <Check /> Saved
              </>
            ) : (
              <>Save changes</>
            )}
          </button>
        </div>
        <div className="edit-grid">
          <section>
            <h2>Property details</h2>
            <label>
              Listing title
              <input
                value={p.title}
                onChange={(e) => setP({ ...p, title: e.target.value })}
              />
            </label>
            <div className="field-row">
              <label>
                Price
                <input
                  type="number"
                  value={p.price}
                  onChange={(e) => setP({ ...p, price: +e.target.value })}
                />
              </label>
              <label>
                Status
                <select
                  value={p.status}
                  onChange={(e) => setP({ ...p, status: e.target.value })}
                >
                  <option>Live</option>
                  <option>Under Offer</option>
                  <option>Sold</option>
                  <option>Draft</option>
                </select>
              </label>
            </div>
            <label>
              Description
              <textarea
                rows="8"
                value={p.description}
                onChange={(e) => setP({ ...p, description: e.target.value })}
              />
            </label>
          </section>
          <aside>
            <img src={p.image} />
            <h3>Listing quality</h3>
            <div className="quality">
              <i />
              <span>Strong</span>
            </div>
            <p>
              Your listing has a complete description, location, features and
              professional imagery.
            </p>
          </aside>
        </div>
      </div>
    </AgencyLayout>
  );
}
function AgencyEnquiries() {
  const [items, setItems] = useState(seedEnquiries);
  return (
    <AgencyLayout active="Enquiries">
      <div className="portal-page">
        <p className="eyebrow">LEAD INBOX</p>
        <h1>Enquiries</h1>
        <p>Buyer requests across your property portfolio.</p>
        <div className="enquiry-list">
          {items.map((e) => (
            <article key={e.id}>
              <div className="enquiry-person">
                <span>
                  {e.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </span>
                <div>
                  <h3>{e.name}</h3>
                  <p>
                    {e.country} · {e.time}
                  </p>
                </div>
              </div>
              <div>
                <b>{e.property}</b>
                <p>“{e.message}”</p>
              </div>
              <select
                value={e.status}
                onChange={(x) =>
                  setItems(
                    items.map((q) =>
                      q.id === e.id ? { ...q, status: x.target.value } : q,
                    ),
                  )
                }
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Viewing Arranged</option>
                <option>Closed</option>
              </select>
            </article>
          ))}
        </div>
      </div>
    </AgencyLayout>
  );
}
function Feed() {
  const [syncing, setSyncing] = useState(false);
  const [last, setLast] = useState("Today, 09:42");
  const sync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLast("Just now");
    }, 1300);
  };
  return (
    <AgencyLayout active="Feed Integration">
      <div className="portal-page">
        <p className="eyebrow">DISTRIBUTION</p>
        <h1>Listing feed</h1>
        <p>Keep your portfolio automatically up to date.</p>
        <div className="feed-card">
          <div className="feed-status">
            <span>
              <Check />
            </span>
            <div>
              <small>CONNECTION STATUS</small>
              <h2>Connected</h2>
              <p>XML feed · Casa Nova CRM</p>
            </div>
            <button className="button dark" onClick={syncing ? null : sync}>
              {syncing ? "Synchronising…" : "Sync now"}
            </button>
          </div>
          <div className="feed-facts">
            <div>
              <span>Listings discovered</span>
              <b>84</b>
            </div>
            <div>
              <span>Last synchronisation</span>
              <b>{last}</b>
            </div>
            <div>
              <span>Next synchronisation</span>
              <b>In 52 minutes</b>
            </div>
          </div>
          <div className="sync-summary">
            <h3>Latest import activity</h3>
            {[
              ["Added", "3"],
              ["Updated", "11"],
              ["Removed", "2"],
              ["Needs review", "1"],
            ].map((x) => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <b>{x[1]}</b>
              </div>
            ))}
          </div>
          <p className="demo-note">
            Prototype demonstration. Production feed capabilities and validation
            rules may vary.
          </p>
        </div>
      </div>
    </AgencyLayout>
  );
}
function Analytics() {
  return (
    <AgencyLayout active="Analytics">
      <div className="portal-page">
        <p className="eyebrow">PERFORMANCE</p>
        <h1>Analytics</h1>
        <p>Seeded demo data for presentation purposes.</p>
        <div className="metrics">
          {[
            ["Search appearances", "18,420", "+14.2%"],
            ["Listing views", "4,821", "+12.4%"],
            ["Enquiries", "74", "+9.1%"],
            ["Conversion rate", "1.53%", "+0.2%"],
          ].map(([l, n, s]) => (
            <div key={l}>
              <span>{l}</span>
              <b>{n}</b>
              <small>{s}</small>
            </div>
          ))}
        </div>
        <div className="dashboard-grid">
          <section>
            <div className="panel-title">
              <div>
                <h2>Engagement trend</h2>
                <p>Views across the last 30 days</p>
              </div>
            </div>
            <Sparkline />
          </section>
          <section>
            <h2>Top listings</h2>
            {properties.slice(0, 4).map((p, i) => (
              <div className="rank" key={p.id}>
                <b>0{i + 1}</b>
                <img src={p.image} />
                <span>
                  {p.title}
                  <small>{821 - i * 127} views</small>
                </span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </AgencyLayout>
  );
}
function PlaceholderPortal({ active }) {
  return (
    <AgencyLayout active={active}>
      <div className="portal-page">
        <p className="eyebrow">WORKSPACE</p>
        <h1>{active}</h1>
        <div className="empty-panel">
          <Check />
          <h2>This workspace is presentation ready.</h2>
          <p>
            Core prototype controls are represented here without production
            account infrastructure.
          </p>
        </div>
      </div>
    </AgencyLayout>
  );
}
function Mortgage() {
  const [price, setPrice] = useState(450000),
    [deposit, setDeposit] = useState(20),
    [years, setYears] = useState(30),
    [rate, setRate] = useState(3.3);
  const loan = price * (1 - deposit / 100),
    m = rate / 1200,
    pay = m
      ? (loan * m * (1 + m) ** (years * 12)) / ((1 + m) ** (years * 12) - 1)
      : loan / (years * 12);
  return (
    <Shell>
      <section className="tool-page shell">
        <div>
          <p className="eyebrow">BUYER SERVICES</p>
          <h1>
            Plan the numbers.
            <br />
            Picture the move.
          </h1>
          <p>
            Explore an indicative monthly mortgage payment for a Portuguese
            property.
          </p>
        </div>
        <div className="calculator">
          <label>
            Property price <b>{euro(price)}</b>
            <input
              type="range"
              min="150000"
              max="2000000"
              step="25000"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
            />
          </label>
          <label>
            Deposit <b>{deposit}%</b>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={deposit}
              onChange={(e) => setDeposit(+e.target.value)}
            />
          </label>
          <div className="field-row">
            <label>
              Term
              <select value={years} onChange={(e) => setYears(+e.target.value)}>
                <option value="20">20 years</option>
                <option value="25">25 years</option>
                <option value="30">30 years</option>
                <option value="35">35 years</option>
              </select>
            </label>
            <label>
              Interest rate
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
              />
            </label>
          </div>
          <div className="payment">
            <span>Estimated payment</span>
            <b>
              {euro(Math.round(pay))}
              <small> / month</small>
            </b>
            <p>Loan amount {euro(loan)} · Indicative only</p>
          </div>
          <button className="button dark">
            Get mortgage assistance <ArrowRight />
          </button>
        </div>
      </section>
    </Shell>
  );
}
function Legal() {
  const [stage, setStage] = useState("");
  return (
    <Shell>
      <section className="inner-hero shell">
        <p className="eyebrow">BUYING IN PORTUGAL</p>
        <h1>
          A clear path
          <br />
          from search to keys.
        </h1>
        <p>
          Understand the legal journey and find professional support at the
          right moment.
        </p>
      </section>
      <section className="section shell journey">
        {[
          "Property selected",
          "Legal due diligence",
          "Promissory contract",
          "Financing",
          "Notary and deed",
          "Property registration",
        ].map((x, i) => (
          <div key={x}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <span>{x}</span>
          </div>
        ))}
      </section>
      <section className="support-form">
        <div>
          <h2>What stage are you at?</h2>
          <p>Choose the option that best describes your move.</p>
          <div className="stage-options">
            {[
              "I have not found a property",
              "I have made an offer",
              "I need a lawyer",
              "I need a notary",
              "I am buying from overseas",
            ].map((x) => (
              <button
                className={stage === x ? "active" : ""}
                onClick={() => setStage(x)}
                key={x}
              >
                {x}
                <Check />
              </button>
            ))}
          </div>
        </div>
        <EnquiryForm subject={stage || "legal support in Portugal"} />
      </section>
    </Shell>
  );
}
function PrivateSeller() {
  return (
    <Shell>
      <section className="inner-hero shell">
        <p className="eyebrow">SELL PRIVATELY</p>
        <h1>
          A clearer way
          <br />
          to sell your home.
        </h1>
        <p>
          Tell us about your property and we’ll help you understand the next
          steps for a private sale in Portugal.
        </p>
      </section>
      <section className="support-form">
        <div>
          <h2>Start with your property.</h2>
          <p>
            Share a few details and a local property professional can guide you
            through valuation, presentation and buyer enquiries.
          </p>
        </div>
        <EnquiryForm subject="selling my property privately" />
      </section>
    </Shell>
  );
}
function Favourites() {
  const [favs, setFavs] = useFavs();
  const ps = properties.filter((p) => favs.includes(p.id));
  return (
    <Shell>
      <section className="inner-hero shell">
        <p className="eyebrow">YOUR SHORTLIST</p>
        <h1>Saved properties.</h1>
        <p>Keep the homes that feel worth another look.</p>
      </section>
      <section className="section shell">
        {ps.length ? (
          <div className="property-grid">
            {ps.map((p) => (
              <PropertyCard key={p.id} p={p} favs={favs} setFavs={setFavs} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <Heart />
            <h2>Your shortlist is empty.</h2>
            <p>Save properties as you explore to keep them here.</p>
            <Link className="button dark" to="/properties">
              Explore properties
            </Link>
          </div>
        )}
      </section>
    </Shell>
  );
}
function Router() {
  const [path, setPath] = useState(location.pathname + location.search);
  React.useEffect(() => {
    const fn = () => setPath(location.pathname + location.search);
    addEventListener("popstate", fn);
    return () => removeEventListener("popstate", fn);
  }, []);
  const clean = path.split("?")[0],
    parts = clean.split("/").filter(Boolean);
  if (clean === "/") return <Home />;
  if (clean === "/properties") return <Properties />;
  if (parts[0] === "properties" && parts[1])
    return <PropertyDetail slug={parts[1]} />;
  if (clean === "/developments") return <Developments />;
  if (parts[0] === "developments" && parts[1])
    return <DevelopmentDetail slug={parts[1]} />;
  if (clean === "/agencies") return <Agencies />;
  if (parts[0] === "agencies" && parts[1])
    return <AgencyProfile slug={parts[1]} />;
  if (clean === "/news") return <News />;
  if (clean === "/agency") return <Dashboard />;
  if (clean === "/agency/properties") return <AgencyProperties />;
  if (parts[0] === "agency" && parts[1] === "properties" && parts[2])
    return <EditProperty id={parts[2]} />;
  if (clean === "/agency/enquiries") return <AgencyEnquiries />;
  if (clean === "/agency/analytics") return <Analytics />;
  if (clean === "/agency/feed") return <Feed />;
  if (clean === "/agency/profile")
    return <PlaceholderPortal active="Agency Profile" />;
  if (clean === "/agency/settings")
    return <PlaceholderPortal active="Settings" />;
  if (clean === "/mortgage") return <Mortgage />;
  if (clean === "/legal-support") return <Legal />;
  if (clean === "/private-seller") return <PrivateSeller />;
  if (clean === "/account/favourites") return <Favourites />;
  return <Home />;
}
createRoot(document.getElementById("root")).render(<Router />);
