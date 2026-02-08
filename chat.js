import { OpenAI } from "openai";

// Gue masukin langsung sesuai permintaan lo biar praktis
const openai = new OpenAI({
  apiKey: "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", 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Pesan kosong' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Kamu adalah Prime AI, asisten pintar." },
        { role: "user", content: message }
      ],
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memproses pesan.", details: error.message });
  }
                                 }
      
