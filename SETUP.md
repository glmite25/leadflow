# LeadFlow CRM - Setup Guide

Complete setup instructions for deploying LeadFlow CRM to production.

## Quick Start (5 minutes)

### 1. Environment Setup

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**To find these values:**
1. Go to your Supabase project dashboard
2. Click "Settings" in the left sidebar
3. Click "API" to see your project URL and keys
4. Copy the `URL` and `anon` key (not the service role key)

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project name, password, and region
5. Click "Create new project" (takes ~2 minutes)

### Create Leads Table

The app automatically expects this table. Create it via SQL editor:

1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Paste this SQL:

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

-- Create index for faster sorting
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Enable RLS (can be customized later for multi-tenancy)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow all access (can be restricted with proper policies)
CREATE POLICY "Allow all access" ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click "Run"
5. You should see "Execute succeeded" message

## Development Workflow

### Add New shadcn/ui Components

```bash
pnpm dlx shadcn@latest add <component-name>
```

Example:
```bash
pnpm dlx shadcn@latest add dialog
```

### Format Code

```bash
pnpm lint
```

### Build for Production

```bash
pnpm build
pnpm start
```

## Deployment to Vercel

### Option 1: Direct GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: LeadFlow CRM MVP"
   git branch -M main
   git remote add origin https://github.com/your-username/leadflow.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select "GitHub" and authenticate
   - Find and import your `leadflow` repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables:**
   - In Vercel dashboard, go to Project Settings
   - Click "Environment Variables"
   - Add two variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
   - Click "Save"

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (~3-5 minutes)
   - Your app is live! 🎉

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and set environment variables when asked.

## Verify Installation

After deployment, test these flows:

1. **Home page (/):**
   - Fill out lead form with Name, Phone Number
   - Click "Get Started"
   - See success message

2. **Dashboard (/dashboard):**
   - Click "Dashboard" in header
   - See the lead you just created
   - Verify all stats are correct
   - Try filtering by status
   - Try searching by name
   - Click status dropdown and change status

## Production Checklist

- [ ] Database created in Supabase
- [ ] Environment variables set (`.env.local` for local, Vercel Settings for production)
- [ ] App runs locally: `pnpm dev`
- [ ] Deploy to Vercel
- [ ] Test all functionality on production URL
- [ ] Share dashboard link with team

## Troubleshooting

### "Cannot find Supabase" error

**Problem:** Missing or wrong environment variables

**Solution:**
1. Check `.env.local` exists with correct values
2. Verify variables in Vercel Settings if deployed
3. Restart dev server after changing env vars

### No leads showing in dashboard

**Problem:** Database might not exist or table not created

**Solution:**
1. Go to Supabase SQL Editor
2. Run the table creation SQL above
3. Check RLS policies allow access
4. Refresh dashboard

### Form submission fails

**Problem:** Network or API issue

**Solution:**
1. Check browser console for errors
2. Verify Supabase URL and key are correct
3. Check Supabase project status (green = healthy)
4. Test API directly: `curl https://your-url/api/leads`

### Styling looks broken

**Problem:** Tailwind CSS not compiling

**Solution:**
1. Clear `.next` folder: `rm -rf .next`
2. Rebuild: `pnpm dev`
3. Restart dev server

## Next Steps

### Scale LeadFlow

Add these features to grow your MVP:

1. **Authentication** - Only you can see your leads
   - Use Supabase Auth or Auth.js
   - Add user_id to leads table

2. **Email Notifications** - Get alerts on new leads
   - Use SendGrid or Mailgun
   - Trigger on lead creation via Edge Function

3. **Export Functionality** - Download leads as CSV
   - Add CSV export button to dashboard
   - Generate on-the-fly from leads table

4. **Lead Notes** - Add notes and timeline for each lead
   - Create separate `lead_notes` table
   - Add rich text editor for notes

5. **Mobile App** - React Native version
   - Use Expo for quick setup
   - Share same Supabase backend

## Support

- **Documentation:** Check README.md
- **Supabase Help:** [supabase.com/docs](https://supabase.com/docs)
- **Next.js Help:** [nextjs.org/docs](https://nextjs.org/docs)
- **Issues:** Check GitHub Issues in your repo

## Cost Estimate

**Monthly costs for small business use:**

- **Supabase**: $0-25/month (free tier: 500MB storage, 2M edge function invocations)
- **Vercel**: $0-20/month (free tier included, pay-as-you-go for exceeding limits)
- **Total**: ~$10-30/month for small business volume

Free tier is usually sufficient until you have 10,000+ leads.

---

You're ready to deploy! 🚀 Happy lead capturing!
