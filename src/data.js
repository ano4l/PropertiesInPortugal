import scraped from "./scraped-listings.json";
import agencyDirectory from "./scraped-agencies.json";
const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=84`;
export const regions = [
  { name: "Algarve", count: 326, image: img("1600607687939-ce8a6c25118c") },
  { name: "Lisbon", count: 214, image: img("1555881400-74d7acaacd8b") },
  { name: "Cascais", count: 148, image: img("1600047509807-ba8f99d2cdde") },
  { name: "Porto", count: 173, image: img("1555881400-69b64d68d2b5") },
  { name: "Madeira", count: 92, image: img("1528127269322-539801943592") },
  {
    name: "Silver Coast",
    count: 116,
    image: img("1494522358652-f30e61a60313"),
  },
];
const agencyMark = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
export const agencies = agencyDirectory.records.map((agency) => ({
  ...agency,
  mark: agencyMark(agency.name) || "PI",
  count: agency.propertyCount,
  about: agency.ami
    ? `Portuguese property agency registered under AMI ${agency.ami}.`
    : "Portuguese property agency listed in the public Properties in Portugal directory.",
}));
const sampleAgencies = [
  { slug: "sample-south", name: "Sample agency · South", mark: "SA", location: "Portugal", count: 0, about: "Sample attribution for seeded showcase inventory.", isSample: true },
  { slug: "sample-lisbon", name: "Sample agency · Lisbon", mark: "SA", location: "Portugal", count: 0, about: "Sample attribution for seeded showcase inventory.", isSample: true },
  { slug: "sample-north", name: "Sample agency · North", mark: "SA", location: "Portugal", count: 0, about: "Sample attribution for seeded showcase inventory.", isSample: true },
  { slug: "sample-islands", name: "Sample agency · Islands", mark: "SA", location: "Portugal", count: 0, about: "Sample attribution for seeded showcase inventory.", isSample: true },
];
const raw = [
  [
    "villa-mar-luz",
    "Villa Mar Luz",
    "Lagos",
    "Algarve",
    895000,
    "Villa",
    4,
    3,
    216,
    "1600607687920-4e2a09cf159d",
    0,
    "Sea View,Swimming Pool,Garden,Terrace",
  ],
  [
    "casa-da-falesia",
    "Casa da Falésia",
    "Carvoeiro",
    "Algarve",
    1250000,
    "Villa",
    4,
    4,
    284,
    "1600566753086-00f18fb6b3ea",
    0,
    "Swimming Pool,Luxury,Beach Nearby",
  ],
  [
    "quinta-do-pinhal",
    "Quinta do Pinhal",
    "Loulé",
    "Algarve",
    680000,
    "House",
    3,
    2,
    188,
    "1600585154340-be6161a56a0c",
    0,
    "Garden,Terrace,Garage",
  ],
  [
    "atelier-chiado",
    "Atelier Chiado",
    "Lisbon",
    "Lisbon",
    745000,
    "Apartment",
    2,
    2,
    132,
    "1600566753190-17f0baa2a6c3",
    1,
    "Luxury,Furnished,Terrace",
  ],
  [
    "lapa-garden-house",
    "Lapa Garden House",
    "Lisbon",
    "Lisbon",
    1180000,
    "Townhouse",
    3,
    3,
    201,
    "1600585154526-990dced4db0d",
    1,
    "Garden,Luxury,Recently Added",
  ],
  [
    "estoril-ocean-residence",
    "Estoril Ocean Residence",
    "Estoril",
    "Cascais",
    965000,
    "Apartment",
    3,
    3,
    175,
    "1600607688969-a5bfcd646154",
    1,
    "Sea View,Garage,Beach Nearby",
  ],
  [
    "cascais-courtyard",
    "Cascais Courtyard",
    "Cascais",
    "Cascais",
    535000,
    "Apartment",
    2,
    2,
    109,
    "1600047509807-ba8f99d2cdde",
    1,
    "New Build,Terrace",
  ],
  [
    "foz-river-house",
    "Foz River House",
    "Porto",
    "Porto",
    790000,
    "House",
    4,
    3,
    238,
    "1600566752355-35792bedcfea",
    2,
    "River View,Garage,Garden",
  ],
  [
    "bolhao-loft",
    "Bolhão Loft",
    "Porto",
    "Porto",
    390000,
    "Apartment",
    1,
    1,
    78,
    "1600585152915-d208bec867a1",
    2,
    "Furnished,Investment",
  ],
  [
    "madeira-cliff-villa",
    "Madeira Cliff Villa",
    "Funchal",
    "Madeira",
    1100000,
    "Villa",
    4,
    4,
    260,
    "1600607687939-ce8a6c25118c",
    3,
    "Sea View,Swimming Pool,Luxury",
  ],
  [
    "calheta-sunset-home",
    "Calheta Sunset Home",
    "Calheta",
    "Madeira",
    620000,
    "House",
    3,
    2,
    164,
    "1600566753051-f0b89df2dd90",
    3,
    "Sea View,Garden,Terrace",
  ],
  [
    "obidos-stone-house",
    "Óbidos Stone House",
    "Óbidos",
    "Silver Coast",
    440000,
    "House",
    3,
    2,
    177,
    "1600585152220-90363fe7e115",
    0,
    "Garden,Reduced Price,Fireplace",
  ],
  [
    "quinta-lagoa",
    "Quinta da Lagoa",
    "Almancil",
    "Algarve",
    585000,
    "House",
    3,
    2,
    164,
    "1600566753086-00f18fb6b3ea",
    0,
    "Swimming Pool,Garden,Garage",
  ],
  [
    "praia-verde-villa",
    "Praia Verde Villa",
    "Castro Marim",
    "Algarve",
    920000,
    "Villa",
    4,
    3,
    238,
    "1600607687920-4e2a09cf159d",
    0,
    "Sea View,Swimming Pool,Beach Nearby",
  ],
  [
    "principe-real-flat",
    "Príncipe Real Flat",
    "Lisbon",
    "Lisbon",
    510000,
    "Apartment",
    1,
    1,
    71,
    "1600047509807-ba8f99d2cdde",
    1,
    "Furnished,Investment,Recently Added",
  ],
  [
    "carcavelos-light",
    "Carcavelos Light",
    "Carcavelos",
    "Cascais",
    630000,
    "Apartment",
    2,
    2,
    102,
    "1600566753190-17f0baa2a6c3",
    1,
    "New Build,Terrace,Garage",
  ],
  [
    "foz-do-douro-apartment",
    "Foz do Douro Apartment",
    "Porto",
    "Porto",
    550000,
    "Apartment",
    2,
    2,
    118,
    "1600566752355-35792bedcfea",
    2,
    "Sea View,Beach Nearby,Garage",
  ],
  [
    "douro-vineyard-home",
    "Douro Vineyard Home",
    "Peso da Régua",
    "Porto",
    740000,
    "House",
    4,
    3,
    226,
    "1600585152220-90363fe7e115",
    2,
    "Garden,Swimming Pool,Investment",
  ],
  [
    "ponta-delgada-house",
    "Ponta Delgada House",
    "Ponta Delgada",
    "Madeira",
    485000,
    "House",
    3,
    2,
    148,
    "1528127269322-539801943592",
    3,
    "Sea View,Garden,Reduced Price",
  ],
  [
    "nazare-cliff-house",
    "Nazaré Cliff House",
    "Nazaré",
    "Silver Coast",
    695000,
    "House",
    3,
    2,
    186,
    "1494522358652-f30e61a60313",
    0,
    "Sea View,Terrace,Beach Nearby",
  ],
];
const baseProperties = raw.map((p, i) => ({
  id: i + 1,
  slug: p[0],
  title: p[1],
  city: p[2],
  region: p[3],
  price: p[4],
  type: p[5],
  beds: p[6],
  baths: p[7],
  area: p[8],
  image: img(p[9]),
  agency: sampleAgencies[p[10]],
  features: p[11].split(","),
  ref: `PIP-${p[3].slice(0, 3).toUpperCase()}-${23847 + i}`,
  status: i === 6 ? "Under Offer" : "Live",
  featured: i < 7,
  description:
    "Designed for effortless indoor-outdoor living, this beautifully considered home combines generous natural light, refined materials and a privileged Portuguese setting. Thoughtful proportions create quiet spaces for daily life and generous rooms for gathering.",
  source: "sample",
}));
const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const regionFor = (loc) => {
  const l = loc.toLowerCase();
  if (
    /algarve|faro|lagos|albufeira|loule|loulé|portimao|portimão|silves/.test(l)
  )
    return "Algarve";
  if (/lisbon|lisboa|cascais|estoril|sintra|oeiras/.test(l))
    return l.includes("cascais") || l.includes("estoril")
      ? "Cascais"
      : "Lisbon";
  if (/porto|vila nova de gaia|gaia|douro/.test(l)) return "Porto";
  if (/braga|bragança|braganca|vila real|mirandela|chaves/.test(l))
    return "Northern Portugal";
  if (/aveiro|coimbra|viseu|guarda|leiria|castelo branco/.test(l))
    return "Central Portugal";
  if (/madeira|funchal|calheta|ponta delgada/.test(l)) return "Madeira";
  return "Silver Coast";
};
const agencyFor = (name, i) => {
  const clean = name || "Independent agency";
  const canonical = agencies.find((agency) => slugify(agency.name) === slugify(clean));
  if (canonical) return canonical;
  const mark = clean
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();
  return {
    slug: `scraped-${slugify(clean)}`,
    name: clean,
    mark: mark || "IP",
    location: "Portugal",
    count: 1,
    phone: "",
    email: "",
    about: "Source agency listing imported from Properties in Portugal.",
  };
};
const scrapedProperties = (scraped || []).map((p, i) => {
  const region = regionFor(p.location || p.name);
  const bits = (p.name || "Property in Portugal").split(" in ");
  const type = /villa/i.test(p.name)
    ? "Villa"
    : /apartment|flat/i.test(p.name)
      ? "Apartment"
      : /land|plot/i.test(p.name)
        ? "Land"
        : /townhouse/i.test(p.name)
          ? "Townhouse"
          : /commercial|shop|warehouse|business/i.test(p.name)
            ? "Commercial"
            : /farm|quinta/i.test(p.name)
              ? "Farm"
              : "House";
  const n = parseInt(p.price?.replace(/[^0-9]/g, ""), 10) || 0;
  const searchable = `${p.name || ""} ${p.description || ""}`.toLowerCase();
  const features = [
    /pool|swimming/.test(searchable) && "Swimming Pool",
    /sea view|ocean view/.test(searchable) && "Sea View",
    /garage|parking/.test(searchable) && "Garage",
    /garden/.test(searchable) && "Garden",
    /terrace|balcony/.test(searchable) && "Terrace",
    /new build|new development|brand new/.test(searchable) && "New Build",
    /golf/.test(searchable) && "Golf",
    /reduced/.test(searchable) && "Reduced Price",
  ].filter(Boolean);
  return {
    id: 100 + i,
    slug: `${slugify(bits[0] || "property")}-${100 + i}`,
    title: p.name || "Property in Portugal",
    city: (p.location || "Portugal").split(",")[0].trim(),
    region,
    price: n,
    type,
    beds: parseInt(p.beds, 10) || null,
    baths: parseInt(p.baths, 10) || null,
    area: parseInt(p.area, 10) || null,
    image: (p.image || "").startsWith("http")
      ? p.image
      : `https://www.propertiesinportugal.com${p.image || "/img/preload.png"}`,
    agency: agencyFor(p.agency, i),
    features,
    ref: p.ref || `SCR-${100 + i}`,
    status: "Live",
    featured: false,
    source: "scraped",
    sourceUrl: p.sourceUrl,
    energyRating: null,
    description:
      p.description ||
      "Listing imported from the live Properties in Portugal catalogue.",
  };
});
export const properties = [...baseProperties, ...scrapedProperties];
export const developments = [
  {
    slug: "atlantic-residences",
    name: "Atlantic Residences",
    place: "Cascais, Lisbon Coast",
    from: 675000,
    beds: "2–4 bedroom apartments",
    completion: "Q3 2027",
    available: 12,
    image: img("1600607688969-a5bfcd646154"),
    copy: "A limited collection of light-filled residences overlooking the Atlantic, shaped around gardens, wellness and the rhythm of the coast.",
    amenities: [
      "Residents’ pool",
      "Private gardens",
      "Concierge",
      "Wellness studio",
      "EV parking",
    ],
  },
  {
    slug: "palmares-gardens",
    name: "Palmares Gardens",
    place: "Lagos, Algarve",
    from: 540000,
    beds: "2–3 bedroom residences",
    completion: "Q1 2028",
    available: 18,
    image: img("1600566753086-00f18fb6b3ea"),
    copy: "Contemporary Algarve homes where landscape, architecture and long coastal views meet.",
    amenities: [
      "Ocean views",
      "Golf access",
      "Pool deck",
      "Landscape gardens",
      "24-hour security",
    ],
  },
  {
    slug: "the-river-foundry",
    name: "The River Foundry",
    place: "Vila Nova de Gaia, Porto",
    from: 420000,
    beds: "1–3 bedroom lofts",
    completion: "Q4 2027",
    available: 9,
    image: img("1600566753190-17f0baa2a6c3"),
    copy: "Heritage brickwork and crisp new architecture on the Douro riverfront, moments from Porto.",
    amenities: [
      "River terrace",
      "Co-working lounge",
      "Gym",
      "Bicycle store",
      "Concierge",
    ],
  },
].map((d, di) => ({
  ...d,
  units: Array.from({ length: 6 }, (_, i) => ({
    unit: `${String.fromCharCode(65 + di)}${101 + i}`,
    type: `${Math.min(4, 1 + (i % 4))} Bed`,
    size: 78 + i * 17,
    price: d.from + i * 65000,
    status: i === 4 ? "Reserved" : i === 5 ? "Sold" : "Available",
  })),
}));
export const enquiries = [
  {
    id: 1,
    name: "Sophie Bennett",
    country: "United Kingdom",
    property: "Villa Mar Luz",
    message:
      "We will be in Lagos next month and would love to arrange a viewing.",
    status: "New",
    time: "18 min ago",
  },
  {
    id: 2,
    name: "Thomas Meyer",
    country: "Germany",
    property: "Casa da Falésia",
    message: "Could you share the running costs and current availability?",
    status: "New",
    time: "2 hours ago",
  },
  {
    id: 3,
    name: "Nadia Chen",
    country: "Singapore",
    property: "Atelier Chiado",
    message:
      "I am buying from overseas. Can your team support a virtual viewing?",
    status: "Contacted",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Marc Dubois",
    country: "France",
    property: "Estoril Ocean Residence",
    message: "Is the furniture package included in the asking price?",
    status: "Viewing Arranged",
    time: "2 days ago",
  },
];
