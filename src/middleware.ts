import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/taskaties"],
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get('jwtToken')?.value;
    const { pathname } = request.nextUrl;
  
    const isPublicPage = ["/"].includes(pathname) || pathname.match(/^\/[a-z]{2}$/);
    if (token && isPublicPage) {
      return NextResponse.redirect(new URL("/taskaties", request.url));
    }

    if (!token && pathname.startsWith("/taskaties")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && pathname.startsWith("/api/taskaties")) {
      return NextResponse.json(
        { message: "No Token Provided, Access Denied!" },
        { status: 401 }
      );
    }
  
    return createMiddleware({
      locales: ["en", "fr", "ar"],
      defaultLocale: "en",
    })(request);
  }