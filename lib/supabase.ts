
import { createClient } from '@supabase/supabase-js';

// Note: Ensure your Supabase URL and Anon Key are correct.
// The Anon Key should start with "eyJ..." and can be found in 
// Project Settings > API > anon public key
const supabaseUrl = 'https://spyvjpjngkoltfxzcxjh.supabase.co';
const supabaseAnonKey = 'sb_publishable_4P3tWD3TFwKv5vsT_jMgNQ_bbJZgiMs';

if (!supabaseAnonKey.startsWith('eyJ')) {
  console.warn('Supabase Warning: The provided API key does not look like a standard Supabase Anon key. Please check Project Settings > API in your Supabase dashboard.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
