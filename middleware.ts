import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected paths requiring auth check
  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/objectifs") ||
    pathname.startsWith("/suivi") ||
    pathname.startsWith("/comptes-rendus") ||
    pathname.startsWith("/profil");

  // Allow static files, auth pages, and public assets
  if (!isDashboardRoute) {
    return NextResponse.next();
  }

  // Continue to page route
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/objectifs/:path*",
    "/suivi/:path*",
    "/comptes-rendus/:path*",
    "/profil/:path*",
  ],
};
