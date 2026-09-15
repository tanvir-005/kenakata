import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.delete("kenakata-access-token");
  response.cookies.delete("kenakata-refresh-token");

  return response;
}