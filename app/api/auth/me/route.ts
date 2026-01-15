import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(request: Request)
{
    const cookieStore = await cookies();
    const authToken =  cookieStore.get('authToken');

    if (!authToken) {
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ authenticated: true }, { status: 200 });

}

export async function DELETE(request: Request)
{
    const cookieStore = await cookies();
    cookieStore.delete('authToken');
    return NextResponse.json({ authenticated: false }, { status: 200 });
}