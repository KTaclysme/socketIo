const { Client } = require('pg');

async function runDatabase() {
  const client = new Client({
    user: 'myuser',
    host: 'localhost',
    database: 'mydb',
    password: 'mypassword',
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected successfully');
    const res = await client.query('SELECT NOW()');
    console.log('Current time:', res.rows[0]);
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

module.exports = {runDatabase} 