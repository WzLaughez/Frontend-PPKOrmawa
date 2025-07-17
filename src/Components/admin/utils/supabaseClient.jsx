// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kippbfwesowzxmulirkq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpcHBiZndlc293enhtdWxpcmtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMzIyMzUsImV4cCI6MjA2MjYwODIzNX0.LuYm059EX8NbIqMRbFdKVIqbOg-f6eAwuDQ4ETjzMAw'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
