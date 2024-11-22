// Import required modules
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const axios = require('axios');
require('dotenv').config();

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));



// Initialize Google Generative AI API
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Set generation configuration
const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 150,
  responseMimeType: "text/plain",
};

// Define the chat route
app.post('/chat', async (req, res) => {



  const userMessage = req.body.message;

  // Validate if the user message is provided
  if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
    return res.status(400).json({ error: 'Message is required and cannot be empty.' });
  }

  try {
    console.log("Received message:", userMessage);  // Log incoming message for debugging

    // Define the parts (input/output pairs) including the custom responses
    const parts = [
      { text: "input: what is your name" },
      { text: "output: Well, well well. I don't have a name but Mr. Kanishk Suri created me." },
      { text: "input: who made you" },
      { text: "output: Mr. Kanishk Suri" },
      { text: "input: can you remember our older chats" },
      { text: "output: I mean I can but you aren't paying me for that" },
      { text: `input: ${userMessage}` }, // Add the user message dynamically
      { text: "output: " }, // Placeholder for the output
    ];

    // Generate content using the Gemini model
    const result = await model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig,
    });

    console.log("Full result from Gemini:", result);  // Log the full response from the Gemini API

    // Check if the response is valid
    if (result && result.response && result.response.text) {
      const responseText = await result.response.text(); // Call the text function to get the actual content
      console.log("Generated content:", responseText); // Log the actual content

      res.json({ reply: responseText }); // Send the generated content as the reply
    } else {
      res.status(500).json({ error: 'No valid response from the model.' });
    }
  } catch (error) {
    console.error('Error generating content:', error);

    if (error?.response?.status === 401) {
      res.status(401).json({ error: 'Invalid authentication credentials. Please check your API key.' });
    } else if (error?.response?.status === 400) {
      res.status(400).json({ error: 'Bad request: Check the input format or parameters.' });
    } else {
      res.status(500).json({ error: 'Something went wrong while processing the request.' });
    }
  }
});

// Register route
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  FormDataModel.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.json("Already registered");
      } else {
        FormDataModel.create(req.body)
          .then(log_reg_form => res.json(log_reg_form))
          .catch(err => res.json(err));
      }
    });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  FormDataModel.findOne({ email: email })
    .then(user => {
      if (user) {
        // Check if the password matches
        if (user.password === password) {
          return res.json("Success");
        } else {
          return res.status(401).json({ message: "Wrong password" }); // Unauthorized access
        }
      } else {
        return res.status(404).json({ message: "No records found!" }); // Not found error
      }
    })
    .catch(err => {
      console.error('Login Error:', err);
      res.status(500).json({ message: "Internal server error during login", error: err.message });
    });
});

// Server listening
const host = '192.168.29.129';  // Use the local network IP of the machine
const port = 3001;

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
