import { NextResponse } from "next/server";
import { client } from "@/lib/db";

const PAGE_SIZE = 10;

// Whitelists
const ALLOWED_FILTERS = ["category", "status"];
const ALLOWED_SORTS = ["createdAt", "price", "name"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const sortParam = searchParams.get("sort") || "createdAt";
    const sort = ALLOWED_SORTS.includes(sortParam) ? sortParam : "createdAt";

    // Build safe filters
    const filters: Record<string, any> = {};
    for (const key of ALLOWED_FILTERS) {
      const value = searchParams.get(key);
      if (value) filters[key] = value;
    }

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
