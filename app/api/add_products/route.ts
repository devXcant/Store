import { connectMongoDB } from "@/lib/models/mongoConnect";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imgSrc, fileKey, name, category, price } = body;

    await connectMongoDB();
    console.log("Connected to MongoDB");

    const data = await Product.create({
      imgSrc,
      fileKey,
      name,
      category,
      price,
    });

    return NextResponse.json({
      msg: "Products added Successfully",
      status: 200,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error", msg: "Something went wrong" },
      { status: 400 }
    );
  }
}
