// Groq chat proxy for the portfolio assistant.
// The model and limits are fixed here, so the browser can only send the conversation
// (and nobody can use this endpoint to run other models on the key).
const MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
const MAX_MESSAGES = 24;
const MAX_CHARS = 24000;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const messages = Array.isArray(req.body?.messages) ? req.body.messages : null;
  const valid =
    messages &&
    messages.length > 0 &&
    messages.length <= MAX_MESSAGES &&
    messages.every(
      (m) => m && ['system', 'user', 'assistant'].includes(m.role) && typeof m.content === 'string'
    ) &&
    messages.reduce((n, m) => n + m.content.length, 0) <= MAX_CHARS;
  if (!valid) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7,
        // gpt-oss models reason before answering; reasoning tokens count toward this cap
        max_tokens: 800,
        ...(MODEL.startsWith('openai/gpt-oss') && { reasoning_effort: 'low' }),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to connect to AI service' });
  }
};
