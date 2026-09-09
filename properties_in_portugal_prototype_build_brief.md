# Properties in Portugal 2.0 — Marketplace Prototype Build Brief

**Project:** Properties in Portugal — Website / Marketplace Prototype  
**Prototype name:** Properties in Portugal 2.0  
**Build type:** Functional high-fidelity web prototype  
**Date:** September 2026  
**Primary reference website:** https://www.propertiesinportugal.com  
**Prepared for:** Demo / client presentation  
**Objective:** Demonstrate what a modern rebuilt Properties in Portugal platform could look and feel like before committing to full migration and production rollout.

---

## 1. Project Context

Properties in Portugal is an existing Portuguese property portal associated with the Properties in Portugal publication / The Portugal News ecosystem.

The current website should be treated as the **functional and content baseline**, not the visual design target.

### Existing website reference

- Main website: https://www.propertiesinportugal.com
- Existing concept:
  - Portuguese property marketplace / portal
  - Property listings from multiple estate agencies
  - Individual property pages
  - Property search and filtering
  - Agency/client pages
  - Property enquiry/contact functionality
  - Editorial / magazine connection
  - International audience looking to buy property in Portugal

The current site already has a substantial catalogue of property opportunities. Properties in Portugal publications describe the online portal as a destination where users can browse thousands of Portuguese properties, and the property ecosystem is designed to connect international buyers with estate agents and developers.

### Important instruction

Do **not** attempt a pixel-for-pixel clone of the existing website.

The prototype should:

1. Preserve the existing product idea and core information architecture.
2. Use the existing site as a content/data reference.
3. Reimagine the UI as a premium modern property marketplace.
4. Demonstrate a stronger search and discovery experience.
5. Demonstrate agency-facing tools.
6. Introduce **New Developments** as a major product vertical.
7. Create an architecture that could later become the production platform.

---

# 2. Prototype Goal

The prototype is intended to make the client feel like they are already looking at the next generation of Properties in Portugal.

The demo should answer:

> "What would Properties in Portugal look like if it were rebuilt today as a modern digital property marketplace and agency platform?"

This is **not** a complete migration project yet.

The prototype should prioritise:

- Strong visual polish
- Realistic property data
- Great property discovery
- Smooth user journeys
- Agency value
- New Developments
- Mobile responsiveness
- Conversion-focused property pages

The prototype does **not** need every future production feature.

---

# 3. Core Demo Pillars

Build the prototype around these five pillars:

## Pillar 1 — Real Property Data

Scrape/import a controlled sample of real listings from the existing Properties in Portugal site.

Target:

- Approximately **80–150 properties**
- Approximately **4–6 real agencies**
- Multiple Portuguese regions
- Enough variety to make filtering/search feel real

Recommended regional mix:

- Algarve
- Lisbon
- Cascais / Estoril
- Porto
- Madeira
- Silver Coast / Central Portugal

Capture where available:

- Property title
- Price
- Location
- Region
- Bedrooms
- Bathrooms
- Property type
- Floor area
- Plot area
- Description
- Property reference number
- Images
- Agency/client
- Agency logo
- Agency contact details
- Source URL
- Listing status

Recommended number of images:

- 5–15 per property where available

### Demo property tags

Add/normalise useful tags to improve discovery:

- Sea View
- Swimming Pool
- New Build
- New Development
- Golf
- Luxury
- Investment
- Beach Nearby
- Garage
- Reduced Price
- Furnished
- Garden
- Terrace

The tags do not all need to exist on the source site. They may be derived or seeded for demo purposes where appropriate.

---

# 4. Data Migration / Scraping Strategy

## Prototype approach

For the prototype, scraping is acceptable because only a controlled subset of listings is needed.

Create a small ingestion pipeline:

```text
Existing Properties in Portugal Website
                ↓
           Scraper
                ↓
       Raw Listing Data
                ↓
        Normalisation
                ↓
      Duplicate Detection
                ↓
         Application DB
```

### Duplicate detection

At minimum compare:

- Source URL
- Property reference number
- Agency + reference number
- Normalised title + price + location

Do not intentionally import duplicate properties.

### Property statuses

Support:

- Live
- Under Offer
- Sold
- Withdrawn
- Draft

Only `Live` listings should appear in normal public search results by default.

### Production direction

The future production platform should not rely primarily on scraping.

The architecture should anticipate:

```text
Agency CRM / Property System
            ↓
XML / JSON / CSV / API
            ↓
      Import Engine
            ↓
 Validation / Normalisation
            ↓
    Duplicate Detection
            ↓
        Main Database
            ↓
 Properties in Portugal
```

The prototype's agency portal should visually demonstrate this future feed workflow.

---

# 5. Public Website — Required Routes

The prototype should include the following core routes.

```text
/
 /properties
 /properties/[slug]
 /agencies
 /agencies/[slug]
 /developments
 /developments/[slug]

 /account/favourites                optional if time permits
 /account/saved-searches            optional if time permits

 /agency
 /agency/properties
 /agency/properties/[id]
 /agency/enquiries
 /agency/analytics
 /agency/feed
 /agency/profile
 /agency/settings
```

Optional placeholder routes:

```text
/mortgage
/legal-support
/buying-in-portugal
/magazine
```

Mortgage and legal support can be visually represented in the prototype without requiring full backend workflows.

---

# 6. Homepage

The homepage should immediately feel more premium than the current website.

## Design concept

Think:

- Premium Portuguese real estate editorial
- Modern marketplace
- Airbnb-level imagery
- Rightmove-style usefulness
- Apple-like cleanliness
- Luxury editorial spacing
- Contemporary European property brand

Avoid:

- Generic WordPress real estate theme appearance
- Heavy boxed UI
- Excessive borders
- Small dense text
- Old-school directory styling
- Overuse of gradients
- Clutter

---

## Homepage structure

### 6.1 Header

Desktop:

```text
LOGO

Buy
New Developments
Explore Portugal
Agencies
Buying Guide

                        Saved
                        Sign In
```

Potential CTA:

`List with us`

Header should become compact/sticky after scroll.

---

## 6.2 Hero

Suggested copy:

# Find your place in Portugal.

Subcopy:

> Discover homes, investments and new developments from trusted property professionals across Portugal.

Primary search UI:

```text
[ Where do you want to live?                           ]
[ Buy ] [ Property Type ] [ Price ] [ Bedrooms ] [ Search ]
```

Popular quick destinations:

- Algarve
- Lisbon
- Cascais
- Porto
- Madeira
- Silver Coast

Use high-quality property/location imagery.

---

## 6.3 Featured Properties

Show visually strong property cards.

Prefer 6–8 properties.

Each card should contain:

- Hero image
- Save/favourite icon
- Price
- Title
- Location
- Bedroom count
- Bathroom count
- Floor area
- Agency logo/name

---

## 6.4 Explore Portugal

Large destination tiles for:

- Algarve
- Lisbon
- Cascais
- Porto
- Madeira
- Silver Coast

Each destination card can display a property count.

---

## 6.5 New Developments

Feature 3 developments.

Card example:

```text
Atlantic Residences
Cascais, Lisbon Coast

From €675,000
2–4 Bedroom Apartments
Completion Q3 2027

23 units available
```

CTA:

`Explore New Developments`

---

## 6.6 Trusted Agencies

Agency logo strip / carousel.

Clicking opens the agency page.

---

## 6.7 Buying in Portugal

Create premium service cards:

### Mortgage Calculator
Estimate monthly payments and borrowing requirements.

### Legal & Notary Support
Understand the Portuguese purchase process and request professional support.

### Buying Guide
A simple guide for international buyers.

Only the UI is mandatory for the demo.

---

## 6.8 Editorial / Magazine

Optional but recommended.

Use the existing Properties in Portugal magazine relationship as part of the homepage.

Possible section:

> Property insight, locations and market stories from Portugal.

---

# 7. Property Search Experience

Route:

`/properties`

This should be one of the strongest parts of the prototype.

---

## 7.1 Search header

Example:

```text
Properties for Sale in Portugal                      1,248 homes

[Location] [Property Type] [Price] [Beds] [More Filters]

Sort: Recommended                            [Grid] [Map]
```

---

## 7.2 Filters

Required working filters for demo data:

### Main filters

- Location
- Property type
- Minimum price
- Maximum price
- Bedrooms

### Advanced filters

- Bathrooms
- Floor area
- Plot size
- Swimming pool
- Sea view
- New development
- Golf
- Garage
- Reduced price
- Recently added

Potential property types:

- Apartment
- Villa
- House
- Townhouse
- Land
- Farm
- Commercial
- Penthouse
- Studio
- Development

Filters should update results without a full page refresh.

URL query parameters are strongly preferred.

Example:

```text
/properties?location=algarve&type=villa&minPrice=400000&maxPrice=900000&beds=3
```

---

## 7.3 Sort

Support:

- Recommended
- Newest
- Price low to high
- Price high to low

---

# 8. Property Cards

Property cards should be considerably cleaner than the current site.

Recommended structure:

```text
┌──────────────────────────────────┐
│                                  │
│          PROPERTY IMAGE          │
│                             ♡    │
│                                  │
├──────────────────────────────────┤
│ €875,000                         │
│ Modern 3 Bedroom Villa           │
│ Lagos, Algarve                   │
│                                  │
│ 3 Bed · 3 Bath · 214 m²          │
│                                  │
│ [Agency Logo] Agency Name        │
└──────────────────────────────────┘
```

### Interaction

Recommended:

- Hover image subtly zooms
- Optionally preview second photo on hover
- Favourite animation
- Card click opens property detail page
- Agency name/logo should be clickable

---

# 9. Map Search

Map search is a required demo feature if technically practical.

Desktop split-screen:

```text
┌───────────────────────────────┬──────────────────────────────┐
│                               │                              │
│           LISTINGS            │             MAP              │
│                               │                              │
│ [Property Card]               │      €895k                   │
│                               │                              │
│ [Property Card]               │  €420k          €1.2m        │
│                               │                              │
│ [Property Card]               │          €630k               │
│                               │                              │
└───────────────────────────────┴──────────────────────────────┘
```

Map requirements:

- Property price markers
- Click marker → compact property preview
- Clicking preview → property detail page
- Map results should correspond to current search where coordinates exist

Acceptable map providers:

- Mapbox
- Google Maps
- OpenStreetMap-based solution

For demo listings missing accurate coordinates, approximate region/town coordinates may be seeded.

---

# 10. Property Detail Page

Route:

`/properties/[slug]`

This page must feel premium and conversion focused.

---

## 10.1 Gallery

Use a modern image gallery.

Desktop concept:

```text
┌────────────────────────────────────────┬──────────────────┐
│                                        │                  │
│                                        │      IMAGE       │
│              MAIN IMAGE                ├──────────────────┤
│                                        │      IMAGE       │
│                                        │         +8       │
└────────────────────────────────────────┴──────────────────┘
```

Click opens fullscreen/lightbox gallery.

---

## 10.2 Property summary

Example:

```text
€895,000

Contemporary 4 Bedroom Villa with Pool
Lagos, Algarve

4 Bedrooms
3 Bathrooms
216 m² interior
620 m² plot

Ref: PIP-ALG-23847
```

Primary CTAs:

- Contact Agent
- WhatsApp
- Save Property
- Share

---

## 10.3 Property information

Sections:

### Overview

### Features

### Property description

### Location

### Mortgage estimate

### Similar properties

---

## 10.4 Sticky agent/contact panel

Desktop right side:

```text
B&P Real Estate

[Agency Logo]

Maria Ferreira
Property Consultant

Name
Email
Phone
Message

[ Request Information ]

[ WhatsApp ]
[ Call ]
```

The contact/enquiry form should actually work inside the demo application by storing the enquiry.

No real email delivery is necessary unless trivial to implement.

---

# 11. Agency Public Profiles

Routes:

```text
/agencies
/agencies/[slug]
```

Agency profile should show:

- Logo
- Agency name
- Active listing count
- About agency
- Areas served
- Phone
- Email
- Website
- Office location where available
- Property portfolio

Example:

```text
Fine & Country Algarve

247 active listings

About
--------------------------------------------------
Fine & Country Algarve specialises in...

Areas served:
Lagos · Portimão · Albufeira · Vilamoura

[Contact Agency]
[Visit Website]

Properties from Fine & Country Algarve
```

---

# 12. Agency Portal

The prototype should include a believable agency-facing product.

This does not need production-grade multi-tenant SaaS infrastructure yet.

A demo account may be preconfigured.

Route base:

`/agency`

---

## 12.1 Agency dashboard

Example:

```text
Good morning, Fine & Country Algarve

Active Listings        247
New Enquiries           18
Property Views        4,821
Saved Properties       312
```

Include a simple chart:

**Listing Views — Last 30 Days**

Sidebar:

```text
Overview
Properties
Enquiries
Analytics
Feed Integration
Agency Profile
Settings
```

---

# 13. Agency Properties

Route:

`/agency/properties`

Display as table or sophisticated list.

Example:

| Property | Price | Location | Views | Status |
|---|---:|---|---:|---|
| Villa Vista | €895k | Lagos | 821 | Live |
| Casa Azul | €620k | Faro | 493 | Live |
| Marina Apartment | €410k | Lagos | 389 | Under Offer |

Actions:

- Edit
- Preview
- Feature
- Mark Under Offer
- Mark Sold
- Archive

Primary CTA:

`+ Add Property`

---

# 14. Add/Edit Property

Route:

`/agency/properties/[id]`

Demo form should support:

- Title
- Description
- Price
- Location
- Coordinates
- Bedrooms
- Bathrooms
- Floor area
- Plot size
- Property type
- Features/tags
- Reference number
- Status
- Images

It is acceptable for uploaded demo images to use local/demo storage.

The important part is to demonstrate that agencies can manage their own listings.

---

# 15. Agency Enquiries

Route:

`/agency/enquiries`

Example card:

```text
NEW ENQUIRY

Villa Vista — €895,000

John Smith
United Kingdom

"I'm planning to visit Portugal next month and would
like to arrange a viewing."

john@example.com
+44 ...

[Reply]
[WhatsApp]
[Mark Contacted]
```

Statuses:

- New
- Contacted
- Viewing Arranged
- Closed

At least status change should work.

---

# 16. Agency Analytics

Route:

`/agency/analytics`

Use demo/seeded analytics.

Metrics may include:

- Property views
- Enquiries
- Saves
- Contact conversion rate
- Most viewed properties
- Most enquired properties
- Search appearances

Do not overbuild analytics.

This page exists mainly to demonstrate future value to agencies.

---

# 17. Feed Integration Demo

Route:

`/agency/feed`

This is strategically important.

The screen should demonstrate how an agency could connect its existing property management system to Properties in Portugal.

Example:

```text
Listing Feed

Connection Status
● Connected

Feed Type
XML

Listings discovered
248

Last synchronisation
Today, 21:43

Next synchronisation
00:43

[Sync Now]
[Update Feed]
```

Sync summary:

```text
Added        3
Updated     11
Removed      2
Errors       1
```

Show recent import activity.

It is acceptable for most of this data to be mocked/seeded.

If possible, connect the `Sync Now` button to the actual prototype scraper/import job.

---

# 18. New Developments

New Developments should be treated as a first-class product category.

Do not implement this as merely another property filter.

Routes:

```text
/developments
/developments/[slug]
```

---

## 18.1 Developments listing page

Hero:

# New Developments in Portugal

Subcopy:

> Discover new-build apartments, villas and investment opportunities from leading developers across Portugal.

Filters:

- Location
- Price
- Bedrooms
- Completion date
- Developer

Development card:

```text
[Large Development Image]

Atlantic Residences
Cascais, Lisbon Coast

From €675,000

2–4 Bedroom Apartments
Completion Q3 2027

23 units available
```

---

# 19. Development Detail Page

Make this feel closer to a premium launch microsite than a standard property page.

Example:

# Atlantic Residences

Cascais, Portugal

**From €675,000**

Sections:

- Overview
- Residences
- Gallery
- Amenities
- Location
- Availability
- Developer
- Brochure
- Contact

---

## 19.1 Unit availability

Example:

| Unit | Type | Size | Price | Status |
|---|---|---:|---:|---|
| A101 | 2 Bed | 112 m² | €675,000 | Available |
| A203 | 3 Bed | 154 m² | €890,000 | Available |
| PH1 | 4 Bed | 241 m² | €1,800,000 | Reserved |

Statuses:

- Available
- Reserved
- Sold

---

## 19.2 Development enquiry

CTA:

`Request Development Information`

Capture:

- Name
- Email
- Phone
- Country
- Message
- Interested unit / bedroom type

Store enquiry in the database.

---

# 20. Demo New Developments Data

Create approximately **3 demo developments**.

These do not have to be scraped from the current website.

They can use believable placeholder/mock data inspired by Portuguese property developments.

Recommended demo areas:

1. Cascais / Lisbon Coast
2. Lagos / Algarve
3. Porto / Vila Nova de Gaia

Each should contain:

- Hero imagery
- Development description
- Price from
- 6–20 sample units
- Amenities
- Developer
- Location
- Completion date
- Gallery
- Unit availability

Clearly keep fabricated demo content separate from scraped real property content in the data layer.

---

# 21. Favourites

If time permits, implement simple favourites.

Logged-in persistence is ideal, but local storage is acceptable for prototype.

UI:

`♡ Save`

Saved items could appear under:

`/account/favourites`

This is not more important than property search, agency portal or developments.

---

# 22. Saved Searches

Optional prototype feature.

A user can save a query such as:

```text
Algarve
Villa
€400k–€700k
3+ bedrooms
Pool
```

Potential future behaviour:

> 5 new properties match your search.

Actual notification delivery is not required in prototype.

---

# 23. Mortgage Module

The original client brief requests a Mortgage Simulator.

For this prototype it may be implemented as a polished visual/functional calculator rather than a full lender integration.

Route:

`/mortgage`

Inputs:

- Property price
- Deposit
- Mortgage amount
- Loan term
- Interest rate

Output:

- Estimated monthly payment
- Deposit amount
- Loan amount

Example:

```text
Property Price       €450,000
Deposit               €90,000
Mortgage              €360,000
Term                  30 years
Interest Rate         3.3%

Estimated Payment
€1,577 / month
```

CTA:

`Get Mortgage Assistance`

Future commercial direction:

- Mortgage broker referrals
- Lender partnerships
- Qualified lead generation

This module is secondary to the five main prototype pillars.

---

# 24. Legal & Notary Support

The original client brief requests a legal/notary section.

Prototype route:

`/legal-support`

Suggested experience:

# Buying Property in Portugal

Visual buying journey:

```text
1. Property selected
        ↓
2. Legal due diligence
        ↓
3. Promissory contract
        ↓
4. Financing
        ↓
5. Notary & deed
        ↓
6. Property registration
```

Then ask:

> What stage are you at?

Options:

- I have not found a property
- I have made an offer
- I need a lawyer
- I need a notary
- I am buying from overseas

CTA:

`Request Legal Support`

For prototype, submitting the form only needs to store an enquiry.

---

# 25. Visual Design Direction

## Brand personality

The UI should communicate:

- Portugal
- International property
- Trust
- Warmth
- Quality
- Editorial sophistication
- Modern technology
- Premium but approachable

---

## Visual references

Aim for the cleanliness and product quality associated with:

- Airbnb
- Apple
- Linear
- Stripe
- Rightmove / Zoopla style usefulness
- Premium architecture magazines
- Luxury European property sites

Do not copy any specific site exactly.

---

## Layout

Use:

- Large white / warm neutral spaces
- Strong editorial photography
- Large typography where appropriate
- Rounded but not excessively pill-shaped components
- Clean filtering controls
- Clear hierarchy
- Subtle shadows
- Smooth micro-interactions
- Refined skeleton loaders
- Sticky contextual navigation
- Premium cards

---

## Colour

Prefer a sophisticated Portugal/property palette.

Possible direction:

- Warm off-white / cream
- Deep charcoal
- Muted forest / olive green
- Sand / stone neutral
- Portuguese blue used sparingly
- White

Avoid making the interface overly colourful.

---

## Typography

Use a modern sans-serif UI font.

Optional editorial serif for large marketing headings only.

Typography must remain highly readable.

---

# 26. Mobile Experience

The prototype must be genuinely responsive.

Do not build desktop first and leave mobile broken.

Important mobile behaviours:

- Search filters open in bottom sheet/fullscreen drawer
- Property gallery works with swipe
- Sticky `Contact Agent` CTA
- Map/list toggle
- Bottom-friendly touch targets
- Agency dashboard responsive where practical
- Development unit table becomes cards on smaller screens

---

# 27. Suggested Technical Stack

Recommended:

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Component architecture suitable for production evolution

Optional:

- shadcn/ui primitives where useful
- Framer Motion / Motion for subtle interaction

---

## Backend

Good options:

- Next.js API/server actions for speed during prototype

or

- NestJS if building a separated API from the beginning

Do not overengineer the prototype.

---

## Database

PostgreSQL

ORM:

- Prisma or Drizzle

---

## Search

For prototype scale, PostgreSQL-backed filtering is sufficient.

Do **not** add Elasticsearch unless required.

Future architecture may migrate search to:

- Typesense
- Meilisearch
- Elasticsearch / OpenSearch

---

## Scraping / import

Recommended:

- Python
- BeautifulSoup / requests when possible
- Playwright only where necessary

Store scraper source URL and import metadata.

Be respectful of source site load.

This is a controlled prototype migration, not aggressive crawling.

---

## Images

Preferred:

- Object storage such as S3-compatible storage

Prototype acceptable:

- Remote source image URLs where stable
- Local seed images
- Supabase Storage / Cloudflare R2 / S3

If feasible, import copies instead of hotlinking.

---

## Maps

Recommended:

- Mapbox

Alternatives:

- Google Maps
- Leaflet + OpenStreetMap

---

# 28. Core Data Model

At minimum create the following entities.

---

## User

```text
id
name
email
password/auth-provider
role
createdAt
updatedAt
```

Roles:

- Buyer
- AgencyUser
- Admin

---

## Agency

```text
id
name
slug
logo
description
email
phone
website
address
regionsServed
sourceUrl
createdAt
updatedAt
```

---

## AgencyUser

```text
id
userId
agencyId
role
```

---

## Property

```text
id
agencyId
title
slug
description
price
currency
propertyType
status
referenceNumber

bedrooms
bathrooms
floorArea
plotArea

address
city
region
country
latitude
longitude

sourceUrl
sourceUpdatedAt

featured
createdAt
updatedAt
```

---

## PropertyImage

```text
id
propertyId
url
alt
sortOrder
```

---

## PropertyFeature

```text
id
propertyId
feature
```

---

## Development

```text
id
developerId
name
slug
description
location
region

priceFrom
completionDate

latitude
longitude

heroImage
status

createdAt
updatedAt
```

---

## DevelopmentUnit

```text
id
developmentId
unitNumber
type
bedrooms
bathrooms
floorArea
price
status
```

---

## Developer

```text
id
name
slug
logo
description
website
contactDetails
```

---

## Enquiry

```text
id
type
propertyId
developmentId
agencyId

name
email
phone
country
message

status
createdAt
updatedAt
```

Types:

- Property
- Agency
- Development
- Mortgage
- Legal

---

## Favourite

```text
id
userId
propertyId
createdAt
```

---

## SavedSearch

```text
id
userId
name
queryJson
createdAt
```

---

## ImportSource

```text
id
agencyId
type
url
status
lastSyncAt
createdAt
updatedAt
```

Types:

- Scraper
- XML
- API
- CSV

---

## ImportRun

```text
id
importSourceId
startedAt
completedAt
status

discovered
added
updated
removed
errors
```

---

# 29. Suggested Seed / Demo Analytics

Agency dashboards should feel alive.

Use believable but clearly seeded internal analytics.

Example:

```text
Active Listings: 247
New Enquiries: 18
Property Views: 4,821
Saved Properties: 312
```

Generate 30 days of chart data.

Do not claim demo analytics are real.

---

# 30. Core Demo User Journeys

The following flows should be smooth enough to present live.

---

## Journey 1 — Property discovery

1. User lands on homepage.
2. Searches Algarve.
3. Opens property results.
4. Selects Villa.
5. Sets €400k–€900k.
6. Sets 3+ bedrooms.
7. Results update.
8. User opens a property.
9. User views gallery.
10. User submits an enquiry.

---

## Journey 2 — Map discovery

1. User searches properties.
2. Switches to map.
3. Clicks a price marker.
4. Preview card appears.
5. User opens property.

---

## Journey 3 — New Development

1. User clicks New Developments.
2. Opens a premium development.
3. Browses gallery.
4. Reviews amenities.
5. Reviews unit availability.
6. Selects an available unit.
7. Sends enquiry.

---

## Journey 4 — Agency account

1. Demo agency signs in.
2. Dashboard loads.
3. Agency sees analytics.
4. Agency opens Properties.
5. Agency edits a listing.
6. Agency marks a listing Under Offer.
7. Public status updates.

---

## Journey 5 — Lead management

1. Buyer submits property enquiry.
2. Agency opens Enquiries.
3. Agency sees buyer request.
4. Agency marks enquiry Contacted.

---

## Journey 6 — Feed integration

1. Agency opens Feed Integration.
2. Sees connected XML feed.
3. Sees last sync.
4. Sees Added / Updated / Removed counts.
5. Clicks Sync Now.
6. UI displays successful sync activity.

This may be backed by a demo job.

---

# 31. Prototype Authentication

Do not spend excessive time on production auth.

Acceptable:

- Clerk
- Auth.js
- Supabase Auth
- Simple demo auth

Create at least:

### Agency Demo User

Access:

- Agency dashboard
- Properties
- Enquiries
- Analytics
- Feed
- Profile

### Buyer account

Optional.

---

# 32. Admin

A dedicated production admin is not necessary for the initial demo.

If convenient, create minimal internal tooling for:

- Property import
- Agency management
- Development management

Otherwise seed directly through DB scripts.

Agency tools matter more visually.

---

# 33. SEO / Performance Expectations

Even as a prototype, structure pages properly.

Use:

- Semantic headings
- Metadata
- OpenGraph metadata
- Descriptive image alt text
- Search-friendly route slugs
- SSR/SSG where sensible
- Optimised images
- Lazy loading
- Responsive image sizes

Potential future structured data:

- RealEstateListing
- Organization
- BreadcrumbList

Production SEO migration is outside prototype scope.

---

# 34. Accessibility

Aim for reasonable WCAG-friendly behaviour.

At minimum:

- Good contrast
- Keyboard-accessible primary UI
- Form labels
- Focus states
- Alt text
- Semantic buttons and links
- Accessible modals/dialogs

---

# 35. What Must Actually Work

The prototype should not be a collection of dead screens.

The following should actually function:

- Property dataset loading
- Property listing pages
- Property filtering
- Price filtering
- Bedroom filtering
- Property type filtering
- Location filtering
- Sort
- Property details
- Gallery
- Agency profiles
- Property-to-agency relationship
- Property enquiry form
- Enquiry storage
- New Developments list
- Development detail page
- Development units
- Agency dashboard navigation
- Agency properties table
- Editing at least basic property fields
- Changing property status
- Agency enquiries
- Feed integration screen
- Responsive layout

Strongly preferred:

- Map search
- Favourites
- Working Sync Now demo
- Mortgage calculator

---

# 36. What Can Be Mocked / Seeded

It is acceptable to mock:

- Analytics
- Feed performance history
- Development records
- Developer information
- Buyer notification system
- Subscription/billing information
- Email delivery
- Mortgage lender results
- Legal professional matching
- CRM integrations

Do not visually present seeded data as externally verified live data.

---

# 37. Explicitly Out of Scope for Prototype

Do **not** burn development time on:

- Complete existing site migration
- Scraping every current listing
- Every agency integration
- Production billing
- Agency subscription payments
- Full CRM
- Production XML onboarding for every agency
- Complex agency permissions
- Advanced AI property search
- AI agent
- Native mobile app
- Push notifications
- Full multilingual implementation
- Mortgage provider integrations
- Legal provider marketplace backend
- Full messaging system
- Production email infrastructure
- Full production SEO migration
- Advanced duplicate reconciliation
- Massive scale search infrastructure
- Automated translation
- Production data contracts / licensing workflow

The demo exists to prove the direction.

---

# 38. Future Product Opportunities

The architecture should not block these later additions.

## Buyer accounts

Future dashboard:

```text
Saved Homes        12
Saved Searches      3
Agent Messages      4
Viewings             2
```

---

## AI property search

Future concept:

> Find me a modern villa near Lagos under €850,000, at least three bedrooms, preferably with a pool and less than 15 minutes from the beach.

The AI should query structured property data.

Potential follow-ups:

> Compare these three.

> Show me something similar closer to Faro.

> Which has the best value per square metre?

Not required in the prototype.

---

## New development monetisation

Potential:

- Sponsored developments
- Paid developer profiles
- Featured placement
- Lead generation
- Brochure downloads
- Off-plan advertising packages

---

## Agency monetisation

Potential future plans:

### Starter

- 50 properties
- Agency profile
- Leads

### Professional

- Up to 500 properties
- Feed sync
- Analytics
- Featured listings

### Enterprise

- Unlimited / negotiated listings
- Multiple branches
- API access
- Lead integrations
- Priority placement

Pricing is outside demo scope.

---

# 39. Other Monetisation Opportunities

Future opportunities to keep in mind:

- Featured property placement
- Sponsored agency positioning
- Agency subscriptions
- Developer subscriptions
- Pay-per-lead
- Mortgage referral fees
- Legal/notary referral fees
- Relocation partnerships
- New development promotions
- Magazine + portal advertising packages
- Premium agency profiles
- International buyer services
- Property management referrals
- Insurance referrals

Do not implement these billing flows yet.

---

# 40. Product Positioning

The prototype should support this broader vision:

> Properties in Portugal should evolve from a traditional property directory into a modern property marketplace, agency distribution platform and international buyer ecosystem.

The key transformation is:

```text
Old Model
Property Listings Website

             ↓

New Model
Property Marketplace
+ Agency Platform
+ New Developments
+ Buyer Services
+ Lead Generation
+ Data Distribution
```

---

# 41. Demo Data Target

Aim for:

```text
80–150 properties
4–6 real agencies
5–6 major regions
3 demo new developments
15–40 development units
1 demo agency user
20–30 demo enquiries
30 days seeded analytics
```

Do not let data collection block UI progress.

If scraping proves difficult, begin with a smaller usable sample and seed additional records using the same schema.

---

# 42. Recommended Build Order

## Phase A — Foundation

1. Initialise application
2. Create design system
3. Create DB schema
4. Seed agencies
5. Build scraper/importer
6. Import initial properties

---

## Phase B — Public Marketplace

1. Header/navigation
2. Homepage
3. Property search
4. Filters
5. Property cards
6. Property detail
7. Agency profiles
8. Enquiry form

---

## Phase C — Discovery Upgrade

1. Advanced filters
2. Sort
3. Map view
4. Favourites
5. Similar properties

---

## Phase D — New Developments

1. Developments index
2. Development cards
3. Development detail
4. Units
5. Development enquiry

---

## Phase E — Agency Portal

1. Dashboard
2. Properties
3. Edit property
4. Enquiries
5. Analytics
6. Feed Integration
7. Agency profile

---

## Phase F — Polish

1. Mobile
2. Skeleton loaders
3. Empty states
4. Error states
5. Hover interactions
6. Transitions
7. Image optimisation
8. SEO metadata
9. Demo dataset cleanup
10. Live demo rehearsal flows

---

# 43. Demo Quality Bar

The prototype should feel like a product that could reasonably move into production.

Avoid obviously fake/demo behaviours such as:

- Buttons doing nothing
- Repeated identical properties
- Lorem ipsum
- Broken mobile pages
- Fake links everywhere
- Missing agency relationships
- Empty screens
- Unformatted raw data
- Random images unrelated to properties
- Filters that do not change results

The client should be able to click around naturally without immediately reaching a dead end.

---

# 44. Design Details That Matter

Prioritise:

- Excellent property photography
- Strong image aspect ratios
- Clean cards
- Fluid filter interactions
- Thoughtful map/list transitions
- High-quality typography
- Sticky CTAs
- Premium spacing
- Subtle animation
- Great mobile property gallery
- Clean agency dashboard
- Modern charts
- Clear status chips
- Strong empty/loading/error states

Animations should be subtle and fast.

No excessive visual gimmicks.

---

# 45. Suggested Homepage Copy

## Hero

**Find your place in Portugal.**

Discover exceptional homes, investments and new developments from trusted property professionals across Portugal.

---

## New Developments

**Discover Portugal's newest places to live.**

Explore carefully selected new-build residences and investment opportunities across Portugal.

---

## Agencies

**Local expertise. National reach.**

Connect with property professionals who know Portugal.

---

## Buying Services

**Everything you need to buy with confidence.**

From mortgage planning to legal and notary support, make your move to Portugal simpler.

---

# 46. Suggested Search Empty State

```text
No properties match all of your filters.

Try expanding your location or price range.

[Clear Filters]
```

Also show 3–4 nearby/recommended properties where practical.

---

# 47. Suggested Agency Value Proposition

Agency portal marketing copy:

**Your listings. Your leads. One place.**

Manage properties, track enquiries and understand how buyers are engaging with your portfolio.

---

# 48. Feed Integration UX Copy

**Keep your portfolio automatically up to date.**

Connect your existing property feed and Properties in Portugal will synchronise new listings, price changes and listing statuses.

This is prototype positioning; production ingestion capabilities may vary.

---

# 49. Prototype Definition of Done

The prototype is demo-ready when:

- [ ] Homepage feels complete and premium
- [ ] Real property data is visible
- [ ] Search is functional
- [ ] Filters work
- [ ] Property details are functional
- [ ] Agency relationships are correct
- [ ] Enquiry forms work
- [ ] Agency profiles exist
- [ ] New Developments experience exists
- [ ] Development units exist
- [ ] Agency dashboard exists
- [ ] Agency listing management works at demo level
- [ ] Agency enquiry management works
- [ ] Feed integration screen exists
- [ ] Map view works or has a presentation-ready fallback
- [ ] Responsive mobile UI works
- [ ] No obvious broken states
- [ ] Seed/demo data is believable
- [ ] The five primary live-demo journeys can be completed smoothly

---

# 50. Primary Demo Narrative

When presenting the prototype, the intended story is:

### Step 1
"This is the familiar Properties in Portugal concept, completely modernised."

Show homepage.

### Step 2
"Property discovery is now dramatically better."

Show search and filters.

### Step 3
"International buyers can browse visually and geographically."

Show map.

### Step 4
"Property pages are designed to generate enquiries."

Open listing and contact agent.

### Step 5
"Developers now have a dedicated premium product."

Show New Developments.

### Step 6
"Agencies are no longer just listings on a website — they now have a platform."

Open agency dashboard.

### Step 7
"Listings can ultimately remain synchronised with agency systems."

Show Feed Integration.

This is the core sales story of the prototype.

---

# 51. Agent Implementation Instruction

Treat this document as the source of truth for the prototype.

When there is ambiguity:

1. Prioritise demo quality over breadth.
2. Prioritise real working flows over dead UI.
3. Prioritise public search/property experience first.
4. Then New Developments.
5. Then Agency Portal.
6. Keep architecture clean enough to extend into production.
7. Do not overbuild systems explicitly marked out of scope.
8. Use the current Properties in Portugal website for understanding content, listings, agencies and existing functionality.
9. Do not copy the existing visual design.
10. Build a significantly more refined product.

---

# 52. Reference Links

## Primary reference

https://www.propertiesinportugal.com

Use this to understand:

- Existing listings
- Property data
- Agencies
- Existing page hierarchy
- Existing feature set
- Existing Properties in Portugal brand/content ecosystem

## Existing publication / ecosystem

The Properties in Portugal magazine and The Portugal News property ecosystem can be used for additional visual/content context where useful.

---

# 53. Final Product Principle

The prototype should not look like:

> "We redesigned your website."

It should look like:

> **"We rebuilt Properties in Portugal as the platform it can become."**

That distinction should guide every major product and design decision.
