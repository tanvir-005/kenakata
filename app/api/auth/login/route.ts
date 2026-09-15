import { NextResponse } from "next/server";
import { login, getProfile } from "@/lib/api/auth";
import { sanitizeUser } from "@/lib/auth/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required.",
        },
        { status: 400 },
      );
    }

    const tokens = await login({
      email,
      password,
    });

    const user = await getProfile(tokens.access_token);
    const safeUser = sanitizeUser(user);

    const response = NextResponse.json({
      user: safeUser,
    });

    response.cookies.set("kenakata-access-token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 20,
    });

    response.cookies.set(
      "kenakata-refresh-token",
      tokens.refresh_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 10,
      },
    );

    return response;
  } catch {
    return NextResponse.json(
      {
        message: "Invalid email or password.",
      },
      { status: 401 },
    );
  }
}