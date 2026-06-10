import { Type } from 'lucide-react';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function validateText(text) {
  if (!text) return { vars: [], invalid: false, invalidMatch: null };
  const vars = [];
  let invalid = false;
  let invalidMatch = null;
  const regex = /\{\{\s*([^}]+)\s*\}\}/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const inner = m[1].trim();
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(inner)) {
      vars.push(inner);
    } else {
      invalid = true;
      invalidMatch = m[0];
    }
  }
  return { vars: [...new Set(vars)], invalid, invalidMatch };
}

export const textConfig = {
  type: 'text',
  category: 'transform',
  title: 'Text',
  icon: Type,
  accentColor: 'var(--cat-transform)',
  description: 'Text with variable interpolation',
  fields: [
    {
      name: 'text',
      type: 'textarea',
      label: 'Text',
      default: '{{input}}',
      placeholder: 'Enter text with {{ variables }}',
    },
  ],
  handles: (data) => {
    const text = data?.text || '';
    const { vars, invalid } = validateText(text);
    if (invalid && vars.length === 0) {
      return [{ id: 'out', type: 'source', position: 'right', label: 'out' }];
    }
    const handles = vars.map((v, i) => ({
      id: v,
      type: 'target',
      position: 'left',
      label: v,
      style: { top: `${60 + i * 24}px` },
    }));
    handles.push({ id: 'out', type: 'source', position: 'right', label: 'out' });
    return handles;
  },
};

export { validateText };
