import { NextResponse } from "next/server";
import { client } from "@/lib/db";
import dotenv from "dotenv";
import { generateToken } from "../token-generator";
import bcrypt from "bcrypt";

dotenv.config();
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    await client.connect();
    const db = client.db("RighteousePrinting");
    const users = db.collection("Users");

    const user = await users.findOne({ email: payload.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(payload.password, user.password);
    console.log("Password Match:", passwordMatch);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    await generateToken({ _id: user._id });
    await client.close();
    return NextResponse.json(
      { success: "Sign-in successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
