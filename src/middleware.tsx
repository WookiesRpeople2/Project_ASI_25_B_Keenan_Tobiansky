import { NextResponse, NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type")

  if (!["bar", "museum", "restaurant", "park"].includes(type as string)) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: "/[locationId]/:path*",
}
