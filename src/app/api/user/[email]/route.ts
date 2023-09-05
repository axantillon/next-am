import { handler } from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const res = await request.json();

  try {
    const user = await handler().updateUser(params.email, {
      ...res,
    });
    return NextResponse.json(user);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
