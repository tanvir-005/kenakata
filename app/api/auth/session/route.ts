import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getProfile } from "@/lib/api/auth";
import { sanitizeUser } from "@/lib/auth/user";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(
    "kenakata-access-token",
  )?.value;

  if (!accessToken) {
    return NextResponse.json(
      { user: null },
      { status: 401 },
    );
  }

  try {
    const user = await getProfile(accessToken);
    const safeUser = sanitizeUser(user);

    return NextResponse.json({
      user: safeUser,
    });

  } catch {
    return NextResponse.json(
      { user: null },
      { status: 401 },
    );
  }
}