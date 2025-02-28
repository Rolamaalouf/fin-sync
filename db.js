const { createClient } = require('@supabase/supabase-js');
const { Client } = require('pg');  // You can also use pg module directly for PostgreSQL connections

const dotenv = require('dotenv');
dotenv.config();

// If you want to use the Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing! Check your .env file.");
  process.exit(1);
}

// If you're connecting directly via PostgreSQL (using pg)
const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,  // Your connection string goes here
});

pgClient.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL!');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err);
  });

module.exports = { supabase, pgClient };