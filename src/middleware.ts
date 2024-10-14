import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales: ["en", "fr", "ar"],
    defaultLocale: "ar",
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}