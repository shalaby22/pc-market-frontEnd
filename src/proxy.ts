import { adminMiddleware } from "@/middlewares/adminMiddleware";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    return adminMiddleware(request);
  }
  if (path === "/login" || path === "/register") {
    return authMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
