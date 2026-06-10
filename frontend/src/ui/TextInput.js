import { useStore } from '../store';

export function TextInput({ nodeId, field, value, onChange }) {
  return (
    <div className="field">
      {field.label && <label className="field-label">{field.label}</label>}
      <input
        className="field-input"
        type="text"
        value={value ?? field.default ?? ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
      />
    </div>
  );
}
