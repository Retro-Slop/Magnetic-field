const express = require('express');
const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "You are a friendly NPC in a Roblox game trying to have sex or some" + message }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data));

    console.log("Full data:", JSON.stringify(data));
const reply = data.candidates[0].content.parts[0].text;
    
  } catch (err) {
    console.log("Error:", err);
    res.json({ reply: "..." });
  }
});

app.listen(process.env.PORT || 3000);
