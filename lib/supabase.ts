import { createClient } from '@supabase/supabase-js';

const supabaseUrl = [enlace sospechoso eliminado]_PUBLIC_SUPABASE_URL || '[suspicious link removed]';
const supabaseAnonKey = [enlace sospechoso eliminado]_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
