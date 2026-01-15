
import { NextResponse } from "next/server";
import { client } from "@/lib/db";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import {generateToken} from "../token-generator";


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
        const result = await users.insertOne({
            ...payload,
            password: hashedPassword
        })
        const id = result.insertedId;
        await client.close();

        await generateToken({ _id: id });
        return NextResponse.json({ "success": "Sign-up successful" }, { status: 200 });
    }catch (error) {
        console.error("Error during sign-up:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}