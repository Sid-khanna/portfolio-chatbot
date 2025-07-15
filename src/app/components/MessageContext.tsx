'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the shape of a single message
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// 2. Define the context value type
interface MessageContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

// 3. Create context with proper type
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// 4. Provider with children typed
export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "hi, i'm sid — feel free to ask about my background, projects, or portfolio.",
    },
  ]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

// 5. Hook with error if used outside provider
export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useMessage must be used within a MessageProvider');
  return context;
};
