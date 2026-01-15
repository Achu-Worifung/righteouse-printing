import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {client} from "@/lib/db";
import jwt from "jsonwebtoken";
import dotevn from "dotenv";
import { ObjectId } from "mongodb";

dotevn.config();

export async function GET(request: Request)
{
    const cookieStore = await cookies();
    const authToken =  cookieStore.get('authToken')?.value;

    if (!authToken) {
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    const secret = process.env.JWT_SECRET;

    try {
        const payload = jwt.verify(authToken, secret!) as { _id: string };
        const user = await client.db("RighteousePrinting").collection("Users").findOne({ _id: new ObjectId(payload._id) });
        if (!user) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }
        return NextResponse.json({ authenticated: true, user }, { status: 200 });
    } catch (error) {
        console.error("Error verifying token:", error);
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    


}
