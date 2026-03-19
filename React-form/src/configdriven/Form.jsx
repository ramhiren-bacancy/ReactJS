import { useRef, useState } from "react";
import FormField from "./FormField.jsx";
import { runZodValidation } from "./Zodschema.js";
import { validateField } from "./Validation.js";

function init(config) {
  const data = {};
  config.forEach((field) => {
    data[field.name] =
      field.type === "checkbox" || field.type === "tags" ? [] : "";
  });
  return data;
}

export default function Form({ config }) {
  const [data, setData] = useState(() => init(config));
  const [errors, setErrors] = useState(init(config));
  const [validationMode, setValidationMode] = useState("onChange");
  const [validationEngine, setValidationEngine] = useState("manualValidation");

  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  function handleModeChange(e) {
    setValidationMode(e.target.value);
  }

  function handleEngineChange(e) {
    setValidationEngine(e.target.value);
    setErrors(init(config));
  }

  function runValidation(name, value, latestData) {
    const currentData = latestData ?? { ...data, [name]: value };

    if (validationEngine === "zodValidation") {
      const zodErrors = runZodValidation(currentData);
      setErrors((prev) => ({ ...prev, [name]: zodErrors[name] ?? "" }));
      return;
    } else {
      const field = config.find((f) => f.name === name);
      if (!field) return;

      const error = validateField(field, value, currentData);
      // cnf-password match with password
      if (field.type == "password" && confirmPasswordRef.current) {
     
        if(confirmPasswordRef.current !== passwordRef.current){
          setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match From REF" }));
        }else{
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
      }
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      let updatedValues = { ...prev, [name]: value };

      if (validationMode === "onChange") {
        runValidation(name, value, updatedValues);
      }
      return updatedValues;
    });
    if (name === "password") {
      passwordRef.current = value;
    }
    if (name === "confirmPassword") {
      confirmPasswordRef.current = value;
    }  
  };
  
  function handleBlur(e) {
    const { name, value } = e.target;

    if (validationMode === "onBlur") {
      const field = config.find((f) => f.name === name);
    
    // For array-based fields, use value from state not e.target.value
    const resolvedValue = (field?.type === "checkbox" || field?.type === "tags")
      ? data[name]
      : value;

    const updatedValues = { ...data, [name]: resolvedValue };
    runValidation(name, resolvedValue, updatedValues);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validationEngine === "zodValidation") {
       const zodErrors = runZodValidation(data);
      const hasError = Object.keys(zodErrors).length > 0;
      setErrors((prev) => ({ ...prev, ...zodErrors }));
      if (hasError) return;
    } else {
      let hasError = false;

      config.forEach((field) => {
        const error = validateField(field, data[field.name], data);
        setErrors((prev) => ({ ...prev, [field.name]: error }));
        if (error) hasError = true;
      });

      if (hasError) return;
    }

    console.log("Submitted:", data);
    alert("Success! Check console.");

    setData(init(config));
    setErrors(init(config));
    passwordRef.current = "";
    confirmPasswordRef.current = "";
  }

  function isVisible(field) {
    if (!field.conditional) return true;
    const watchValue = data[field.conditional.watchField];
    return field.conditional.showWhen.includes(watchValue);
  }

  function handleReset() {
    setData(init(config));
    setErrors(init(config));
    passwordRef.current = "";
    confirmPasswordRef.current = "";
  }

  return (
    <>
      <div className="bg-gray-400 text-black p-16 rounded mt-4 flex flex-col">
        <h2>Practice Form</h2>

        <div className="mb-4">
          <label htmlFor="validationMode" className=" font-medium text-black">
            Validation Mode:
          </label>
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

        <div>
          <label htmlFor="validationEngine" className="font-medium text-black">
            Validation Engine:
          </label>
          <select
            id="validationEngine"
            value={validationEngine}
            onChange={handleEngineChange}
            className="bg-gray-600 border rounded"
          >
            <option value="manualValidation">Manual Validation</option>
            <option value="zodValidation">Zod Validation</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {config.filter(isVisible).map((field) => (
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
          <button type="submit" className="text-white ">
            Submit
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="text-white ml-4"
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
}