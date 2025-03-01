const { createClient } = require('@supabase/supabase-js');
const { Client } = require('pg');
require('dotenv').config();

// Check required environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
  console.error("❌ Supabase URL or Secret Key is missing! Check your .env file.");
  process.exit(1);
}

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

// PostgreSQL Client (Direct DB Connection)
const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },  // Needed for secure connections on some cloud providers
});

pgClient.connect()
  .then(() => console.log('✅ Successfully connected to PostgreSQL!'))
  .catch(err => console.error('❌ Error connecting to PostgreSQL:', err));

module.exports = { supabase, pgClient };
