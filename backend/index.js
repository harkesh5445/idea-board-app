require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create ideas table if not exists
pool.query(`CREATE TABLE IF NOT EXISTS ideas (
  id SERIAL PRIMARY KEY,
  text VARCHAR(280) NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0
)`);

// Get all ideas
app.get('/ideas', async (req, res) => {
  const result = await pool.query('SELECT * FROM ideas ORDER BY id DESC');
  res.json(result.rows);
});

// Create a new idea
app.post('/ideas', async (req, res) => {
  const { text } = req.body;
  if (!text || text.length > 280) return res.status(400).json({ error: 'Invalid idea' });
  const result = await pool.query('INSERT INTO ideas (text) VALUES ($1) RETURNING *', [text]);
  res.status(201).json(result.rows[0]);
});

// Upvote an idea
app.post('/ideas/:id/upvote', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('UPDATE ideas SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *', [id]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'Idea not found' });
  res.json(result.rows[0]);
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
