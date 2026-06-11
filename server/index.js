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
const USERS_FILE = path.join(__dirname, 'users.json');

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

  const timestamp = new Date().toISOString();

  // Create new user object
  const newUser = {
    name,
    lastName,
    email,
    phone,
    registeredAt: timestamp
  };

  // Read existing users from users.json
  fs.readFile(USERS_FILE, 'utf8', (err, data) => {
    let users = [];

    if (!err && data) {
      try {
        users = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing users.json, resetting to empty array:', parseErr);
      }
    }

    // Append new user
    users.push(newUser);

    // Save back to users.json
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to users.json:', writeErr);
        return res.status(500).json({
          success: false,
          message: 'Could not save registration. Please try again.'
        });
      }

      console.log(`✅ New registration saved to JSON: ${name} ${lastName} <${email}>`);
      return res.json({
        success: true,
        message: 'Registration successful! Welcome to Averty.'
      });
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
