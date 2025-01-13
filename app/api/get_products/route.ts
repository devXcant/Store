import { connectMongoDB } from "@/lib/models/mongoConnect";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    console.log("Connected to MongoDB");

    // Fetch all products
    const data = await Product.find();
    console.log("Fetched data:", data);

    // Return the data
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    // Log the error for debugging
    console.error("Error in GET API:", error);

    // Return a descriptive error message
    return NextResponse.json(
      { error: error.message || "Unknown error", msg: "Something went wrong" },
      { status: 400 }
    );
  }
}
