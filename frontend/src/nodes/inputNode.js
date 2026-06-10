import { FileText } from 'lucide-react';

export const inputConfig = {
  type: 'customInput',
  category: 'source',
  title: 'Input',
  icon: FileText,
  accentColor: 'var(--cat-source)',
  description: 'A pipeline input node',
  fields: [
    { name: 'inputName', type: 'text', label: 'Name', default: 'input_1' },
    { name: 'inputType', type: 'select', options: ['Text', 'File', 'Number', 'JSON'], default: 'Text', label: 'Type' },
  ],
  handles: [
    { id: 'value', type: 'source', position: 'right', label: 'value' },
  ],
};
