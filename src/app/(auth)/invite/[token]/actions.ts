"use server";

import { cookies } from "next/headers";

export async function processInvite(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("invite_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
}
