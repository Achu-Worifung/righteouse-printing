import { cookies } from "next/headers";
import {client} from "@/lib/db";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
export async function POST(request: Request) {

    const payload = await request.json();
    const { currentPassword, newPassword } = payload;
    
    // Validate new password format
    if (!newPassword || newPassword.length < 8) {
        return new Response(JSON.stringify({ success: false, message: "New password must be at least 8 characters" }), { status: 400 });
    }
    if (!/[A-Z]/.test(newPassword)) {
        return new Response(JSON.stringify({ success: false, message: "New password must contain an uppercase letter" }), { status: 400 });
    }
    if (!/[a-z]/.test(newPassword)) {
        return new Response(JSON.stringify({ success: false, message: "New password must contain a lowercase letter" }), { status: 400 });
    }
    if (!/\d/.test(newPassword)) {
        return new Response(JSON.stringify({ success: false, message: "New password must contain a number" }), { status: 400 });
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
        return new Response(JSON.stringify({ success: false, message: "New password must contain a special character" }), { status: 400 });
    }
    const cookieStore = await cookies();
    const authToken =  cookieStore.get('authToken')?.value;
    if (!authToken) {
        return new Response(JSON.stringify({ success: false, message: "Not authenticated" }), { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    const saltRounds = process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : 10;

    try {
        const verified = jwt.verify(authToken, secret!) as { _id: string };
        const userId = verified._id;
        const userCollection = client.db("RighteousePrinting").collection("Users");
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return new Response(JSON.stringify({ success: false, message: "User not found" }), { status: 404 });
        }
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return new Response(JSON.stringify({ success: false, message: "Current password is incorrect" }), { status: 400 });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { password: hashedNewPassword } }
        );
        return new Response(JSON.stringify({ success: true, message: "Password changed successfully" }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Invalid token" }), { status: 401 });
    }
}