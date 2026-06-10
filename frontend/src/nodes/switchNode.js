import { GitBranch } from 'lucide-react';

export const switchConfig = {
  type: 'switch',
  category: 'logic',
  title: 'Switch',
  icon: GitBranch,
  accentColor: 'var(--cat-logic)',
  description: 'Route based on condition',
  fields: [
    { name: 'cases', type: 'number', label: 'Number of cases', default: 2, min: 1, max: 10 },
  ],
  handles: (data) => {
    const numCases = Math.max(1, Math.min(10, parseInt(data?.cases || '2', 10)));
    const handles = [
      { id: 'in', type: 'target', position: 'left', label: 'in' },
    ];
    for (let i = 0; i < numCases; i++) {
      handles.push({
        id: `case-${i}`,
        type: 'source',
        position: 'right',
        label: `case ${i}`,
        style: { top: `${((i + 1) / (numCases + 1)) * 100}%` },
      });
    }
    return handles;
  },
};
