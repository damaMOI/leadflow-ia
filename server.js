require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/claude", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: "Cle API manquante" } });
  }
  try {
    const messages = req.body.messages || [];
    const prompt = messages.map(m => m.content).join("\n");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      }),
    });
    const data = await response.json();
    if (data.error) return res.json({ error: data.error });
    const text = data.choices[0].message.content;
    res.json({ content: [{ type: "text", text: text }] });
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
});

app.listen(3000, () => console.log("LeadFlow IA tourne sur http://localhost:3000"));