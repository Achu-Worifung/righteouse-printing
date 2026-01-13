
import { NextResponse } from "next/server";
import { client } from "@/lib/db";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

dotenv.config();


interface SignInRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    google: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export async function POST(request: Request)
{
    const form = await request.formData();
    try {
        const payload: SignInRequestBody = {
            firstName: form.get("firstName") as string,
            lastName: form.get("lastName") as string,
            email: form.get("email") as string,
            google: form.get("google") === "true",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await client.connect();
        const db = client.db("RighteousePrinting");
        const users = db.collection("Users");

        const existingUser = await users.findOne({ email: payload.email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(form.get("password") as string, process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
        await users.insertOne({
            ...payload,
            password: hashedPassword
        })
        await client.close();

        return NextResponse.json({ ok: true, received: payload });
    }catch (error) {
        console.error("Error during sign-in:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}