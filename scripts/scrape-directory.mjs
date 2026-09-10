import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ORIGIN = "https://www.propertiesinportugal.com";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const decode = (value = "") => value.replace(/<br\s*\/?\s*>/gi, ", ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#039;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
const absolute = (url = "") => (url.startsWith("http") ? url : `${ORIGIN}${url}`);
async function get(url) { const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 directory refresh" } }); if (!response.ok) throw new Error(`${response.status} ${url}`); return response.text(); }

async function scrapeAgencies() {
  const rows = [];
  for (let page = 1; page <= 30; page += 1) {
    const html = await get(`${ORIGIN}/agents${page === 1 ? "" : `?User_page=${page}`}`);
    const blocks = [...html.matchAll(/<div class="agent pb-4">([\s\S]*?)<\/ul>\s*<\/div>/gi)].map((m) => m[1]);
    for (const block of blocks) {
      const profilePath = block.match(/href="([^"]+\/properties\/for-sale)"/i)?.[1];
      const name = decode(block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1]);
      if (!profilePath || !name) continue;
      const logoPath = block.match(/<img[^>]+data-src="([^"]+)"/i)?.[1] || block.match(/<img[^>]+src="([^"]+)"/i)?.[1] || "";
      rows.push({ slug: profilePath.split("/").filter(Boolean)[0], name, ami: decode(block.match(/AMI\s*([0-9]+)/i)?.[1]), logoUrl: /preload\.png|^\/?$/i.test(logoPath) ? "" : absolute(logoPath), sourceUrl: absolute(profilePath), propertyCount: Number(block.match(/<span>([0-9]+)<\/span>\s*properties available/i)?.[1] || 0), location: decode(block.match(/<address[^>]*>([\s\S]*?)<\/address>/i)?.[1]) });
    }
  }
  return [...new Map(rows.map((row) => [row.sourceUrl, row])).values()];
}

async function scrapeNews() {
  const html = await get(`${ORIGIN}/news`);
  const links = [...html.matchAll(/<a href="(\/news\/[^"]+)"[^>]*>\s*<img[^>]+class="[^"]*news-thumb[^"]*"[^>]+src="([^"]+)"[^>]*>/gi)];
  return links.map((match, index) => { const [, path, imageUrl] = match; const next = links[index + 1]?.index || html.length; const block = html.slice(match.index, next); return { title: decode(block.match(/<a href="\/news\/[^"]+"[^>]*class="fs-5[^>]*>([\s\S]*?)<\/a>/i)?.[1]), summary: decode(block.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]), imageUrl: absolute(imageUrl), sourceUrl: absolute(path) }; }).filter((row) => row.title).slice(0, 24);
}

async function scrapeListings() {
  const rows = [];
  for (let page = 1; page <= 6; page += 1) {
    const query = new URLSearchParams({ sort: "latest" });
    if (page > 1) query.set("Property_page", String(page));
    const html = await get(`${ORIGIN}/properties/for-sale/portugal/-/-/-?${query}`);
    const blocks = [...html.matchAll(/<div class="property h-100">([\s\S]*?)<a href="(\/property\/[^"]+)" class="stretched-link"><\/a>/gi)];
    for (const [, block, propertyPath] of blocks) {
      const photoBlock = block.match(/<div class="property-img">([\s\S]*?)<\/div>/i)?.[1] || "";
      const imagePath = photoBlock.match(/<img[^>]+data-src="([^"]+)"/i)?.[1] || photoBlock.match(/<img[^>]+src="([^"]+)"/i)?.[1] || "";
      rows.push({
        name: decode(block.match(/<h4[^>]*class="property-name"[^>]*>([\s\S]*?)<\/h4>/i)?.[1]),
        location: decode(block.match(/<div[^>]*class="property-location[^>]*>([\s\S]*?)<\/div>/i)?.[1]),
        description: decode(block.match(/<p[^>]*class="property-description"[^>]*>([\s\S]*?)<\/p>/i)?.[1]),
        image: imagePath,
        area: decode(block.match(/<span class="area"[\s\S]*?<\/span>/i)?.[0]).replace(/m²/i, ""),
        beds: decode(block.match(/<span class="bedrooms"[\s\S]*?<\/span>/i)?.[0]),
        baths: decode(block.match(/<span class="bathrooms"[\s\S]*?<\/span>/i)?.[0]),
        ref: decode(block.match(/<span class="small">Ref\.\s*([\s\S]*?)<\/span>/i)?.[1]),
        price: decode(block.match(/<div class="property-price"><span>([\s\S]*?)<\/span>/i)?.[1]),
        agency: decode(block.match(/class="property-agent[\s\S]*?<img[^>]+alt="([^"]+)"/i)?.[1]),
        sourceUrl: absolute(propertyPath),
      });
    }
  }
  return [...new Map(rows.map((row) => [row.sourceUrl, row])).values()];
}

const [agencies, news, listings] = await Promise.all([scrapeAgencies(), scrapeNews(), scrapeListings()]);
const scrapedAt = new Date().toISOString();
await Promise.all([writeFile(resolve(root, "src/scraped-agencies.json"), `${JSON.stringify({ source: `${ORIGIN}/agents`, scrapedAt, records: agencies }, null, 2)}\n`), writeFile(resolve(root, "src/scraped-news.json"), `${JSON.stringify({ source: `${ORIGIN}/news`, scrapedAt, records: news }, null, 2)}\n`), writeFile(resolve(root, "src/scraped-listings.json"), `${JSON.stringify(listings, null, 2)}\n`)]);
console.log(`Saved ${agencies.length} agencies, ${news.length} news stories, and ${listings.length} latest listings.`);
