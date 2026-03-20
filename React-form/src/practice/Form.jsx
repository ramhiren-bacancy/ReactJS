import { useState, useRef } from "react";
import { formConfig } from "./Formconfig.js";
import FormField from "./FormField.jsx";

function init(){
    const data ={}
    formConfig.forEach((field) => {
        data[field.name] = "";
    });
    return data;
}

export default function Form() {

  const [data, setData] = useState(init);

  const [errors, setErrors] = useState(init);

  console.log("Render", { data, errors });

  const [validationMode, setValidationMode] = useState("onBlur");

  function handleModeChange(e) {
    const mode = e.target.value;
    setValidationMode(mode);
  }

  function validateField(field, value) {
    const rules = field.validation ?? {};

    if (rules.required && !value) {
      return `${field.name} is required`;
    }
    if (rules.numbersOnly && !/^\d+$/.test(value)) {
      return `${field.name} must be a number`;
    }
    if (rules.maxValue && Number(value) > rules.maxValue) {
      return `Enter a valid ${field.name}`;
    }
    if (rules.minLength && value.length < rules.minLength) {
      return `${field.name} must be at least ${rules.minLength} characters`;
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.patternMessage ?? `${field.name} is invalid`;
    }

    return "";
  }

  function runValidation(name, value) {
    const field = formConfig.find((f) => f.name === name);
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    if (validationMode === "onChange") {
      runValidation(name, value);
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;

    if (validationMode === "onBlur") {
      runValidation(name, value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // const newErrors = {};
    let hasError = false;

    formConfig.forEach((field) => {
      const error = validateField(field, data[field.name]);
      setErrors((prev) => ({
        ...prev,
        [field.name]: error,
      }));
      //   newErrors[field.name] = error;
      if (error) hasError = true;
    });

    // setErrors(newErrors);
    if (hasError) return;

    console.log("Submitted:", data);
    alert("Success! Check console.");
  }

  return (
    <div>
      <h2>Practice Form</h2>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="validationMode">Validation Mode: </label>
        <select
          id="validationMode"
          value={validationMode}
          onChange={handleModeChange}
        >
          <option value="onBlur">onBlur</option>
          <option value="onChange">onChange</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        {formConfig.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={data[field.name]}
            error={errors[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
