import { Calculator } from 'lucide-react';

export const mathConfig = {
  type: 'math',
  category: 'transform',
  title: 'Math',
  icon: Calculator,
  accentColor: 'var(--cat-transform)',
  description: 'Perform a math operation',
  fields: [
    { name: 'operation', type: 'select', options: ['add', 'subtract', 'multiply', 'divide', 'average', 'max', 'min'], default: 'add', label: 'Operation' },
  ],
  handles: [
    { id: 'a', type: 'target', position: 'left', label: 'a', style: { top: '33%' } },
    { id: 'b', type: 'target', position: 'left', label: 'b', style: { top: '66%' } },
    { id: 'result', type: 'source', position: 'right', label: 'result' },
  ],
};
