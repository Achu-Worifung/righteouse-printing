import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { cookies } from 'next/headers'


dotenv.config();


interface tokenPayload {
    _id: ObjectId ;
}
export async function generateToken(payload: tokenPayload, expiresIn: string = "30d"): Promise<string> {

    const secretKey = process.env.JWT_SECRET
    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign(payload, secretKey);
    const cookieStore = await cookies();
    cookieStore.set('authToken', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 30 });
    return token;
}

export function verifyToken(token: string): tokenPayload | null {
    const secretKey = process.env.JWT_SECRET
    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    try {
        const decoded = jwt.verify(token, secretKey) as tokenPayload;
        return decoded;
    } catch (error) {
        return error instanceof jwt.JsonWebTokenError ? null : null;
    }
}