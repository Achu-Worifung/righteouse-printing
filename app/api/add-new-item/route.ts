import { NextResponse } from "next/server";
import {client} from "@/lib/db";
import {InsertProductPayLoad} from "@/lib/types";


export async function POST(request: Request) {
    const contentType = request.headers.get("content-type") || "";

    try {
        let payload: InsertProductPayLoad = {};

        if (contentType.includes("multipart/form-data")) {
            const form = await request.formData();

            payload = {
                productName: form.get("productName")?.toString(),
                price: form.get("price") ? Number(form.get("price")) : undefined,
                taxClass: form.get("taxClass")?.toString(),
                category: form.get("category")?.toString(),
                description: form.get("description")?.toString(),
                status : form.get("status")?.toString(),
                images: [],
                variants:[{
                    sku: form.get("sku")?.toString() || "",
                    price: form.get("price") ? Number(form.get("price")) : undefined,
                    color: form.get("color")?.toString(),
                    size: form.get("size")?.toString(),
                    quantity: form.get("quantity") ? Number(form.get("quantity")) : undefined,    
                    status : form.get("status")?.toString(),
                    images: [],
                }],
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