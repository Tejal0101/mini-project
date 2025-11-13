// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
const emotionRoute = require('./routes/emotionRoute');
const spotifyRoute = require('./routes/spotifyRoute');

app.use('/api/emotion', emotionRoute);
app.use('/api/spotify', spotifyRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
