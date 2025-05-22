import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoutes = path.startsWith("/dashboard");
  const isPublicRoutes = publicRoutes.includes(path);
  const cookie = req.cookies.get("access_token");

  if (isProtectedRoutes && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoutes && cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
