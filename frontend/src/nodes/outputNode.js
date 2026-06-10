import { Terminal } from 'lucide-react';

export const outputConfig = {
  type: 'customOutput',
  category: 'output',
  title: 'Output',
  icon: Terminal,
  accentColor: 'var(--cat-output)',
  description: 'A pipeline output node',
  fields: [
    { name: 'outputName', type: 'text', label: 'Name', default: 'output_1' },
    { name: 'outputType', type: 'select', options: ['Text', 'Image', 'JSON', 'File'], default: 'Text', label: 'Type' },
  ],
  handles: [
    { id: 'value', type: 'target', position: 'left', label: 'value' },
  ],
};
