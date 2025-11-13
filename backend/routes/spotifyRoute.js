// backend/routes/spotifyRoute.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const querystring = require('querystring');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let cachedToken = null;
let tokenExpiry = 0;

async function getAppToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry - 60000) return cachedToken;
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const body = querystring.stringify({ grant_type: 'client_credentials' });
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await fetch(tokenUrl, { method:'POST', headers: { Authorization: `Basic ${auth}`, 'Content-Type':'application/x-www-form-urlencoded' }, body});
  const j = await res.json();
  if (!j.access_token) throw new Error('Spotify token failed: ' + JSON.stringify(j));
  cachedToken = j.access_token;
  tokenExpiry = now + (j.expires_in * 1000);
  return cachedToken;
}

router.get('/search', async (req, res) => {
  try {
    const q = req.query.q || 'happy';
    const limit = parseInt(req.query.limit || '50', 10);
    const token = await getAppToken();
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=${limit}`;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` }});
    const j = await r.json();
    res.json(j);
  } catch (err) {
    console.error('Spotify search error', err);
    res.status(500).json({ error: 'spotify search failed', detail: err.message });
  }
});

module.exports = router;
