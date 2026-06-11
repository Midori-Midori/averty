/**
 * Averty Registration Server
 * Simple Express server that saves user registrations to users.txt
 *
 * Run with:  node server/index.js
 * Or:        npm run server
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const USERS_FILE = path.join(__dirname, 'users.txt');

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:4200' })); // Allow Angular dev server
app.use(express.json());

// ── POST /api/register ──────────────────────────────────────────────────────
app.post('/api/register', (req, res) => {
  const { name, lastName, email, phone } = req.body;

  // Basic validation
  if (!name || !lastName || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.'
    });
  }

  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Format entry
  const entry =
    `Name: ${name}\n` +
    `Last Name: ${lastName}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Registered: ${timestamp}\n` +
    `---------------------\n`;

  // Append to users.txt (creates file if it doesn't exist)
  fs.appendFile(USERS_FILE, entry, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to users.txt:', err);
      return res.status(500).json({
        success: false,
        message: 'Could not save registration. Please try again.'
      });
    }

    console.log(`✅ New registration saved: ${name} ${lastName} <${email}>`);
    return res.json({
      success: true,
      message: 'Registration successful! Welcome to Averty.'
    });
  });
});

// ── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', server: 'Averty Registration Server' });
});

// ── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Averty server running at http://localhost:${PORT}`);
  console.log(`📄 Registrations will be saved to: ${USERS_FILE}`);
});
