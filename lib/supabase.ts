import { createClient } from '@supabase/supabase-js';

const supabaseUrl = [enlace sospechoso eliminado]_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = [enlace sospechoso eliminado]_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
