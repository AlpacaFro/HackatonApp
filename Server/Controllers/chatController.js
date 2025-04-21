const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
});

exports.sendChatMessage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Replace with "gpt-4" if needed
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    res.status(200).json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    res.status(500).json({ error: "Failed to process AI request" });
  }
};
