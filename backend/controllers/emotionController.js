// backend/controllers/emotionController.js (stub)
const fs = require('fs');

exports.detectEmotion = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    try { fs.unlinkSync(req.file.path); } catch(e){}

    const labels = ['happy','sad','angry','disgust','fear','neutral','surprise'];
    const idx = Math.floor((Date.now()/1000) % labels.length);
    const emotion = labels[idx];
    const scores = {};
    labels.forEach((l,i) => scores[l] = i===idx ? 0.9 : 0.02);

    res.json({ emotion, scores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'stub failed' });
  }
};
