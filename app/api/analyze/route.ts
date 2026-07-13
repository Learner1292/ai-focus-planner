import { NextRequest, NextResponse } from "next/server";
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: "us-east-1",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const prompt = `
You are an expert productivity coach.

Analyze these tasks:

${body.tasks}

Return your answer in Markdown.

Include:

# 🔥 Priority Order

Prioritize every task and explain why.

# 📅 Suggested Schedule

Suggest an ideal work schedule.

# 💡 Productivity Tips

Give 3 practical tips.

# ⭐ Productivity Score

Score out of 100 with explanation.
`;

    const command = new ConverseCommand({
      modelId: "amazon.nova-lite-v1:0",

      messages: [
        {
          role: "user",
          content: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const response = await client.send(command);

    const output = response.output?.message?.content?.[0];

    return NextResponse.json({
      response:
        output && "text" in output
          ? output.text
          : "No response generated.",
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        response: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
