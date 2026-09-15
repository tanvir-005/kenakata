import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/api/auth";
import { CheckoutContent } from "./checkout-content";

export default async function CheckoutPage() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(
    "kenakata-access-token",
  )?.value;

  if (!accessToken) {
    redirect("/login?redirect=/checkout");
  }

  try {
    await getProfile(accessToken);
  } catch {
    redirect("/login?redirect=/checkout");
  }

  return <CheckoutContent />;
}