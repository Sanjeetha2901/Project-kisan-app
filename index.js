const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Enable CORS and JSON parsing
app.use(cors({ origin: true }));
app.use(express.json({ limit: "10mb" }));

/**
 * ✅ /voiceBot - POST
 * Predefined replies for demo/judging
 */
app.post("/voiceBot", async (req, res) => {
  try {
    const { text, sessionId } = req.body;

    const demoResponses = {
      "தக்காளி நோய் என்ன": "❗தக்காளியில் இலை மஞ்சள் நோய் உள்ளது. ✅ தீர்வு: நெமாசன் 10ml/லிட்டர் தெளிக்கவும்.",
      "what is tomato disease": "❗Tomato Leaf Yellow Disease detected. ✅ Spray Nemasan 10ml/ltr.",
      "pm kisan eligibility": "✅ PM-KISAN: 2 ஹெக்டேருக்கு குறைவாக நிலம் உள்ள விவசாயிகள் தகுதி பெறுவர்.",
      "pm கிசான் தகுதி": "✅ PM-KISAN: 2 ஹெக்டேருக்கு குறைவாக நிலம் உள்ள விவசாயிகள் தகுதி பெறுவர்.",
      "mandi prices": "🧺 வெங்காயம் ₹25/kg, தக்காளி ₹18/kg, மக்காச்சோளம் ₹22/kg.",
      "weather": "☁️ இன்று மேகமூட்டம் மற்றும் லேசான மழை எதிர்பார்க்கப்படுகிறது."
    };

    const normalized = text.trim().toLowerCase();

    if (demoResponses[normalized]) {
      return res.status(200).json({ text: demoResponses[normalized], audio: "" });
    }

    const fallback = `🗣️ நீங்கள் சொன்னது: ${text} — பதிலாக தகவல் வழங்கப்படுகிறது.`;
    res.status(200).json({ text: fallback, audio: "" });

  } catch (err) {
    console.error("voiceBot error:", err);
    res.status(500).send("Internal Error");
  }
});

/**
 * ✅ /mandi-prices - GET
 */
app.get("/mandi-prices", async (req, res) => {
  try {
    res.status(200).json({
      prices: {
        "வெங்காயம்": "₹25/kg",
        "மக்காச்சோளம்": "₹22/kg",
        "தக்காளி": "₹18/kg"
      }
    });
  } catch (err) {
    console.error("mandi-prices error:", err);
    res.status(500).send("Internal Error");
  }
});

/**
 * ✅ /crop-diagnosis - POST
 */
app.post("/crop-diagnosis", async (req, res) => {
  try {
    const { imageBase64, cropType } = req.body;

    const disease = `❗${cropType} இலை மஞ்சள் நோய்`;
    const solution = `✅ நெமாசன் 10ml/லிட்டர் தெளிக்கவும்`;

    res.status(200).json({ disease, solution });
  } catch (err) {
    console.error("crop-diagnosis error:", err);
    res.status(500).send("Internal Error");
  }
});

/**
 * ✅ Export everything under /api/
 */
exports.api = functions.region("us-central1").https.onRequest(app);
