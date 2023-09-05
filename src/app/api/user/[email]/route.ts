import { prisma } from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const res = await request.json();

  try {
    const user = await prisma.user.update({
      where: {
        email: params.email,
      },
      data: {
        ...res,
      },
    });
    return NextResponse.json(user);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
