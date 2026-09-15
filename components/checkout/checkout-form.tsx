"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "@/lib/validations/checkout";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
}

export function CheckoutForm({
  onSubmit,
}: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold">
          Delivery information
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Where should we deliver your order?
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          error={errors.fullName?.message}
          className="sm:col-span-2"
        >
          <input
            {...register("fullName")}
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </Field>

        <Field
          label="Email"
          error={errors.email?.message}
        >
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>

        <Field
          label="Phone"
          error={errors.phone?.message}
        >
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            placeholder="Your phone number"
            className={inputClass}
          />
        </Field>

        <Field
          label="Address"
          error={errors.address?.message}
          className="sm:col-span-2"
        >
          <textarea
            {...register("address")}
            rows={3}
            autoComplete="street-address"
            placeholder="Street address"
            className={`${inputClass} resize-none py-3`}
          />
        </Field>

        <Field
          label="City"
          error={errors.city?.message}
        >
          <input
            {...register("city")}
            type="text"
            autoComplete="address-level2"
            placeholder="City"
            className={inputClass}
          />
        </Field>

        <Field
          label="Postal code"
          error={errors.postalCode?.message}
        >
          <input
            {...register("postalCode")}
            type="text"
            autoComplete="postal-code"
            placeholder="Postal code"
            className={inputClass}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
      >
        {isSubmitting ? "Processing..." : "Continue to payment"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 dark:border-neutral-800 dark:focus:border-white";

interface FieldProps {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({
  label,
  error,
  className = "",
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}