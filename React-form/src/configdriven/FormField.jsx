import Tags from "./Tags";

function FormField({ field, value, error, onChange, onBlur, data }) {
  

  if (field.type === "select") {
    const options = field.optionsByGender
      ? field.optionsByGender[data.gender] ?? []
      : field.options;

    //select
    return (
      <>
      <div className="mb-4 ">
        <label htmlFor={field.name} className="block  font-medium text-black">{field.label}</label>
        <br />
        <select
          id={field.name}
          name={field.name}
          value={value}
          onChange={onChange}
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
      </>
    );
  }

  // radio
  if (field.type === "radio") {
    return (
      <>
      <div className="mb-4">
        <p className="mb-1 font-medium">{field.label}</p>
        <div className="flex gap-3">
          {field.options.map((opt) => (
            <label key={opt.value}>
              <input
                type="radio"
                name={field.name}
                value={opt.value}
                checked={value === opt.value}
                onChange={onChange}
                onBlur={onBlur}
              />
             {opt.label}
            </label>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      </>
    );
  }

  // checkbox
  if (field.type === "checkbox") {
    return (
      <>
      <div className="mb-4">
        <p className="mb-1 font-medium">{field.label}</p>
        <div className="flex gap-3">
          {field.options.map((opt) => (
            <label key={opt.value} >
              <input
                type="checkbox"
                name={field.name}
                value={opt.value}
                checked={value.includes(opt.value)}
                onChange={onChange}
                onBlur={onBlur}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      </>
    );
  }

  //tags
   if (field.type === "tags") {
    return (
      <div className="mb-4">
        <label className="block  font-medium text-black">
          {field.label}
        </label>
        <Tags
          name={field.name}
          value={value}
          placeholder= "Add a skill and press enter"
          onChange={(updatedTags) =>
            onChange({ target: { name: field.name, value: updatedTags, type: "tags" } })
          }
        />
      
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
 


  // text, email, password, confirmPassword
  return (
    <>
    <div className="mb-4">
      <label htmlFor={field.name} className="block  font-medium text-black">
        {field.label}
      </label>
      <br />
      <input
        id={field.name}
        name={field.name}
        type={field.type === "confirmPassword" ? "password" : field.type}
        value={value}
        maxLength={field.maxLength}
        onChange={onChange}
        onBlur={onBlur}
        className="border rounded py-2 px-3 w-full"
        onInput={(e)=>{
          let val = e.currentTarget.value

          if(field.maxLength && val.length > field.maxLength) {
            val = val.slice(0, field.maxLength)
          }
          e.currentTarget.value = val
        }}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
    </>
  );
}

export default FormField;