const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { detectEmotion } = require("../controllers/emotionController");
const fs = require("fs");

// create uploads dir if missing
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/detect", upload.single("image"), detectEmotion);

module.exports = router;
