import { NextResponse } from "next/server";
import { client } from "@/lib/db";

const PAGE_SIZE = 10;

// Whitelists
const ALLOWED_SORTS = ["createdAt", "price", "name"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query params
    const size: string[] = searchParams.getAll("size");
    const color: string[] = searchParams.getAll("color");
    const type: string[] = searchParams.getAll("type");
    const rating: string[] = searchParams.getAll("rating");

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const sortParam = searchParams.get("sort") || "createdAt";
    const sort = ALLOWED_SORTS.includes(sortParam)
      ? sortParam
      : "createdAt";

    // Build variant-level filter
    const variantMatch: any = {
      status: "enabled",
      quantity: { $gt: 0 },
    };

    if (size.length) {
      variantMatch.size = { $in: size };
    }

    if (color.length) {
      variantMatch.color = { $in: color };
    }

    // Build product-level filters
    const filters: any = {
      variants: { $elemMatch: variantMatch },
    };

    if (type.length) {
      filters.category = { $in: type };
    }

    if (rating.length) {
      filters.rating = { $in: rating };
    }

    console.log("Applied Filters:", filters);

    // Query database
    await client.connect();
    const db = client.db("RighteousePrinting");
    const products = db.collection("Products");

    const [data, total] = await Promise.all([
      products
        .find(filters)
        .sort({ [sort]: -1 })
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .toArray(),
      products.countDocuments(filters),
    ]);

    // Response
    return NextResponse.json({
      data,
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        total,
        totalPages: Math.ceil(total / PAGE_SIZE),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
