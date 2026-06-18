# LeadFlow CRM

A production-ready lead management system for small businesses built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Supabase**.

## Overview

LeadFlow is a minimal, fast, and easy-to-use CRM designed for capturing and managing leads. Perfect for small businesses that need a simple way to track prospects without unnecessary complexity.

### Features

✅ **Lead Capture** - Quick lead capture form with client-side validation  
✅ **Lead Dashboard** - View all leads with real-time stats  
✅ **Search & Filter** - Find leads by name, email, or phone  
✅ **Status Management** - Update lead status (New, Contacted, Qualified, Customer, Lost)  
✅ **Real-time Updates** - Instant UI refresh when changes are made  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Production-Ready** - Type-safe, optimized, and deployed on Vercel  

## Tech Stack

- **Framework**: Next.js 16 App Router
- **Language**: TypeScript
- **UI Framework**: React 19.2
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Dates**: date-fns
- **Deployment**: Vercel

## Project Structure

```
app/
  ├── page.tsx                    # Home page with lead capture form
  ├── dashboard/
  │   └── page.tsx                # Dashboard with leads table
  ├── api/
  │   └── leads/
  │       ├── route.ts            # GET/POST leads
  │       └── [id]/route.ts       # PATCH lead status
  ├── layout.tsx                  # Root layout with metadata
  └── globals.css                 # Global styles and theme

components/
  ├── lead-form.tsx               # Lead capture form component
  ├── leads-table.tsx             # Leads table component
  └── ui/                          # shadcn/ui components

lib/
  ├── supabase.ts                 # Supabase client
  ├── api.ts                       # Data fetching functions
  └── types.ts                     # TypeScript types

.env.local                         # Environment variables
```

## Database Schema

### `leads` table

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  interest TEXT,
  status TEXT NOT NULL DEFAULT 'New' 
    CHECK (status IN ('New', 'Contacted', 'Qualified', 'Customer', 'Lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Pages

### Home Page (`/`)

Lead capture landing page with:
- Hero section highlighting the CRM benefits
- Lead capture form (Name, Email, Phone, Interest)
- Form validation (client-side)
- Success/error states
- Link to dashboard
- Stats overview

### Dashboard (`/dashboard`)

Lead management dashboard with:
- Real-time lead statistics (Total, New, Contacted, Qualified, Customers)
- Search functionality (name, email, phone)
- Status filter dropdown
- Leads table with inline status updates
- Responsive columns (hidden on mobile for space)
- Empty state handling

## API Routes

### GET `/api/leads`

Fetch leads with optional filtering and searching.

**Query Parameters:**
- `search` - Search by name, email, or phone (optional)
- `status` - Filter by status (optional)
- `limit` - Results per page (default: 50)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "555-123-4567",
      "interest": "Website Services",
      "status": "New",
      "created_at": "2026-06-18T03:30:31.560008Z",
      "updated_at": "2026-06-18T03:30:31.560008Z"
    }
  ]
}
```

### POST `/api/leads`

Create a new lead.

**Body:**
```json
{
  "name": "John Smith",
  "phone": "555-123-4567",
  "email": "john@example.com",
  "interest": "Website Services"
}
```

**Response:** Returns the created lead object

### PATCH `/api/leads/[id]`

Update a lead's status.

**Body:**
```json
{
  "status": "Contacted"
}
```

**Response:** Returns the updated lead object

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Supabase account with a project
- Environment variables configured

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**

   Create `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

   Get these from your Supabase project settings.

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Development

### Adding Components

Use shadcn/ui CLI to add new components:

```bash
pnpm dlx shadcn@latest add <component-name>
```

### Database Migrations

To apply migrations to Supabase:

```bash
pnpm dlx supabase db pull
pnpm dlx supabase db push
```

### Type Safety

TypeScript is fully configured. All API responses and database types are typed.

## Deployment

### Deploy to Vercel

1. **Push your code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Import project to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Set environment variables
   - Deploy

3. **Add environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Performance Optimizations

- **Server Components**: Used for static content and data fetching
- **Client Components**: Only for interactive UI
- **Image Optimization**: Proper viewport handling for responsive design
- **Caching**: API responses cached appropriately
- **Code Splitting**: Automatic with Next.js 16
- **Database Indexes**: Created on frequently queried columns

## Security

- **Environment Variables**: Sensitive keys stored safely
- **TypeScript**: Type safety prevents common bugs
- **Validation**: Client and server-side input validation
- **SQL Injection**: Protected via Supabase parameterized queries
- **RLS**: Row Level Security configured in Supabase (can be enhanced)

## Future Enhancements

Ideas for scaling LeadFlow:

- Authentication (add multi-user support)
- Lead notes and activity timeline
- Email notifications
- Bulk actions and exports
- Custom fields
- Lead source tracking
- Priority and scoring system
- Recurring tasks/reminders
- Integration with email/calendar
- Advanced analytics

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact support.

---

Built with ❤️ using Next.js, Supabase, and Tailwind CSS
