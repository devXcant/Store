import { connectMongoDB } from "@/lib/models/mongoConnect";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ msg: "Email is required." }, { status: 400 });
    }

    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { msg: "User not found. Create an account." },
        { status: 404 }
      );
    }

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      { msg: "Login successful", token },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message, msg: "Something went wrong" },
      { status: 500 }
    );
  }
}
