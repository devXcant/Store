import { connectMongoDB } from "@/lib/models/mongoConnect";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName, number } = await req.json();

    if (!email) {
      return NextResponse.json({ msg: "Email is required." }, { status: 400 });
    }

    await connectMongoDB();

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return NextResponse.json(
        { msg: "Email already exists. Please use a different email." },
        { status: 400 }
      );
    }

    const data = await User.create({ email, firstName, lastName, number });

    return NextResponse.json(
      { msg: "User successfully created", data },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message, msg: "Something went wrong" },
      { status: 500 }
    );
  }
}
