'use strict';

const express = require('express');
const { hexToRgb } = require('./hexToRgb');

/**
 * Express application. Kept separate from server.js so that tests can
 * import the app without opening a network port.
 */
const app = express();

/**
 * GET /api/hex-to-rgb/:hex
 *
 * Converts the hex colour in the path to RGB.
 * The "#" character must be left out (or URL-encoded as %23).
 *
 * 200: { "hex": "ff8800", "rgb": { "r": 255, "g": 136, "b": 0 } }
 * 400: { "error": "<reason>" }
 */
app.get('/api/hex-to-rgb/:hex', (req, res) => {
  try {
    const rgb = hexToRgb(req.params.hex);
    res.status(200).json({ hex: req.params.hex, rgb });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fallback for unknown routes, returns JSON instead of Express' default HTML.
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
