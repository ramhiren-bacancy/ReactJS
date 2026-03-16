import { useRef, useState } from "react";
import { formConfig } from "./FormConfig.js";
import FormField from "./FormField.jsx";


function init() {
  const data = {};
  formConfig.forEach((field) => {
    data[field.name] = field.type === "checkbox" || field.type === "tags" ? [] : "";
  });
  return data;
}

export default function Form() {
  const [data, setData] = useState(init);
  const [errors, setErrors] = useState(init);
  const [validationMode, setValidationMode] = useState("onChange");

  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  function handleModeChange(e) {
    setValidationMode(e.target.value);
  }

  function validateField(field, value) {
    const rules = field.validation ?? {};

    // checkbox's value in array
    if (field.type === "checkbox") {
      if (rules.required && value.length === 0) {
        return `Please select at least one ${field.label}`;
      }
      return "";
    }
    
    if (field.type === "tags") {
      if (rules.required && value.length === 0) {
        return `Please add at least one ${field.label}`;
      }
      return "";
    }

    if (rules.required && !value) {
      return `${field.label} is required`;
    }
    if (rules.numbersOnly && !/^\d+$/.test(value)) {
      return `${field.label} must be a number`;
    }
    if (rules.maxValue && Number(value) > rules.maxValue) {
      return `Enter a valid ${field.label}`;
    }
    if (rules.minLength && value.length < rules.minLength) {
      return `${field.label} must be at least ${rules.minLength} characters`;
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.patternMessage ?? `${field.label} is invalid`;
    }
    if (rules.strongPassword && !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
      return "Enter strong password (8+ chars, 1 uppercase, 1 number)";
    }
    // cnf-password match with password
    if (rules.matchField && value !== data[rules.matchField]) {
      return "Passwords do not match";
    }

    if (rules.matchField && value !== passwordRef.current) {
      return "Passwords do not match";
    }

    return "";
  }

  function runValidation(name, value) {
    const field = formConfig.find((f) => f.name === name);
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    //if tags is come
    if (type === "tags") {
      setData((prev) => ({ ...prev, [name]: value }));
      if (validationMode === "onChange") runValidation(name, value);
      return;
    }

    //when checkbox come
    if (type === "checkbox") {
      const prev = data[name];
      const updated = checked
        ? [...prev, value]
        : prev.filter((v) => v !== value);

      setData((prev) => ({ ...prev, [name]: updated }));

      if (validationMode === "onChange") {
        runValidation(name, updated);
      }
      return;
    }

    if (name === "password") {
      passwordRef.current = value;
 
    
      // if cnf-password already have value,so reValidate that
      if (confirmPasswordRef.current) {
        runValidation("confirmPassword", confirmPasswordRef.current);
      }
    }
 
    if (name === "confirmPassword") {
      confirmPasswordRef.current = value;
    }

    setData((prev) => ({ ...prev, [name]: value }));

    if (validationMode === "onChange") {
      runValidation(name, value);
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;

    if (validationMode === "onBlur") {
      runValidation(name, value);

      // in blur mode password field blur and cnf-password already have value,so reValidate that
      if (name === "password" && confirmPasswordRef.current) {
        runValidation("confirmPassword", confirmPasswordRef.current);
      }
    }
  }

  

  function handleSubmit(e) {
    e.preventDefault();

    let hasError = false;

    formConfig.forEach((field) => {

      const error = validateField(field, data[field.name]);
      setErrors((prev) => ({ ...prev, [field.name]: error }));
      if (error) hasError = true;
    });

    if (hasError) return;

    console.log("Submitted:", data);
    alert("Success! Check console.");
   
    setData(init());
    setErrors(init());
    passwordRef.current = "";
    confirmPasswordRef.current = "";
  }

  function isVisible(field) {
    if (!field.conditional) return true;
    const watchValue = data[field.conditional.watchField];
    return field.conditional.showWhen.includes(watchValue);
  }

   function handleReset() {

    
    setData(init());
    setErrors(init());
    passwordRef.current = "";
    confirmPasswordRef.current = "";
  }

  return (
    <>
      <div className="bg-gray-400 text-black p-16 rounded mt-4 flex flex-col">
      <h2>Practice Form</h2>

      <div className="mb-4">
        <label htmlFor="validationMode" className=" font-medium text-black">Validation Mode: </label>
        <select
          id="validationMode"
          value={validationMode}
          onChange={handleModeChange}
          className="bg-gray-600 border rounded"
        >
          <option value="onBlur">onBlur</option>
          <option value="onChange">onChange</option>
          <option value="onSubmit">onSubmit</option>+
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        {formConfig.filter(isVisible).map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={data[field.name]}
            error={errors[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            data={data}  
    
          />
        ))}
        <button type="submit" className="text-white ">Submit</button>

          <button type="button" onClick={handleReset} className="text-white ml-4">Reset</button>
      </form>
      </div>
    </>
  );
}