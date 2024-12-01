import { authFetch } from "@/lib/auth-fetch";
import { BACKEND_URL } from "@/lib/constants";
import { deleteCookie } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await authFetch(`${BACKEND_URL}/auth/logout`, { method: "POST" });
  if (res.status === 200) await deleteCookie();

  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  return NextResponse.redirect(new URL("/", req.nextUrl));
}
