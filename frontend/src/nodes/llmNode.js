import { Brain } from 'lucide-react';

export const llmConfig = {
  type: 'llm',
  category: 'ai',
  title: 'LLM',
  icon: Brain,
  accentColor: 'var(--cat-ai)',
  description: 'A large language model',
  fields: [
    { name: 'model', type: 'select', options: ['gpt-4', 'gpt-3.5', 'claude-3', 'llama-3'], default: 'gpt-4', label: 'Model' },
    { name: 'temperature', type: 'number', default: 0.7, label: 'Temperature', min: 0, max: 2 },
    { name: 'maxTokens', type: 'number', default: 1024, label: 'Max Tokens', min: 1, max: 8192 },
  ],
  handles: [
    { id: 'system', type: 'target', position: 'left', label: 'system', style: { top: '33%' } },
    { id: 'prompt', type: 'target', position: 'left', label: 'prompt', style: { top: '66%' } },
    { id: 'response', type: 'source', position: 'right', label: 'response' },
  ],
};
