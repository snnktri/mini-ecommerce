
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = "jfeire9reofjekdr4398eofifjd";

const ADMIN = {
  email: "admin@demo.com",
  password: "admin123",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (email !== ADMIN.email || password !== ADMIN.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ role: "admin", email }, JWT_SECRET, { expiresIn: "1h" });

    const response = NextResponse.json({ success: true });

    response.cookies.set("token", token, {
      httpOnly: true,
     //secure: true, 
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong during login" },
      { status: 500 }
    );
  }
}
