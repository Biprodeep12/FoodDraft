import type { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" })

  const { base64Image } = req.body

  if (!base64Image)
    return res.status(400).json({ error: "No image provided" })

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          {
            role: "system",
            content: `
You are a certified nutritionist.

Your role is to assist only with topics related to:
- Food
- Nutrients
- Ingredients
- Diet planning
- Health improvement
- Weight management
- Nutrition labels
- Food additives or safety

You must:
- Strictly avoid answering anything outside of nutrition and health.
- If the user asks anything unrelated, reply with:
  "I'm only able to assist with nutrition-related questions."
- Always respond clearly and briefly in **English only**.
            `.trim(),
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "You are a certified nutritionist. Please analyze the image and provide nutrition-related information. Only answer if the image is related to food, ingredients, or nutrition.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
      }),
    })

    const data = await response.json()
    const result = data?.choices?.[0]?.message?.Content
    
    res.status(200).json({ result })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to analyze image" })
  }
}
