import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const publicRoutes = [
  "/login", "/register", "/error", "/reset", "/new-password","/verify-login","/link-verif"
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (publicRoutes.some((r) => pathname.startsWith(r))) return NextResponse.next();

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
};
