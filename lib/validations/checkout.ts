import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number."),

  address: z
    .string()
    .trim()
    .min(5, "Please enter your delivery address."),

  city: z
    .string()
    .trim()
    .min(2, "Please enter your city."),

  postalCode: z
    .string()
    .trim()
    .min(3, "Please enter your postal code."),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;