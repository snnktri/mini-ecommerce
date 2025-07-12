// import { SignupSchema } from '@/lib/validators/logingValidation';
// import { NextResponse } from "next/server";
// import jwt from 'jsonwebtoken';

// const JWT_TOKEN = "jfeire9reofjekdr4398eofifjd";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     const validatedData = SignupSchema.parse(body);

//     const token = jwt.sign(
//       { email: validatedData.email, fName: validatedData.fName },
//       JWT_TOKEN,
//       { expiresIn: "1h" }
//     );

// return NextResponse.json(
//   { message: "Signup successful", data: { token } },
//   { status: 201 }
// );
//   } catch (error: any) {
//     if (error?.issues) {
//       return NextResponse.json({ errors: error.issues }, { status: 400 });
//     }
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }
