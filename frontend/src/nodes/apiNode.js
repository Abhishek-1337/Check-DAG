import { Globe } from 'lucide-react';

export const apiConfig = {
  type: 'api',
  category: 'transform',
  title: 'API Call',
  icon: Globe,
  accentColor: 'var(--cat-transform)',
  description: 'Make an HTTP request',
  fields: [
    { name: 'url', type: 'text', label: 'URL', default: '', placeholder: 'https://api.example.com' },
    { name: 'method', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], default: 'GET', label: 'Method' },
    { name: 'timeout', type: 'number', label: 'Timeout (s)', default: 30, min: 1, max: 300 },
  ],
  handles: [
    { id: 'in', type: 'target', position: 'left', label: 'in' },
    { id: 'response', type: 'source', position: 'right', label: 'response' },
  ],
};
