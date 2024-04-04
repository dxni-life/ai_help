const express = require('express');
const openai = require('openai');

require('dotenv').config();

const app = express();
const port = 3001;

openai.apiKey = //(in email)

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/AIchatbox', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await openai.Completion.create({
      engine: 'gpt-3.5-turbo',
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    res.json({ text: response.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
