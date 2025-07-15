'use client';

import { useState } from 'react';
import { useMessage } from './MessageContext';
import type { Message } from './MessageContext';

export default function Messagebar() {
  const [input, setInput] = useState('');
  const { messages, setMessages } = useMessage();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });

    if (!res.body) {
      console.error('No response body');
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullText = '';
    let assistantMessage: Message = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMessage]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;
      assistantMessage.content = fullText;
      setMessages((prev) => [...prev.slice(0, -1), assistantMessage]);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 p-2 rounded bg-[#2a2a2a] text-white placeholder-gray-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
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
