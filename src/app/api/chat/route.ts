import { OpenRouter } from "@openrouter/sdk";
import getSystemPrompt from "./prompt";
import { projectDetails } from "./projectDetails";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

function getProjectDetailFromMessage(message: string) {
  const lowerMessage = message.toLowerCase();

  const matchedProject = projectDetails.find((project) =>
    project.aliases.some((alias) => lowerMessage.includes(alias.toLowerCase()))
  );

  return matchedProject?.content ?? null;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response("Missing message", { status: 400 });
    }

    const systemMessage = {
      role: "system" as const,
      content: getSystemPrompt(),
    };

    const matchedProject = getProjectDetailFromMessage(message);

    const projectContextMessage = matchedProject
      ? {
          role: "system" as const,
          content: `Relevant project context:\n\n${matchedProject}`,
        }
      : null;

    const messages = projectContextMessage
      ? [
          systemMessage,
          projectContextMessage,
          { role: "user" as const, content: message },
        ]
      : [
          systemMessage,
          { role: "user" as const, content: message },
        ];

    const stream = await openrouter.chat.send({
      chatRequest: {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages,
        stream: true,
      },
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response("Server error", { status: 500 });
  }
}
