export async function OpenAIStream(response: Response): Promise<ReadableStream> {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  const stream = new ReadableStream({
    async start(controller) {
      if (!reader) {
        controller.close();
        return;
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.replace('data: ', '').trim();
            if (data === '[DONE]') {
              controller.close();
              return;
            }

            try {
              const json = JSON.parse(data);
              const text = json.choices?.[0]?.delta?.content || '';
              controller.enqueue(new TextEncoder().encode(text));
            } catch (err) {
              console.error('Error parsing stream chunk', err);
            }
          }
        }
      }

      controller.close();
    },
  });

  return stream;
}
