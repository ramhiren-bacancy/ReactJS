export const jobApplicationConfig = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    validation: {
      required: true,
      minLength: 3,
    },
  },

  {
    name: "experienceYears",
    label: "Years of Experience",
    type: "number",
    maxLength: 2,
    validation: {
      required: true,
      numbersOnly: true,
      maxValue: 50,
      maxLength: 2,
    },
  },

  {
    name: "applyingFor",
    label: "Applying For",
    type: "select",
    options: [
      { label: "Select Role", value: "" },
      { label: "Frontend Developer", value: "frontend" },
      { label: "Backend Developer", value: "backend" },
      { label: "Fullstack Developer", value: "fullstack" },
      { label: "DevOps Engineer", value: "devops" },
    ],
    validation: {
      required: true,
    },
  },

  {
    name: "workMode",
    label: "Preferred Work Mode",
    type: "radio",
    options: [
      { label: "Remote", value: "remote" },
      { label: "On-Site", value: "onsite" },
    ],
    validation: {
      required: true,
    },
  },

  // Mirrors your "outlook" field pattern exactly:
  // - conditional: only shows when workMode is selected
  // - optionsByWorkMode: same pattern as your optionsByGender
  // NOTE: In SelectField.jsx you need to also check field.optionsByWorkMode
  //       OR rename both to a generic key like "dynamicOptionsByField"
  {
    name: "officeLocation",
    label: "Preferred Office Location",
    type: "select",
    conditional: {
      watchField: "workMode",
      showWhen: ["onsite", "remote"],
    },
    optionsByWorkMode: {
      onsite: [
        { label: "Select Location", value: "" },
        { label: "Ahmedabad", value: "ahmedabad" },
        { label: "Surat", value: "surat" },
        { label: "Bangalore", value: "bangalore" },
        { label: "Pune", value: "pune" },
      ],
      remote: [
        { label: "Select Time Zone", value: "" },
        { label: "IST (India)", value: "ist" },
        { label: "EST (US East)", value: "est" },
        { label: "PST (US West)", value: "pst" },
      ],
    },
    validation: {
      required: true,
    },
  },

  {
    name: "availability",
    label: "Available to Work On",
    type: "checkbox",
    options: [
      { label: "Weekdays", value: "weekdays" },
      { label: "Weekends", value: "weekends" },
      { label: "Night Shifts", value: "nights" },
    ],
    validation: {
      required: true,
    },
  },

  {
    name: "email",
    label: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      patternMessage: "Please enter a valid email address",
    },
  },

  {
    name: "portfolioUrl",
    label: "Portfolio / GitHub URL",
    type: "text",
    validation: {
      required: true,
      pattern: /^(https?:\/\/).+/,
      patternMessage: "URL must start with http:// or https://",
    },
  },

  {
    name: "techStack",
    label: "Tech Stack",
    type: "tags",
    validation: {
      required: true,
      minTags: 1,
    },
  },

  // Same name: "password" and type: "password" as your original —
  // so passwordRef.current tracking in Form.jsx works without any change
  {
    name: "password",
    label: "Create Portal Password",
    type: "password",
    validation: {
      required: true,
      strongPassword: true,
    },
  },

  // Same name: "confirmPassword" and type: "confirmPassword" as your original —
  // so confirmPasswordRef.current tracking and matchField logic works without any change
  {
    name: "confirmPassword",
    label: "Confirm Portal Password",
    type: "confirmPassword",
    validation: {
      required: true,
      matchField: "password",
    },
  },

  {
    name: "agreement",
    type: "checkbox",
    options: [
      {
        label: "I confirm all information provided is accurate",
        value: "accepted",
      },
    ],
    validation: {
      required: true,
    },
  },
];