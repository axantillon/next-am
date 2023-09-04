import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = (await request.json()) as { context: string; question: string };

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

    console.log(res);

    const result = await res.json();
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    NextResponse.error()
  }
}
