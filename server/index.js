const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- API Routes ---

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', environment: process.env.NODE_ENV });
});

// 2. Meetings API
app.get('/api/meetings', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM meetings ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

app.post('/api/meetings', async (req, res) => {
  const { title, date, time, location } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO meetings (title, date, time, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, date, time, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

// 3. Strategy / Objectives API
app.get('/api/objectives', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM objectives ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

// 4. Tasks API
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tasks ORDER BY due_date ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database Error' });
  }
});

// Future: Auth, Document Uploads (Firebase), AI Insight Generation (OpenAI)

app.listen(PORT, () => {
  console.log(`SmartBoard Backend running on port ${PORT}`);
});
