export const formConfig = [
  {
    name: "name",
    label: "Name",
    type: "text",
    validation: {
      required: true,
      minLength: 2,
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      patternMessage: "Enter a valid email",
    },
  },
  {
    name: "age",
    label: "Age",
    type: "text",
    validation: {
      required: true,
      numbersOnly: true,
      maxValue: 150,
    },
  },
];