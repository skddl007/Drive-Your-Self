import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jojjwmbsokypnignemtj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvamp3bWJzb2t5cG5pZ25lbXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMjk3NjMsImV4cCI6MjA2MTYwNTc2M30.LsOyCKgvgM0Ji2Lwnoy14v2mJNQG5CoyPLQr7T5EWpg';

export const supabase = createClient(supabaseUrl, supabaseKey);
