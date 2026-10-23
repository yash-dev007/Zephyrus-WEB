export const providers = {
  local: ['Ollama', 'LM Studio', 'vLLM', 'SGLang', 'llama.cpp', 'Any /v1'],
  hosted: ['Anthropic', 'Gemini', 'Groq', 'xAI', 'OpenRouter', 'OpenAI', 'DeepSeek'],
} as const;
