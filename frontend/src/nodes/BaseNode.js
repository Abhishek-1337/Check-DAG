import { useCallback, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { registry } from './registry';
import { TextInput } from '../ui/TextInput';
import { TextArea } from '../ui/TextArea';
import { Select } from '../ui/Select';

const fieldComponents = {
  text: TextInput,
  textarea: TextArea,
  number: TextInput,
  select: Select,
};

function toHandlePosition(pos) {
  const map = { left: Position.Left, right: Position.Right, top: Position.Top, bottom: Position.Bottom };
  return map[pos] ?? Position.Left;
}

export function BaseNode({ id, data, type, selected, style: sizeStyle }) {
  const config = registry[type];
  const updateNodeData = useStore((s) => s.updateNodeData);

  const handleChange = useCallback((fieldName, value) => {
    updateNodeData(id, { [fieldName]: value });
  }, [id, updateNodeData]);

  const handles = useMemo(() => {
    if (!config) return [];
    const raw = typeof config.handles === 'function' ? config.handles(data) : config.handles;
    if (!raw) return [];
    return raw.map((h, i) => ({
      ...h,
      id: typeof h.id === 'string' && !h.id.startsWith(`${id}-`) ? `${id}-${h.id}` : h.id,
      key: `${id}-${h.id || i}`,
      position: toHandlePosition(h.position ?? (h.type === 'source' ? 'right' : 'left')),
    }));
  }, [config, data, id]);

  if (!config) {
    return <div className="node" style={{ width: 200, height: 80 }}>Unknown: {type}</div>;
  }

  const fields = config.fields || [];

  return (
    <div
      className={`node${selected ? ' node--selected' : ''}`}
      style={{
        '--node-accent': config.accentColor,
        ...sizeStyle,
      }}
    >
      {handles.filter(h => h.type === 'target').map((h) => (
        <Handle key={h.key} type="target" position={h.position} id={h.id} style={h.style} />
      ))}

      <div className="node-header">
        {config.icon && <config.icon size={16} className="node-icon" />}
        <span className="node-title">{config.title}</span>
        <span className="node-badge">{config.category}</span>
      </div>

      {config.description && (
        <div className="node-description">{config.description}</div>
      )}

      <div className="node-fields">
        {fields.map((field) => {
          const FieldComp = fieldComponents[field.type];
          if (!FieldComp) return null;
          const value = data?.[field.name] ?? field.default;
          return (
            <div key={field.name} className={field.type === 'textarea' ? 'field-wrapper-textarea' : 'field-wrapper'}>
              <FieldComp
                field={field}
                value={value}
                onChange={handleChange}
                nodeId={id}
              />
            </div>
          );
        })}
      </div>

      {handles.filter(h => h.type === 'source').map((h) => (
        <Handle key={h.key} type="source" position={h.position} id={h.id} style={h.style} />
      ))}
    </div>
  );
}
