import type { NextApiRequest, NextApiResponse } from 'next';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Received request with body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages, product } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Messages are required and must be an array' 
      });
    }

    if (!OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const productInfo = product
    ? `\n\nHere is product information you should use while answering:\n\nProduct Name: ${product.product_name}\nBrand: ${product.brands}\nNutriments: ${JSON.stringify(product.nutriments, null, 2)}\nIngredients: ${product.ingredients_tags?.slice(0, 15).join(', ')}\n\n`
    : "";

    const systemPrompt = `
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
      ${productInfo}
      `;

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...messages,
        ],
      }),
    });

    const responseData = await response.json();
    // console.log('OpenRouter response:', responseData);

    if (!response.ok) {
      console.error('OpenRouter API error:', responseData);
      return res.status(500).json({ 
        error: 'AI service error',
        details: responseData.error?.message || 'Unknown error from OpenRouter'
      });
    }

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('API handler error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}