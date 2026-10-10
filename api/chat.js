// Chat proxy for the portfolio assistant.
// The provider, model and limits are fixed here, so the browser can only send the conversation
// (and nobody can use this endpoint to run other models on the key).
//
// Pick the provider with CHAT_PROVIDER (groq, gemini or openrouter) and set that provider's key.
// CHAT_MODEL overrides the default model. All three speak the OpenAI chat-completions format.
const PROVIDERS = {
  groq: {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    keyEnv: 'GROQ_API_KEY',
    model: 'openai/gpt-oss-20b',
  },
  gemini: {
    url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    keyEnv: 'GEMINI_API_KEY',
    model: 'gemini-2.5-flash',
  },
  openrouter: {
    url: 'https://openrouter.ai/api/v1/chat/completions',
    keyEnv: 'OPENROUTER_API_KEY',
    model: 'openai/gpt-oss-20b:free',
  },
};
const MAX_MESSAGES = 24;
const MAX_CHARS = 24000;

// Keep "thinking" short so replies stay fast and inside the token cap
function reasoningOptions(providerName, model) {
  if (providerName === 'groq' && model.startsWith('openai/gpt-oss')) return { reasoning_effort: 'low' };
  if (providerName === 'gemini') return { reasoning_effort: 'low' };
  if (providerName === 'openrouter' && model.includes('gpt-oss')) return { reasoning: { effort: 'low' } };
  return {};
}

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

  const providerName = (process.env.CHAT_PROVIDER || 'groq').toLowerCase();
  const provider = PROVIDERS[providerName];
  if (!provider) {
    return res.status(500).json({ error: `Unknown CHAT_PROVIDER "${providerName}"` });
  }
  const apiKey = process.env[provider.keyEnv];
  if (!apiKey) {
    return res.status(500).json({ error: `${provider.keyEnv} is not configured` });
  }
  // GROQ_MODEL is still honoured for Groq so existing setups keep working
  const model = process.env.CHAT_MODEL || (providerName === 'groq' && process.env.GROQ_MODEL) || provider.model;

  try {
    const response = await fetch(provider.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        ...(providerName === 'openrouter' && { 'X-Title': 'Wasif Rehman portfolio' }),
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        // Reasoning tokens count toward this cap on models that think before answering
        max_tokens: 800,
        ...reasoningOptions(providerName, model),
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
