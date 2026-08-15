import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().min(8).max(500),
  stock: z.number().int("Stock must be an integer").min(0, "Stock cannot be negative"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().max(40),
  images: z.array(z.url()).min(1, "At least one image is required"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;