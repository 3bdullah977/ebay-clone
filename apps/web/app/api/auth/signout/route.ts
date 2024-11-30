import { deleteCookie } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await deleteCookie();

  revalidatePath("/");
  return NextResponse.redirect(new URL("/", req.nextUrl));
}
