# Product Requirements Document (PRD)
## Ojidé — Lead Capture & Customer Acquisition System

**Version:** 1.0  
**Author:** Olajide Igbalaye  
**Last Updated:** June 2026  
**Status:** Live (Production)  
**Live URL:** https://ojide.vercel.app

---

## 1. Product Overview

### 1.1 Summary

Ojidé is a full-stack lead capture and customer acquisition system built for Nigerian digital entrepreneurs, freelancers, agencies, content creators, and service businesses. The primary surface is a public-facing landing page that collects prospective customer leads (name, email, phone, biggest challenge) for a free class event. Leads are stored in a private database, the business owner receives an instant WhatsApp notification for every new lead, and a password-protected admin dashboard provides full lead management including status tracking, search, filtering, and CSV export.

### 1.2 Business Context

Most Nigerian small businesses have no structured lead system — prospects enquire and disappear. Ojidé solves this by:

1. Capturing leads from a single high-converting landing page
2. Instantly notifying the owner via WhatsApp so no lead goes cold
3. Providing a CRM pipeline to move leads from `New` → `Customer`
4. Enabling direct WhatsApp outreach to each lead from within the dashboard

### 1.3 Current Event

The landing page is currently configured for a free class:  
**"Free Class: How Nigerian Digital Sellers Get Their First 5 Paying Customers (Even With Zero Followers)"**  
**Date:** Saturday, June 28, 2026 · 7:00 PM WAT · Google Meet

---

## 2. Users & Roles

| Role | Description | Access |
|---|---|---|
| **Visitor / Prospect** | Nigerian digital sellers, freelancers, creators who land on the page | Public landing page only |
| **Admin / Owner** | Olajide Igbalaye — the business operator | Full dashboard access after authentication |

There is intentionally no multi-user or team access at this stage. One admin account owns all leads.

---

## 3. Core Features

### 3.1 Public Landing Page (`/`)

**Purpose:** Convert visitors into registered leads for the free class.

**Sections:**
- Sticky navbar with logo and branding
- Hero section with animated headline, subheadline, instructor credibility block
- 4-bullet checklist of class outcomes
- Live countdown timer to class date (Saturday June 28, 2026 · 7:00 PM WAT)
- Lead capture form (right column on desktop, below hero on mobile)
- "Can't make the class?" dark section with checklist download CTA
- Feature stats cards (Leads Captured, Status Levels)
- Trust bar — "Trusted by 30+ Nigerian Businesses" with category tags
- Footer with copyright, privacy policy link, contact email

**Lead Form Fields:**
| Field | Type | Required | Validation |
|---|---|---|---|
| Name | Text | ✅ | Non-empty |
| Email | Email | ✅ | Valid format, no disposable domains |
| Phone Number | Tel | ✅ | Nigerian mobile numbers only (080, 070, 081, 090, 091 prefixes); auto-normalizes `08xxx` → `2348xxx` |
| Biggest challenge | Select dropdown | ✅ | Must select one of 5 options |

**Post-Submit Behaviour:**
- Success modal appears with: checkmark, "You're in! 🎉" message
- Button to join WhatsApp group (`NEXT_PUBLIC_WHATSAPP_GROUP_URL`)
- Button to download "First 5 Customers" checklist PDF (`NEXT_PUBLIC_CHECKLIST_URL`)
- Duplicate detection: same phone or email cannot be registered twice (400 error with clear message)

---

### 3.2 Authentication (`/login`, `/register`)

- Powered by **Supabase Auth** with cookie-based sessions (`@supabase/ssr` — `createBrowserClient`)
- Middleware (`middleware.ts`) runs on every request to `/dashboard`, `/login`, `/register`, `/auth/callback`
- Unauthenticated users hitting `/dashboard` are redirected to `/login?next=/dashboard`
- Authenticated users hitting `/login` or `/register` are redirected to `/dashboard`
- Auth callback route (`/auth/callback`) exchanges Supabase confirmation codes for sessions
- Register page detects `data.session` presence — if email confirmation is disabled, goes straight to dashboard; if enabled, shows "Check your email" screen

---

### 3.3 Admin Dashboard (`/dashboard`)

**Access:** Authenticated admin only (protected by middleware)

**KPI Cards (top row):**
| Card | Value |
|---|---|
| Total Leads | Count of all leads |
| New | Count with status `New` |
| Qualified | Count with status `Qualified` |
| Customers | Count with status `Customer` |

**Leads Table (desktop):**
- Columns: Name (with avatar initial), Phone, Email, Interest, Status badge, Created date
- Row click opens the Lead Detail slide-over panel
- Updating rows show 60% opacity while in-flight

**Lead Cards (mobile):**
- Full-width card layout replacing the table on screens < 640px
- Shows name, date, status badge, phone, email, interest

**Toolbar:**
- Live search: debounced 300ms, searches name + email + phone
- Status filter pills: All, New, Contacted, Qualified, Customer, Lost
- Clear all filters button (shown when any filter is active)
- Export CSV button: downloads `leads_export_YYYY-MM-DD.csv` (Google Sheets compatible)

**Lead Detail Panel (slide-over):**
- Triggered by row/card click
- Keyboard accessible (Escape to close), body scroll locked when open
- Shows: full contact details (Name, Phone, Email, Interest, Created timestamp)
- Status update buttons — click any status to update immediately via `PATCH /api/leads/:id`
- WhatsApp quick-action icon next to phone number
- "Chat on WhatsApp" green CTA button with pre-filled message
- WhatsApp toggle: switch between WhatsApp and WhatsApp Business URL schemes
- "Message [First Name]" button

**Sidebar:**
- Collapsible on desktop (chevron toggle)
- Slide-in drawer on mobile
- Nav items: Dashboard, Leads (both point to `/dashboard`)
- Sign out button (calls `supabase.auth.signOut()` → redirects to `/login`)

---

### 3.4 WhatsApp Notification System

Every new lead triggers an instant WhatsApp message to the owner's number.

**Flow:**
```
User submits form
  → POST /api/leads
    → Lead created in Supabase
    → await sendNewLeadNotification(lead)   ← awaited (not fire-and-forget)
      → POST https://graph.facebook.com/v19.0/{phoneNumberId}/messages
        → WhatsApp message delivered to WHATSAPP_NOTIFY_TO
```

**Backup flow (Supabase Database Webhook):**
```
INSERT into leads table
  → Supabase webhook fires
    → POST https://ojide.vercel.app/api/notify
      → Authorization: Bearer {WHATSAPP_WEBHOOK_VERIFY_TOKEN}
        → WhatsApp message delivered
```

**Message format:**
```
🔔 *New Lead — Ojidé*

👤 *Name:* [name]
📱 *Phone:* [phone]
📧 *Email:* [email]
💬 *Challenge:* [interest]

👉 View in dashboard → https://ojide.vercel.app/dashboard
```

**Integration:** Meta WhatsApp Business Cloud API (Graph API v19.0)  
**Cost:** Free (business-initiated utility messages to verified number in dev mode)

---

## 4. API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/leads` | None (Supabase RLS) | Fetch leads with search, status, limit, offset params |
| `POST` | `/api/leads` | None | Create new lead; validates phone (Nigerian only), email, duplicates; sends WhatsApp notification |
| `PATCH` | `/api/leads/:id` | None | Update lead status |
| `POST` | `/api/notify` | Bearer token | Receive Supabase webhook or test call; send WhatsApp notification |
| `GET` | `/api/notify/test` | Dev only | Fire a test WhatsApp notification (blocked in production) |
| `GET` | `/api/whatsapp/webhook` | Meta verify token | Meta webhook verification handshake |
| `POST` | `/api/whatsapp/webhook` | None | Receive inbound WhatsApp message/status events (currently logged only) |
| `GET` | `/auth/callback` | None | Exchange Supabase auth code for session cookie |

---

## 5. Data Model

### `leads` table (Supabase / PostgreSQL, `public` schema)

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PRIMARY KEY, default `gen_random_uuid()` | |
| `name` | `text` | NOT NULL | Full name as entered |
| `email` | `text` | NULLABLE | Lowercased, trimmed on insert |
| `phone` | `text` | NOT NULL | Stored as normalized E.164 without `+` (e.g. `2348031234567`) |
| `interest` | `text` | NULLABLE | Selected challenge option |
| `status` | `text` | NOT NULL, default `'New'` | One of: `New`, `Contacted`, `Qualified`, `Customer`, `Lost` |
| `created_at` | `timestamptz` | NOT NULL, default `NOW()` | |
| `updated_at` | `timestamptz` | NOT NULL, default `NOW()` | Updated on status change |

**Business rules enforced server-side:**
- Phone number must be a valid Nigerian mobile number (MTN, Airtel, Glo, 9mobile prefixes)
- No duplicate phone numbers across all leads
- No duplicate email addresses across all leads
- Disposable/temporary email domains are rejected (12 domains blocklisted)

---

## 6. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript 5.7.3 |
| Styling | Tailwind CSS v4 |
| UI Components | Shadcn/ui primitives + custom components |
| Icons | Lucide React v1.16 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + `@supabase/ssr` cookie-based sessions |
| ORM/Client | Supabase JS SDK v2 |
| WhatsApp | Meta WhatsApp Business Cloud API (Graph API v19.0) |
| Hosting | Vercel (Hobby plan) |
| Analytics | Vercel Analytics (production only) |
| Date formatting | date-fns v4 |
| Package manager | npm |

---

## 7. Environment Variables

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Supabase anonymous key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase service role key (admin access) |
| `WHATSAPP_PHONE_NUMBER_ID` | Server only | Meta WhatsApp sender phone number ID |
| `WHATSAPP_ACCESS_TOKEN` | Server only | Meta Graph API access token |
| `WHATSAPP_NOTIFY_TO` | Server only | Owner's WhatsApp number to receive lead notifications |
| `WHATSAPP_BUSINESS_ID` | Server only | Meta WhatsApp Business Account ID |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Server only | Shared secret for Supabase webhook + Meta webhook verification |
| `NEXT_PUBLIC_WHATSAPP_GROUP_URL` | Client | WhatsApp group invite link shown after successful registration |
| `NEXT_PUBLIC_CHECKLIST_URL` | Client | "First 5 Customers" checklist PDF download URL |

---

## 8. Security

- **Session security:** Sessions stored in HTTP-only cookies via `@supabase/ssr`. Middleware validates JWT via `supabase.auth.getUser()` (server-side validation, not just cookie presence)
- **Webhook security:** `/api/notify` requires `Authorization: Bearer {token}` header matching `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
- **Input validation:** Phone and email validated both client-side (form) and server-side (API + `lib/api.ts`) — double validation, not single
- **No `NEXT_PUBLIC_` prefix on secrets:** Service role key, WhatsApp tokens are server-only env vars — never shipped to browser
- **Disposable email blocking:** 12 known disposable email domains rejected at validation
- **Duplicate prevention:** Database-level deduplication on phone and email before insert
- **Test endpoint blocked in production:** `/api/notify/test` returns 403 when `NODE_ENV === 'production'`

---

## 9. File Structure

```
leadflow/
├── app/
│   ├── api/
│   │   ├── leads/
│   │   │   ├── route.ts              # GET + POST /api/leads
│   │   │   └── [id]/route.ts         # PATCH /api/leads/:id
│   │   ├── notify/
│   │   │   ├── route.ts              # POST /api/notify (webhook receiver)
│   │   │   └── test/route.ts         # GET /api/notify/test (dev only)
│   │   └── whatsapp/
│   │       └── webhook/route.ts      # Meta webhook verification
│   ├── auth/
│   │   └── callback/route.ts         # Supabase auth code exchange
│   ├── dashboard/
│   │   └── page.tsx                  # Admin dashboard (protected)
│   ├── login/
│   │   └── page.tsx                  # Login page
│   ├── register/
│   │   └── page.tsx                  # Register page
│   ├── globals.css                   # Global styles + Tailwind
│   ├── layout.tsx                    # Root layout + metadata + analytics
│   └── page.tsx                      # Landing page (public)
├── components/
│   ├── ui/                           # Shadcn primitives (badge, button, card, etc.)
│   ├── countdown-timer.tsx           # Live countdown to class date
│   ├── dashboard-layout.tsx          # Sidebar + topbar shell (admin)
│   ├── hero-animated.tsx             # Scroll/mount animation wrapper
│   ├── lead-card.tsx                 # Mobile lead card
│   ├── lead-detail-panel.tsx         # Slide-over panel with WhatsApp actions
│   ├── lead-form.tsx                 # Public registration form + success modal
│   └── leads-table.tsx               # Desktop leads table
├── lib/
│   ├── api.ts                        # Supabase data layer (CRUD + validation)
│   ├── supabase.ts                   # Browser client (createBrowserClient)
│   ├── supabase-server.ts            # Server client (createServerClient)
│   ├── types.ts                      # Lead type, status types, color maps
│   ├── utils.ts                      # cn() utility
│   └── whatsapp.ts                   # WhatsApp Cloud API helpers + formatters
├── middleware.ts                     # Auth + route protection
├── .env.local                        # Local environment variables (gitignored)
└── PRD.md                            # This document
```

---

## 10. Known Limitations & Future Improvements

| Item | Priority | Notes |
|---|---|---|
| WhatsApp access token expires | High | Temporary tokens expire in 24h. Needs a permanent System User token from Meta Business Manager |
| No lead notes/comments | Medium | Useful for tracking follow-up context per lead |
| No pagination on dashboard | Medium | Currently limited to 50 leads per fetch — needs pagination for scale |
| No email notifications as fallback | Medium | WhatsApp-only means notification fails if token expires |
| No lead deletion | Low | Admin cannot delete leads from dashboard |
| No analytics on landing page | Low | Vercel Analytics tracks pageviews but not form conversion rate |
| Single admin account | Low | Fine for solo operator; multi-user would need role-based access |
| Supabase webhook double-fires if API route also notifies | Resolved | API route now delegates to Supabase webhook exclusively — no double messages |
