export function TextArea({ field, value, onChange, placeholder, style, onScroll, invalid }) {
  return (
    <div className="field">
      {field.label && <label className="field-label">{field.label}</label>}
      <textarea
        className={`field-textarea${invalid ? ' field-textarea--invalid' : ''}`}
        value={value ?? field.default ?? ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={placeholder ?? field.placeholder}
        style={style}
        onScroll={onScroll}
      />
    </div>
  );
}
