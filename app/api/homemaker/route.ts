
import { NextResponse } from "next/server";
import { client } from "@/lib/db";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter") || "ALL";
    await client.connect();
    const db = client.db("RighteousePrinting");
    const products = db.collection("Products");
    const featuredProducts = {

    }
    const variantMatch = {};
    switch (filter) {
      case "ALL":
        // Fetch all featured products
        products.find({featured:true}).limit(4)
        break;
      case "New Arrival":
        products.find().sort({ updatedAt: -1 }).limit(4)

        break;
      case "Best Sellers":
        products.find().sort({ salesCount: -1 }).limit(4)
        break;
      default:
        // Handle unknown filter
        break;
    }
  } catch (error) {
      
  }
}