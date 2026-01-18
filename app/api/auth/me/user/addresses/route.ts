import { cookies } from "next/headers";
import { client } from "@/lib/db";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const payload = await request.json();
  const { addresses } = payload;

  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    return new Response(
      JSON.stringify({ success: false, message: "Not authenticated" }),
      { status: 401 }
    );
  }

  const secret = process.env.JWT_SECRET;

  try {
    const verified = jwt.verify(authToken, secret!) as { _id: string };
    const userId = verified._id;

    const userCollection = client.db("RighteousePrinting").collection("Users");

    // Update user addresses
    const result = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { addresses: addresses || [] } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Addresses saved successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving addresses:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Invalid token" }),
      { status: 401 }
    );
  }
}
