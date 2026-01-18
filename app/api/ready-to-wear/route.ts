import { NextResponse } from "next/server";
import { client } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query params
    const feature = searchParams.get("feature");
    const sort = searchParams.get("sort");
    const order = searchParams.get("order");
    const type = searchParams.get("type");

    // Build filter
    const filters: Record<string, unknown> = {};

    // Add feature filter (note: field is "feature" not "featured")
    if (feature === "true") {
      filters.feature = true;
    }

    // Best sellers logic (placeholder - adjust based on your logic)
    if (type === "best") {
      filters["rating.count"] = { $gte: 10 };
    }

    // Only add variant filter when not fetching featured items
    if (feature !== "true") {
      filters.variants = {
        $elemMatch: {
          status: "enabled",
          quantity: { $gt: 0 },
        },
      };
    }

    // Build sort object
    const sortObj: Record<string, 1 | -1> = {};
    if (sort === "updatedAt") {
      sortObj.updatedAt = order === "desc" ? -1 : 1;
    } else if (sort === "createdAt") {
      sortObj.createdAt = order === "desc" ? -1 : 1;
    } else {
      // Default sort
      sortObj.createdAt = -1;
    }

    // Determine limit based on type
    const limit = type === "new" ? 4 : 8;

    console.log("Ready-to-wear filters:", filters);
    console.log("Sort:", sortObj);

    // Query database
    await client.connect();
    const db = client.db("RighteousePrinting");
    const products = db.collection("Products");

    const data = await products
      .find(filters)
      .sort(sortObj)
      .limit(limit)
      .toArray();

    // Response
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching ready-to-wear products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
