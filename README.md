# THANMAY COLLECTIONS
## Premium Imitation Jewellery — Production E-Commerce Platform

> **"Elegance that celebrates tradition"**  
> Luxury Indian imitation jewellery e-commerce platform built with Next.js 14 (App Router), TypeScript, Tailwind CSS, PostgreSQL / Supabase, and WhatsApp Business order concierge.

---

## 1. Brand Identity & Design System

The visual design system completely replaces the previous burgundy/dark maroon direction with the official eight-shade pink palette, champagne gold, white, and warm cream.

### Primary Pink Palette
- **Pink 1 (#FF7C8A)**: Primary brand accent, primary CTA buttons, active badges.
- **Pink 2 (#FF8694) & Pink 3 (#FF909E)**: Interactive button hover states, selected filters.
- **Pink 4 (#FF9AA8), Pink 5 (#FFA4B2), Pink 6 (#FFAEBC)**: Soft gradients and section accents.
- **Pink 7 (#FFB8C6) & Pink 8 (#FFC2D0)**: Subtle background highlights, announcement bar, card accents.

### Supporting Luxury Palette
- **Champagne Gold**: `#E8D5A8` (Primary), `#DCC18C` (Dark/Border), `#F2E3C2` (Light Highlight)
- **Backgrounds**: `#FFFFFF` (Pure White), `#FFF5E9` (Warm Cream), `#FFF9F2` (Soft Cream), `#F8F3EF` (Warm Ivory)
- **Typography & Borders**: `#40343A` (Dark Text), `#88777D` (Muted Secondary Text), `#F3DDE1` (Soft Borders)

### Typography
- **Headings**: `Cormorant Garamond`
- **Editorial Accents**: `Playfair Display`
- **Interface & Body**: `Inter`

---

## 2. Technical Stack & Infrastructure

- **Frontend**: Next.js 14.2 (App Router) + TypeScript + Tailwind CSS
- **Backend / Database**: PostgreSQL (Supabase) with Row Level Security (RLS)
- **Media Optimization**: Sharp + Next.js Image Optimization
- **State Management**: React Context with Persistent LocalStorage Synchronization
- **Order Channel**: WhatsApp Business Click-to-Chat (Zero payment gateway integration)
- **Hosting Target**: Vercel
- **Quality & Testing**: Vitest test runner (100% pass rate)

---

## 3. Database Schema & Supabase Architecture

The database migrations are located in `supabase/migrations/`:
1. `20261110000000_initial_schema.sql`: Full table definitions with constraints and indexes:
   - `categories`
   - `products`
   - `product_images`
   - `orders`
   - `order_items` (Immutable product snapshot at purchase)
   - `admin_profiles`
   - `inventory_logs` (Stock change trail)
   - `audit_logs` (Security & admin audit trail)
   - `contact_enquiries`
2. `20261110000001_rls_policies.sql`: Row Level Security policies adhering to OWASP ASVS zero-trust principles.
3. `20261110000002_seed_data.sql`: Seed data for 8 authentic categories and luxury imitation jewellery catalogue.

---

## 4. WhatsApp Ordering Flow (Zero Payment Gateway)

To protect customer payment data and preserve the bespoke jewellery shopping experience, online payment gateways are strictly omitted.

1. **Bag Addition**: Customer adds pieces to cart (saved in local storage).
2. **Checkout Initiation**: Customer taps **"Proceed to WhatsApp Checkout"**.
3. **Data Collection**: Minimum details collected (Name, WhatsApp number, Address, City, State, PIN code, DPDP consent).
4. **Server-Side Validation**: The `/api/orders/create` endpoint re-queries the database, rejects client-submitted prices, validates real stock, computes line totals, creates order `TC-XXXXXXXX`, and records inventory deductions.
5. **WhatsApp Message Dispatch**: Generates an encoded WhatsApp message pre-filled with customer details, order number, and line item breakdown.
6. **Confirmation Screen**: Redirects to `/order-success` where the customer can view their order ID and reopen WhatsApp if blocked by popups.

---

## 5. Security Architecture (OWASP ASVS Standard)

- **Zero-Trust Price Integrity**: Client prices are never trusted. All totals are recalculated on the server.
- **Strict Row Level Security (RLS)**: Public users can only read active products/categories. Orders and audit logs are strictly protected.
- **Zod Schema Validation**: All API routes strictly validate payloads before processing.
- **Secure HTTP Headers**: Configured in `next.config.mjs`:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security` (HSTS)
- **Data Privacy**: Designed in compliance with India's Digital Personal Data Protection (DPDP) Act.

---

## 6. Administrator Dashboard (`/admin`)

- **Secure Login**: Session cookie with HTTP-only and strict SameSite settings.
- **Default Development Credentials**:
  - Email: `admin@thanmaycollections.com`
  - Password: `ThanmayLuxury2026!`
- **Capabilities**:
  - **Analytics Overview**: Revenue, orders count, low-stock alerts.
  - **Product Management**: Add, edit, delete, mark featured/bestseller/new arrival.
  - **Order Management**: View customer snapshot, change status (`Pending`, `Awaiting WhatsApp Confirmation`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
  - **Inventory Management**: Manual stock adjustment with mandatory audit reason logging.
  - **Audit Logs**: Immutable log of administrative operations.
  - **Enquiries**: Review customer requests and reply directly on WhatsApp.

---

## 7. Development & Deployment

### Run Locally
```bash
npm install
npm run dev
```

### Run Tests
```bash
npm test
```

### Build Production Bundle
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push this repository to your GitHub account.
2. Import the project in Vercel.
3. Configure Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `WHATSAPP_BUSINESS_NUMBER` (e.g. `919876543210`)
   - `ADMIN_EMAIL`
   - `ADMIN_INITIAL_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL`
