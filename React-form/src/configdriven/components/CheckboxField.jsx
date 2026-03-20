function CheckboxField({ field, value, error, onChange, onBlur }) {

  const handleChange = (e) => {
    const { checked, value: val } = e.target;

    const updatedValue = checked
      ? [...value, val]
      : value.filter((v) => v !== val);
    onChange({ target: { name: field.name, value: updatedValue, type: field.type } });
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
              type="checkbox"
              name={field.name}
              value={opt.value}
              checked={value.includes(opt.value)}
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

export default CheckboxField;