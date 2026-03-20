import { z } from "zod";


export const zodSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters from Zod"),

    age: z
      .string()
      .min(1, "Age is required")
      .regex(/^\d+$/, "Age must be a number")
      .refine((val) => Number(val) <= 150, "Enter a valid Age"),

    city: z.string().min(1, "City is required"),

    country: z.string().optional(),

    gender: z.string().min(1, "Gender is required"),

    outlook: z.string().min(1, "Outlook is required"),

    interests: z
      .union([
        z.array(z.string()).min(1, "Please select at least one Interests"),
        z.string().max(0, "Please select at least one Interests"),
      ])
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: "Please select at least one Interests",
      }),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),

    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Enter strong password (8+ chars, 1 uppercase, 1 number)"
      ),

    confirmPassword: z.string().min(1, "Confirm Password is required"),

    terms: z
      .union([
        z.array(z.string()).min(1, "Please accept the terms and conditions"),
        z.string().max(0, "Please accept the terms and conditions"),
      ])
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: "Please accept the terms and conditions",
      }),

    skills: z
    .union([
        z.array(z.string()).min(1, "Please add at least one Skills"),
        z.string().max(0, "Please add at least one Skills"),
      ])
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: "Please add at least one Skills",
      }),
  })
 


  // refine runs after all individual fields pass
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });


export function runZodValidation(data) {
  const result = zodSchema.safeParse(data);


  if (result.success) return {};

 
  const errors = {};
  result.error.issues.forEach((issue) => {
    const fieldName = issue.path[0]; 
    if (!errors[fieldName]) {
      errors[fieldName] = issue.message;
    }
  });


  return errors;
}