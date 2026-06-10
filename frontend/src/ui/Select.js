export function Select({ field, value, onChange }) {
  return (
    <div className="field">
      {field.label && <label className="field-label">{field.label}</label>}
      <select
        className="field-select"
        value={value ?? field.default ?? (field.options?.[0] ?? '')}
        onChange={(e) => onChange(field.name, e.target.value)}
      >
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
