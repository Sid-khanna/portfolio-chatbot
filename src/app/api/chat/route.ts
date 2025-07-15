import { OpenAIStream } from '@/lib/OpenAIStream';
import { StreamingTextResponse } from '@/lib/StreamingTextResponse';
import getSystemPrompt from './prompt';
import { projectDetails } from './projectDetails'; // ✅ same folder

// ✅ Helper to look for a project alias in user message
function getProjectDetailFromMessage(message: string): string | null {
  const msg = message.toLowerCase();

  for (const entry of projectDetails) {
    for (const alias of entry.aliases) {
      if (msg.includes(alias.toLowerCase())) {
        return entry.content;
      }
    }
  }

  return null;
}

export const runtime = 'edge';

export async function POST(req: Request) {
  const { message } = await req.json();

  // ✅ Standard system + user message
  const systemMessage = { role: 'system', content: getSystemPrompt() };
  const userMessage = { role: 'user', content: message };

  // ✅ If a project is matched, inject that as context BEFORE user input
  const matchedProject = getProjectDetailFromMessage(message);
  const projectContext = matchedProject
    ? {
        role: 'system',
        content: `Here is official background context for the user's query:\n\n${matchedProject}`,
      }
    : null;

  const messages = projectContext
    ? [systemMessage, projectContext, userMessage]
    : [systemMessage, userMessage];

  // ✅ Now send full message stack to OpenRouter
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://localhost:3000', // update on deploy
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct',
      messages: messages,
      stream: true,
    }),
  });

  const stream = await OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
