import { z } from "zod";

export const CheckOuSchema = z.object({
  fName: z.string().min(6, "Minimum 6 alphabets are required"),
  email: z.string().email("Invalid email address"),
  address: z.string()
});


export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export type SignupForm = z.infer<typeof CheckOuSchema>;
export type LoginForm = z.infer<typeof LoginSchema>;