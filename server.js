import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { characters } from "./characters.js";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let lastResponse = "";

app.post("/chat", async (req, res) => {
  const { message, character } = req.body;

  const systemPrompt = `
${characters[character]}

Important:
- Do NOT repeat previous responses.
- Rephrase ideas differently each time.
- Sound human, not scripted.
- Avoid filler phrases.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.8,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ]
  });

  let reply = completion.choices[0].message.content;

  if (reply === lastResponse) {
    reply = "Say it differently. I already covered that.";
  }

  lastResponse = reply;
  res.json({ reply });
});

app.listen(3000, () => console.log("Server running on 3000"));
