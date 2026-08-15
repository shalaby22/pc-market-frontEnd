import * as z from "zod";

export const EditProfileSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").max(20),
    lastName: z.string().min(1, "Last name is required").max(20),
    userName: z
      .string()
      .min(6, "user name should be more than 6 characters")
      .max(20, "user name should be less than 20 characters"),
    email: z
      .email("Email formula is not correct")
      .min(1, "Email is required")
      .refine(
        (val) => val.endsWith(".com") || val.endsWith(".net"),
        "Email must end with .com or .net",
      ),
    phone: z.string().regex(/^[0-9]{11}$/, "Phone number must have 11 digits."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character",
      )
      .optional()
      .or(z.literal("")),

    confirmPassword: z.string().optional().or(z.literal("")),
    isAdmin: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password !== "") {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    },
  );

export type EditProfileFormType = z.infer<typeof EditProfileSchema>;
