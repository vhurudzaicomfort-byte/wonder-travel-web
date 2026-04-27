# Wonder Travel Car Rental — Web

Phase-1 front end for **Wonder Travel Car Rental Services**, Masvingo, Zimbabwe.

Built per the UI/UX specification at `wonder-travel-car-rental-ui-ux-design-document.md`.

## Stack

- **Next.js 14 (App Router)** with TypeScript
- **Tailwind CSS** with design tokens exposed as CSS variables
- **Ubuntu** typeface via `next/font/google`
- **Zustand** for booking state, persisted to `sessionStorage`
- **Custom SVG icon sprite** at `/public/sprite.svg` — no icon library
- **JSON-driven data layer** in `/data/*.json`, accessed only through `lib/api.ts`

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build && npm start
```

## Project structure

```
/app                         # routes (App Router)
/components
  /brand                     # Logo
  /booking                   # Stepper + 5 booking steps + confirmation
  /layout                    # Header, MobileDrawer, Footer, WhatsAppFloat
  /marketing                 # Hero, Categories, Featured, WhyUs, etc.
  /seo                       # JSON-LD blocks
  /ui                        # Icon, Breadcrumbs
  /vehicles                  # VehicleCard, VehicleListing, VehicleDetail
/data                        # vehicles.json, business.json, extras.json, services.json, faq.json, testimonials.json
/lib                         # api.ts (data layer), format.ts, store.ts, types.ts
/public
  sprite.svg                 # icon sprite
  /images/{hero,vehicles}    # images
```

## Editing content

### Vehicles
Edit `/data/vehicles.json`. Add a vehicle = one JSON entry. Drop photos into `/public/images/vehicles/{slug}/` and reference them under `images.cover` and `images.gallery`.

The placeholder field flags entries that still need real photos. **All current vehicles are marked `placeholder: true`** — replace before launch.

### Business info
Edit `/data/business.json`. Address, phones (incl. WhatsApp link), hours, pickup locations.

### Services / FAQ / Testimonials
Edit the matching JSON file under `/data/`.

## Pending client input (TODOs)

- Replace all `/public/images/vehicles/*` placeholder SVGs with real fleet photos (1600×1000, WebP).
- Replace `/public/images/hero/masvingo-road.svg` with a licensed photograph.
- Confirm operating hours in `data/business.json`.
- Confirm full fleet list and rates (currently 8 placeholder vehicles).
- Confirm CABS bank/account number/ZIPIT code in `components/booking/Step5Payment.tsx`.
- Confirm or replace tagline ("Drive Zimbabwe. The Wonder way.").
- Provide real testimonials in `data/testimonials.json` (or remove the section).
- Confirm geo coordinates for the office in `business.json` (currently set to approximate Masvingo).

## Phase 2 readiness

The site is built so a backend can be added without rewiring the UI:

- Every read goes through `lib/api.ts`. Swap the JSON imports for `fetch` calls when an API is live — no component change needed.
- The booking submit on `Step5Payment` is marked `MOCK_PAYMENT`; replace with calls to `/api/bookings/...` and the chosen payment provider.
- Hooks for email + WhatsApp confirmation should live in a `lib/notifications.ts` module (not yet created).

Recommended Phase 2 stack: Next.js API routes, Postgres (or Supabase), Paynow Express + Stripe for cards, Twilio WhatsApp API or Meta Cloud API, Resend for email. Strapi or Sanity if a non-technical CMS is needed.

## Deploy

Deployable to Vercel as-is.

```bash
vercel --prod
```

## License

© Wonder Travel Car Rental Services.
