export function validateField(field, value) {
  const rules = field.validation ?? {};

  // checkbox's value in array
  if (field.type === "checkbox") {
    // if (rules.required && data[field.name].length === 0) {
    if(rules.required && value.length === 0) {
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
  if (rules.noSpaces && value.trim() === "") {
    return `${field.label} cannot be empty or only spaces`;
  }
  if (rules.noNumbers && /\d/.test(value)) {
    return `${field.label} cannot contain numbers`;
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

  // if (rules.matchField && value !== data[rules.matchField]) {
  //   return `Must match ${field.label.replace("Confirm ", "")}`;
  // }

  return "";
}

