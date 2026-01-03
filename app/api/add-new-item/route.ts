import { NextResponse } from "next/server";
import {client} from "@/lib/db";

type IncomingPayload = {
    productName?: string;
    price?: number;
    taxClass?: string;
    category?: string;
    description?: string;
    checkpoint?: string;
    quantity?: number;
    color?: string;
    size?: string;
    images?: { filename: string; size: number; type: string }[];
    variants?: {
        sku: string;
        price?: number;
        color?: string;
        size?: string;
        quantity?: number;
        images?: { filename: string; size: number; type: string }[];
    }[];
};

export async function POST(request: Request) {
    const contentType = request.headers.get("content-type") || "";

    try {
        let payload: IncomingPayload = {};

        if (contentType.includes("multipart/form-data")) {
            const form = await request.formData();

            payload = {
                productName: form.get("productName")?.toString(),
                price: form.get("price") ? Number(form.get("price")) : undefined,
                taxClass: form.get("taxClass")?.toString(),
                category: form.get("category")?.toString(),
                description: form.get("description")?.toString(),
                images: [],
                variants:[],
                // images: form
                //     .getAll("images")
                //     .filter((file): file is File => file instanceof File)
                //     .map((file) => ({ filename: file.name, size: file.size, type: file.type })),
            };
        } else if (contentType.includes("application/json")) {
            payload = await request.json();
        } else {
            return NextResponse.json(
                { error: "Unsupported content type" },
                { status: 415 },
            );
        }

        console.log("Received new item data:", payload);

        await client.connect();
        const database = client.db("RighteousePrinting");
        const products = database.collection("Products");
        await products.insertOne({
            ...payload,
            createdAt: new Date(),
        });

        await client.close();

        return NextResponse.json({ ok: true, received: payload });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error";
        console.error("Error handling /api/add-new-item:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}