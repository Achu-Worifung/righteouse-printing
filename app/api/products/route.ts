import { NextResponse } from "next/server";
import {client} from "@/lib/db";


export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    //getting all the filters 
    const filters: {[key: string]: string} = {};
    searchParams.forEach((value, key) => {
        filters[key] = value;
    });
    const page = parseInt(filters.page) || 0;
    const sort = filters.sort || "newest";

    //removing page and sort from filters
    delete filters.page;
    delete filters.sort;
    try {
        await client.connect();
        const database = client.db("RighteousePrinting");
        const products = database.collection("Products");
        const allProducts = await products.find({...filters}).sort({[sort]: -1}).skip(page * 10).limit(10).toArray();
        return NextResponse.json(allProducts, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    } finally {
        await client.close();
    }
}