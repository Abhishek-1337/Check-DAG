import { Timer } from 'lucide-react';

export const delayConfig = {
  type: 'delay',
  category: 'transform',
  title: 'Delay',
  icon: Timer,
  accentColor: 'var(--cat-transform)',
  description: 'Wait before passing data',
  fields: [
    { name: 'delayMs', type: 'number', label: 'Delay (ms)', default: 1000, min: 0, max: 30000 },
  ],
  handles: [
    { id: 'in', type: 'target', position: 'left', label: 'in' },
    { id: 'out', type: 'source', position: 'right', label: 'out' },
  ],
};
