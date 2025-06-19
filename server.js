// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = 'AIzaSyBsdYS0Cxcb8N6IA5Q3PEeadFdS57yEXzU'; // Replace this

app.post('/ask-gemini', async (req, res) => {
  try {
    const userPrompt = req.body.prompt;

    const fullPrompt = `
My name is Raymond Williams. I am a front-end developer and aspiring AI enthusiast based in Abuja Nigeria.
I specialize in HTML5, CSS3, JavaScript, React, UI/UX, GSAP, Next.js. I’ve built sleek up to date websites, portfolio sites, simple games, and more.
I’m passionate about design, sleek user interfaces, and creating meaningful digital experiences.

User: ${userPrompt}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }]
      })
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't answer that.";
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error occurred." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
