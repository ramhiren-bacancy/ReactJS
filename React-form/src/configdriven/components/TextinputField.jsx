function TextInputField({ field, value, error, onChange, onBlur }) {
  // console.log(field)
  const handleChange = (e) => {
    onChange({target: { name: field.name, value: e.target.value, type: field.type }});
  }


  return (
    <div className="mb-4">
      <label htmlFor={field.name} className="block font-medium text-black">
        {field.label}
        {field.validation?.required && <span className="text-red-500">*</span>}
      </label>
      <br />
      <input
        id={field.name}
        name={field.name}
        type={field.type === "confirmPassword" ? "password" : field.type}
        value={value}
        maxLength={field.maxLength}
        onChange={handleChange}
        onBlur={onBlur}
        className="border rounded py-2 px-3 w-full"
        onInput={(e) => {
          if (field.maxLength && e.currentTarget.value.length > field.maxLength) {
            e.currentTarget.value = e.currentTarget.value.slice(0, field.maxLength);
          }
        }}

      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default TextInputField;