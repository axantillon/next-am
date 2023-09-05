import { handler } from "@/server/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = (await request.json()) as {
    context: string;
    question: string;
    userEmail: string;
  }; // this could get refactored to use the email to fetch the bio instead of doing a full user fetch on client component

  try {
    const res = await fetch(
      "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
      {
        headers: { Authorization: `Bearer ${process.env.HUGGING_FACE}` },
        method: "POST",
        body: JSON.stringify({
          inputs: {
            question: req.question,
            context: req.context,
          },
        }),
      }
    );

    const result = await res.json();

    try {
      const session = await getServerSession();
      const authorEmail = session?.user?.email || "anonymous@hehe.com";

      await handler().createQuestion({
        question: req.question,
        userEmail: req.userEmail,
        answer: result.answer,
        score: result.score.toFixed(3),
        authorEmail,
      });
    } catch (e) {
      console.log(e);
      return NextResponse.error();
    }

    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    NextResponse.error();
  }
}
