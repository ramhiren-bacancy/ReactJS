function RadioField({ field, value, error, onChange, onBlur }) {
  // console.log(field)

  const handleChange = (e) => {
    onChange({ target: { name: field.name, value: e.target.value, type: field.type } });
  }
  return (
    <div className="mb-4">
      <p className="mb-1 font-medium">{field.label}
        {field.validation?.required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex gap-3">
        {field.options.map((opt) => (
          <label key={opt.value}>
            <input
              type="radio"
              name={field.name}
              value={opt.value}
              checked={value === opt.value}
              onChange={handleChange}
              onBlur={onBlur}
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default RadioField;