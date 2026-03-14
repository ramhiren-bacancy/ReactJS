function FormField({ field, value, error, onChange, onBlur }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={field.name}>{field.label}</label>
      <br />
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {/* Show error only if there is one */}
      {error && <p style={{ color: "red", margin: "4px 0 0" }}>{error}</p>}
    </div>
  );
}

export default FormField;