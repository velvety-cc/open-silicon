import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(request.nextUrl.hostname);
  if (process.env.NODE_ENV !== "development" || !local) return new NextResponse("Not found", { status: 404 });
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
export const config = { matcher: ["/((?!_next|favicon.ico|icon.svg|apple-icon.png).*)"] };
