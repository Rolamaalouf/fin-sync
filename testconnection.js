require('dotenv').config(); // Load environment variables from .env file
const { Client } = require('pg'); // Import pg package

// Create a new client using the Supabase database URL from the .env file
const client = new Client({
  connectionString: process.env.SUPABASE_URL
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the Supabase PostgreSQL database');
    
    // Example query to check if connection works
    return client.query('SELECT NOW()');
  })
  .then(result => {
    console.log('Current time from DB:', result.rows[0]);
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.stack);
  })
  .finally(() => {
    client.end(); // Always close the connection when done
  });
