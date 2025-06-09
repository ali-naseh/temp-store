import { z } from "zod"

export const addressSchema = z.object({
  type: z.enum(["shipping", "billing"]),
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  company: z.string().optional(),
  address1: z.string().min(1, "Address is required").min(5, "Address must be at least 5 characters"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required").min(2, "City must be at least 2 characters"),
  state: z.string().min(1, "State is required").min(2, "State must be at least 2 characters"),
  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  country: z.string().min(1, "Country is required").min(2, "Country must be at least 2 characters"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-$$$$]+$/.test(val), {
      message: "Please enter a valid phone number",
    }),
  isDefault: z.boolean().default(false),
})

export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-$$$$]+$/.test(val), {
      message: "Please enter a valid phone number",
    }),
  preferences: z.object({
    newsletter: z.boolean(),
    notifications: z.boolean(),
    theme: z.enum(["light", "dark", "system"]),
  }),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type AddressFormData = z.infer<typeof addressSchema>
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
