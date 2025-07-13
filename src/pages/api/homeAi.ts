import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  imageBase64?: string;
  textPrompt?: string;
}

interface ResponseData {
  result?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageBase64, textPrompt } = req.body as RequestBody;

  if (!imageBase64 && !textPrompt) {
    return res.status(400).json({ error: 'Image or text prompt required' });
  }

  try {
    const messages: Array<{ role: string; content: Array<{ type: string; text?: string; image_url?: string }> }> = [
      {
        role: 'user',
        content: [],
      },
    ];

    if (imageBase64) {
      messages[0].content.push({
        type: 'image_url',
        image_url: imageBase64, 
      });
    }

    if (textPrompt) {
      messages[0].content.push({
        type: 'text',
        text: textPrompt,
      });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_IMAGE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free',
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content || 'No response content';

    return res.status(200).json({ result });
  } catch (error: unknown) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}