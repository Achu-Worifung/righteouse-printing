import { NextResponse } from "next/server";
import {client} from "@/lib/db";
import {InsertProductPayLoad, rating, review} from "@/lib/types";
import dotenv from "dotenv";
import {BlobServiceClient} from "@azure/storage-blob";
dotenv.config();


export async function POST(request: Request) {
    const contentType = request.headers.get("content-type") || "";

    try {
        let payload: InsertProductPayLoad = {};

        if (contentType.includes("multipart/form-data")) {
            const form = await request.formData();
            const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
            const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
            const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "righteousprinting";
            const containerClient = blobServiceClient.getContainerClient(containerName);

            // Parse variants from JSON strings
            const variantStrings = form.getAll("variants");
            const variants = variantStrings.map((v) => JSON.parse(v.toString()));


            // Collect variant images by index
            const variantImagesByIndex: { [key: number]: File[] } = {};
            for (const [key, value] of form.entries()) {
                if (key.startsWith("variantImages_") && value instanceof File) {
                    const index = parseInt(key.split("_")[1]);
                    if (!variantImagesByIndex[index]) {
                        variantImagesByIndex[index] = [];
                    }
                    variantImagesByIndex[index].push(value);
                }
            }

            // Upload variant images and merge with variant data
            const variantsWithImages = await Promise.all(
                variants.map(async (variant, index) => {
                    const variantFiles = variantImagesByIndex[index] || [];
                    const variantImages = [];
                    
                    for (const file of variantFiles) {
                        const blobName = `variants/${Date.now()}-${file.name}`;
                        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
                        
                        const arrayBuffer = await file.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);
                        
                        await blockBlobClient.upload(buffer, buffer.length, {
                            blobHTTPHeaders: { blobContentType: file.type }
                        });
                        
                        variantImages.push({
                            filename: file.name,
                            size: file.size,
                            type: file.type,
                            url: blockBlobClient.url,
                        });
                    }

                    return {
                        ...variant,
                        images: variantImages,
                    };
                })
            );

            const options: [string[], { colorName: string; colorHex: string }[]] = [
                form.getAll("productAvailableSizes").map(size => size.toString()),
                form.getAll("productAvailableColors").map(color => JSON.parse(color.toString())),
            ];

            payload = {
                productName: form.get("productName")?.toString(),
                price: form.get("price") ? Number(form.get("price")) : undefined,
                taxClass: form.get("taxClass")?.toString(),
                category: form.get("category")?.toString(),
                description: form.get("description")?.toString(),
                sku: form.get("sku")?.toString(),
                rating: form.get("rating") ? JSON.parse(form.get("rating")!.toString()) as rating : undefined,  
                reviews: form.get("reviews") ? form.getAll("reviews").map(review => JSON.parse(review.toString())) : undefined,
                options: options,
                rating: form.get("rating") ? JSON.parse(form.get("rating")!.toString()) as rating : undefined,
                reviews: form.get("reviews") ? form.getAll("reviews").map(review => JSON.parse(review.toString())) : undefined,
                status: form.get("status")?.toString(),
                variants: variantsWithImages, // Each variant has its own images
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        } else if (contentType.includes("application/json")) {
            payload = await request.json();
        } else {
            return NextResponse.json(
                { error: "Unsupported content type" },
                { status: 415 },
            );
        }


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