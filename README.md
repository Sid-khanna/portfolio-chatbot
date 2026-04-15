# Portfolio Chatbot

An AI-powered chatbot integrated into my personal portfolio that allows users to explore my projects, experience, and skills through natural conversation.

👉 **Live Demo:** https://sid-portfolio-chat.vercel.app/  
👉 **Repository:** https://github.com/Sid-khanna/portfolio-chatbot

---

## Overview

This project is a conversational interface for my portfolio. Instead of navigating static sections, users can simply ask questions like:

- "tell me about your projects"
- "what experience do you have with AI?"
- "what did you do at Mold Masters?"

and receive structured, contextual responses.

The goal was to move beyond a traditional portfolio and build something interactive that better represents how I think, communicate, and approach problem solving.

---

## Features

- Conversational UI for exploring portfolio content
- Context-aware responses based on user queries
- Project-specific response matching
- Clean, responsive frontend using modern web tools
- Real-time LLM responses via API
- Modular system for extending project knowledge

---

## Tech Stack

**Frontend**
- Next.js
- TypeScript
- Tailwind CSS

**Backend / AI**
- OpenRouter API (LLM access)
- Custom prompt engineering
- Dynamic context injection

**Deployment**
- Vercel

---

## How It Works

1. User submits a message through the chat interface  
2. The system analyzes the message to detect relevant project context  
3. A system prompt + optional project-specific context is constructed  
4. The request is sent to the LLM via OpenRouter  
5. The response is streamed back and displayed in the UI  

This allows the chatbot to give more relevant and grounded answers instead of generic responses.

---

## Project Structure

```
/app
  /api/chat/route.ts        # API route handling chat requests

/lib
  prompt.ts                 # System prompt definition
  projectDetails.ts         # Project matching + context injection
```

---

## Example Use Cases

- Recruiters exploring experience quickly  
- Demonstrating projects in an interactive way  
- Showcasing applied AI + full-stack integration  
- Replacing static portfolio sections with dynamic Q&A  

---

## Future Improvements

- Add memory for multi-turn conversations  
- Improve project matching with embeddings  
- Integrate structured knowledge base (Graph / RAG)  
- Add analytics for user queries  
- Support richer UI responses (cards, links, visuals)  

---

## Running Locally

1. Clone the repository:
```bash
git clone https://github.com/Sid-khanna/portfolio-chatbot.git
cd portfolio-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Add environment variables:
```env
OPENROUTER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

---

## Why I Built This

Most portfolios are static and don’t reflect how someone actually thinks or communicates.

I built this to:
- make my portfolio interactive
- show how I approach systems and problem solving
- demonstrate real-world use of LLMs in a product setting

---

## Author

Siddharth Khanna  
Automation Developer | Robotics | AI Systems  
