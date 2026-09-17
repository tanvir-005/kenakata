import { z } from "zod";

// Regular Expressions
const nameRegex = /^[a-zA-Z\s'-]+$/; // accepts letters and hyphen
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 international standard format
const postalRegex = /^[a-zA-Z0-9\s-]{3,10}$/; // Standard alphanumeric postal codes

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long.")
    .regex(nameRegex, "Name contains invalid characters."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(255, "Email address is too long."),

  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number (e.g., +1234567890)."),

  address: z
    .string()
    .trim()
    .min(5, "Please enter a complete delivery address.")
    .max(200, "Address is too long."),

  city: z
    .string()
    .trim()
    .min(2, "City name must be at least 2 characters.")
    .max(100, "City name is too long.")
    .regex(nameRegex, "City contains invalid characters."),

  postalCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(postalRegex, "Please enter a valid postal or ZIP code."),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;