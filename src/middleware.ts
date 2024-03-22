import { NextRequest } from "next/server";

let locales = ["en", "zh"];

const getBrowserLanguage = (req: NextRequest) => {
  return req.headers
    .get("accept-language")
    ?.split(",")
    .map((i) => i.split(";"))
    ?.reduce(
      (ac: { code: string; priority: string }[], lang) => [
        ...ac,
        { code: lang[0], priority: lang[1] },
      ],
      []
    )
    ?.sort((a, b) => (a.priority > b.priority ? -1 : 1))
    ?.find((i) => locales.includes(i.code.substring(0, 2)))
    ?.code?.substring(0, 2);
};
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;
  const pathnameHasAdmin = locales.some((locale) =>
    pathname.startsWith(`/admin`)
  );
  if (pathnameHasAdmin) {
    const isLogin = request.cookies.get("isLogin");
    if (isLogin?.value === "true") {
      if (pathname === "/admin") {
        request.nextUrl.pathname = "/admin/home";
        return Response.redirect(request.nextUrl);
      }
      return;
    } else {
      if (pathname === "/admin") {
        return;
      } else {
        request.nextUrl.pathname = "/admin";
        return Response.redirect(request.nextUrl);
      }
    }
  }
  // Redirect if there is no locale
  const language = getBrowserLanguage(request);
  const locale = language ?? "zh";
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!icons|uploads|public|about|logo|banners|course|curriculum|facility|information|news|subBanners|team|api|_next|favicon.ico).*)",
  ],
};
