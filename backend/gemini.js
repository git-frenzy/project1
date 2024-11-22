
const GoogleGenerativeAI = require('google-generative-ai');

const geminiAPIKey = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(geminiAPIKey);

const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

module.exports = geminiModel;
