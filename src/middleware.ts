import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";
  const token = request.cookies.get("token")?.value || "";

  if (path === "/games") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
