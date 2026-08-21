import { createClient } from "@supabase/supabase-js/dist/index.cjs";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
export default supabase;