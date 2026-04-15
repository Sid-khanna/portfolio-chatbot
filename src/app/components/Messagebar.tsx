'use client';

import { useState } from 'react';
import { useMessage } from './MessageContext';
import type { Message } from './MessageContext';

export default function Messagebar() {
  const [input, setInput] = useState('');
  const { setMessages } = useMessage();

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: Message = {
      role: 'user',
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Chat request failed:', errorText);

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'sorry, something went wrong. please try again.',
          },
        ]);
        return;
      }

      if (!res.body) {
        console.error('No response body');
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'sorry, no response came back from the server.',
          },
        ]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullText = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: fullText },
        ]);
      }

      if (!fullText.trim()) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            role: 'assistant',
            content: 'sorry, i did not get a usable response.',
          },
        ]);
      }
    } catch (error) {
      console.error('sendMessage error:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'sorry, something broke while sending your message.',
        },
      ]);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 p-2 rounded bg-[#2a2a2a] text-white placeholder-gray-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
        placeholder="ask me anything..."
      />
      <button
        onClick={sendMessage}
        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
      >
        ➤
      </button>
    </div>
  );
}