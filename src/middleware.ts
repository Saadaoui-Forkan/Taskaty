import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}

// export function middleware (request: NextRequest) {
//     const token = request.cookies.get('jwtToken')?.value
//     if (!token) {
//         if (request.nextUrl.pathname.startsWith("/api/taskaties")) {
//             return NextResponse.json(
//                 { message: 'No Token Provided, Access Denied!' },
//                 { status: 401 }
//             )
//         }
//     }
// }

// export default createMiddleware({
//     locales: ["en", "fr", "ar"],
//     defaultLocale: "ar",
// });

export function middleware(request: NextRequest) {
    const token = request.cookies.get('jwtToken')?.value;
  
    if (!token && request.nextUrl.pathname.startsWith("/api/taskaties")) {
      return NextResponse.json(
        { message: 'No Token Provided, Access Denied!' },
        { status: 401 }
      );
    }
  
    return createMiddleware({
      locales: ["en", "fr", "ar"],
      defaultLocale: "en",
    })(request);
  }