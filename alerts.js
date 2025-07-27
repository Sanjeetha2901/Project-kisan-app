// alerts.js
const functions = require('firebase-functions/v2');
const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require('@google/generative-ai');
admin.initializeApp();

const db = admin.firestore();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const chatModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

exports.sendDailyAlerts = functions.pubsub.schedule('every 24 hours').onRun(async () => {
  const usersSnap = await db.collection('users').get();

  for (const doc of usersSnap.docs) {
    const user = doc.data();
    const crops = (user.trackedCrops || []).join(', ');
    const lang = user.language || 'ta';

    const prompt = `
      Provide a short daily farming alert in ${lang === 'ta' ? 'Tamil' : 'English'}:
      - Weather for ${user.village}
      - Mandi price or trend for: ${crops || 'tomato'}
      - Advice for farmers
    `;

    const result = await chatModel.generateContent(prompt);
    const reply = result.response.text();

    await db.collection('users').doc(doc.id).collection('alerts').add({
      message: reply,
      createdAt: new Date().toISOString()
    });

    console.log(`Sent alert to ${doc.id}`);
  }

  return null;
});
