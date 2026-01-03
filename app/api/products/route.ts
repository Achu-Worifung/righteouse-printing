import { NextResponse } from "next/server";
import {client} from "@/lib/db";


export async function GET(request: Request) {
    try {
        await client.connect();
        const database = client.db("RighteousePrinting");
        const products = database.collection("Products");
        const allProducts = await products.find({}).toArray();
        return NextResponse.json(allProducts, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    } finally {
        await client.close();
    }
}