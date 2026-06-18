import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please check your environment variables.');
}

// Cookie-based browser client — session is stored in cookies so the
// middleware (which also reads cookies) can always see the auth state.
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
