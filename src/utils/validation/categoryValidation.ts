import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(40, "Name cannot exceed 40 characters")
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      "Name must contain only letters, numbers, and spaces",
    ),

  description: z
    .string()
    .min(8, "Description must be at least 8 characters")
    .max(500, "Description cannot exceed 500 characters"),

  image: z
    .url("Please enter a valid image URL")
    .max(500, "URL is too long")
});

export type CategoryInput = z.infer<typeof categorySchema>;
