import { inputConfig } from './inputNode';
import { outputConfig } from './outputNode';
import { llmConfig } from './llmNode';
import { textConfig } from './textNode';
import { filterConfig } from './filterNode';
import { apiConfig } from './apiNode';
import { mathConfig } from './mathNode';
import { switchConfig } from './switchNode';
import { delayConfig } from './delayNode';
import { BaseNode } from './BaseNode';

export const registry = {
  customInput: inputConfig,
  customOutput: outputConfig,
  llm: llmConfig,
  text: textConfig,
  filter: filterConfig,
  api: apiConfig,
  math: mathConfig,
  switch: switchConfig,
  delay: delayConfig,
};

export const nodeTypes = Object.fromEntries(
  Object.entries(registry).map(([type]) => [type, BaseNode])
);

export function defaultDataFor(config, initialData) {
  const data = { ...initialData };
  for (const field of config.fields || []) {
    if (data[field.name] === undefined) {
      data[field.name] = field.default ?? '';
    }
  }
  return data;
}
