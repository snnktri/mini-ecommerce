import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = "jfeire9reofjekdr4398eofifjd";

export default async function middleware(request: NextRequest) {
 // console.log("Hello");
  const token = request.cookies.get("token")?.value;

 // console.log("Token: ", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    ) as { payload: { role: string } };

    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware JWT error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};