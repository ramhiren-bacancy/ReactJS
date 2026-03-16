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
    name: "age",
    label: "Age",
    type: "number",
    maxLength: 3,
    validation: {
      required: true,
      numbersOnly: true,
      maxValue: 150,
      maxLength : 3,
    },
  },
  {
    name: "city",
    label: "City",
    type: "select",
    options: [
      { label: "Select City", value: "" },
      { label: "Surat", value: "surat" },
      { label: "Ahmedabad", value: "ahmedabad" },
      { label: "Rajkot", value: "rajkot" },
      { label: "Gandhinagar", value: "gandhinagar" },
    ],
    validation: {
      required: true,
    },
  },
  {
    name: "country",
    label: "Country",
    type: "text",
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    validation: {
      required: true,
    },
  },
  {
    name: "outlook",
    label: "Outlook",
    type: "select",
    // conditional: only show when gender is selected
    // options are dynamic based on gender — handled in FormField
    conditional: {
      watchField: "gender",
      showWhen: ["male", "female"],
    },
    // options per gender value
    optionsByGender: {
      male: [
        { label: "Select Outlook", value: "" },
        { label: "wolf Cut", value: "wolf-cut" },
        { label: "mullet Cut", value: "mullet-cut" },
        { label: "mid Fade", value: "mid-fade" },
      ],
      female: [
        { label: "Select Outlook", value: "" },
        { label: "Long Hair", value: "long-hair" },
        { label: "Short Hair", value: "short-hair" },
        { label: "Curly Hair", value: "curly-hair" },
      ],
    },
    validation: {
      required: true,
    },
  },
  {
    name: "interests",
    label: "Interests",
    type: "checkbox",
    options: [
      { label: "Technology", value: "technology" },
      { label: "Sports", value: "sports" },
      { label: "Music", value: "music" },
      { label: "Reading", value: "reading" },
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
      patternMessage: "Please enter a valid email",
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    validation: {
      required: true,
      strongPassword: true, // 8+ chars, 1 uppercase, 1 number
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "confirmPassword",
    validation: {
      required: true,
      matchField: "password",
    },
  },
  {
    name: "terms",
    type: "checkbox",
    options: [
      { label: "I accept terms all terms and conditions", value: "accepted" },
    ],
    validation: {
      required: true,
    },
  },
  {
  name: "skills",
  label: "Skills",
  type: "tags",           
  validation: {
      required: true,
      minTags: 1,  
    },
  },
];