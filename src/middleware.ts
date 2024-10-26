import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/taskaties"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value;
  const { pathname, searchParams } = request.nextUrl;

  const localeMatch = pathname.match(/^\/(en|fr|ar)(\/taskaties)?/);
  const locale = localeMatch ? localeMatch[1] : "en"; 

  if (localeMatch && pathname.endsWith("/taskaties") && !searchParams.has("pageNumber")) {
    const url = request.nextUrl.clone();
    url.searchParams.set("pageNumber", "1");
    return NextResponse.redirect(url);
  }

  const isPublicPage = ["/"].includes(pathname) || pathname.match(/^\/[a-z]{2}$/);
  if (token && isPublicPage) {
    return NextResponse.redirect(new URL(`/${locale}/taskaties`, request.url));
  }

  if (!token && pathname.startsWith(`/${locale}/taskaties`)) {
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
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
