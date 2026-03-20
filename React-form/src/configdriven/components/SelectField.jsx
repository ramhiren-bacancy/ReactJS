  function SelectField({ field, value, error, onChange, onBlur, data }) {
    // console.log("data",data)
    // console.log("field:",  field)
    // console.log ("optionsByGender", field.optionsByGender)
    // const options = field.optionsByGender
    //   ? field.optionsByGender[data?.gender] ?? []
    //   : field.options;

    const dynamicKey = Object.keys(field).find((k) => k.startsWith("optionsBy"));

    const options = dynamicKey
      ? field[dynamicKey][data?.[field.conditional?.watchField]] ?? []  // ✅ from conditional
      : field.options;



      const handleChange = (e) => {
      onChange({ target: { name: field.name, value: e.target.value, type: field.type } });
      }


    return (
      <div className="mb-4">
        <label htmlFor={field.name} className="block font-medium text-black">
          {field.label}
         {field.validation?.required && <span className="text-red-500">*</span>}
        </label>
        <br />
        <select
          id={field.name}
          name={field.name}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }

  export default SelectField;