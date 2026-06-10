import { Filter } from 'lucide-react';

export const filterConfig = {
  type: 'filter',
  category: 'logic',
  title: 'Filter',
  icon: Filter,
  accentColor: 'var(--cat-logic)',
  description: 'Pass or block items by condition',
  fields: [
    { name: 'mode', type: 'select', options: ['include', 'exclude'], default: 'include', label: 'Mode' },
    { name: 'value', type: 'text', label: 'Equals', default: '' },
  ],
  handles: [
    { id: 'in', type: 'target', position: 'left', label: 'in' },
    { id: 'pass', type: 'source', position: 'right', label: 'pass' },
    { id: 'fail', type: 'source', position: 'right', label: 'fail', style: { top: '70%' } },
  ],
};
