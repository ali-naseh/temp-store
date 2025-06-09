import { z } from "zod";

export const productFilterSchema = z.object({
  category: z.array(z.string()).optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  rating: z.number().min(1).max(5).optional(),
  sortBy: z.enum(["featured", "price-low", "price-high", "rating"]).optional(),
});

export const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(10, "Maximum quantity is 10"),
  variants: z.record(z.string()).optional(),
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(5, "Subject must be at least 5 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
});

export type ProductFilterFormData = z.infer<typeof productFilterSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
export type AddToCartFormData = z.infer<typeof addToCartSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
