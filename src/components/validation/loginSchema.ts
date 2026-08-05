import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .email("email formula is not correct")
    .min(1, "email is required"),
  password: z.string().min(6, "password should be more than 6 characters"),
});

export type LoginFormType = z.infer<typeof loginSchema>;
