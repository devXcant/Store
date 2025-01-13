import { connectMongoDB } from "@/lib/models/mongoConnect";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Receive the array of products
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { msg: "Invalid data format. Expected an array of products." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Insert all products into the database
    const data = await Product.insertMany(body);

    return NextResponse.json({ msg: "Products added successfully", data }, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/post_product:", error);
    return NextResponse.json(
      { error: error.message, msg: "Something went wrong" },
      { status: 400 }
    );
  }
}
