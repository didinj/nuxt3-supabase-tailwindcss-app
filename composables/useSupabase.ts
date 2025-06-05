import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sxuwcodxgdzvnwtqmjli.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4dXdjb2R4Z2R6dm53dHFtamxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwODc1ODYsImV4cCI6MjA2NDY2MzU4Nn0.4JNHx6sZUGRvVSHWsDfUdSdMb7l-mRRg9SGze99aXww'

export const supabase = createClient(supabaseUrl, supabaseKey)
