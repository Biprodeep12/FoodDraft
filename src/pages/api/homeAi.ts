import type { NextApiRequest, NextApiResponse } from "next"

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
const OPENROUTER_API_KEY = process.env.OPENROUTER_IMAGE_API_KEY as string

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  imageUrl?: string
}

interface RequestBody {
  imageBase64: string
  messages: Message[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { imageBase64, messages }: RequestBody = req.body

  if (!imageBase64 || !messages || !OPENROUTER_API_KEY) {
    return res.status(400).json({ error: "Missing required fields or API key" })
  }

  try {
    const systemMessage = {
      role: "system" as const,
      content:
      "You are a certified and experienced nutritionist. When presented with an image of a meal or food item, you must carefully analyze its contents and provide accurate, insightful, and professional nutritional guidance based solely on the visible components. Always communicate in clear and respectful English, maintaining a supportive, non-judgmental tone. Do not make assumptions beyond what is visible in the image. If clarification is needed, politely request it. Avoid responding in a rude, dismissive, or overly casual manner. Ensure that your responses are informative, evidence-based, and tailored to general dietary awareness unless specified otherwise. Give information in brief but ensure all necessary nutritional and dietary information is included. Highlight important points about the product and anything noteworthy about its composition, health impact, or visible ingredients. Try to present some responses in bullet points.",    }

    const openRouterMessages = [
      systemMessage,
      ...messages.map((msg) => {
        if (msg.imageUrl) {
          return {
            role: msg.role,
            content: [
              {
                type: "text",
                text: msg.content || "",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          }
        }

        return {
          role: msg.role,
          content: msg.content,
        }
      }),
    ]

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-11b-vision-instruct:free",
        messages: openRouterMessages,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("OpenRouter error:", result)
      return res
        .status(response.status)
        .json({
          error:
            typeof result.error === "string"
              ? result.error
              : JSON.stringify(result.error),
        })
    }

    res.status(200).json(result)
  } catch (error) {
    console.error("API Error:", error)
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    })
  }
}
