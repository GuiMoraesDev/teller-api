import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL) {
	throw new Error('SUPABASE_URL is missing');
}

if (!process.env.SUPABASE_KEY) {
	throw new Error('SUPABASE_KEY is missing');
}

const supabaseClient = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);

export default supabaseClient;
