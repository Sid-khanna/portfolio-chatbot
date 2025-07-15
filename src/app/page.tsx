'use client';

import { useEffect, useState } from 'react';
import { MessageProvider } from './components/MessageContext';
import TopBoxBar from './components/TopBoxBar';
import Head from './components/Head';
import Chatbox from './components/Chatbox';
import Messagebar from './components/Messagebar';
import Wave from 'react-wavify';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ Fix for hydration mismatch
function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

export default function Home() {
  const hasMounted = useHasMounted();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Skip rendering until after mount to avoid mismatch
  if (!hasMounted) return null;

  return (
    <MessageProvider>
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
        {/* === Animated Wave Background === */}
        <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
          <Wave
            fill="#f4f4f4"
            paused={false}
            options={{ height: 40, amplitude: 30, speed: 0.2, points: 3 }}
            style={{ transform: 'scaleY(1.2)' }}
          />
        </div>

        {/* === Intro or Chat UI === */}
        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.h1
              key="intro"
              className="text-4xl sm:text-6xl font-bold z-10"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 1 }}
            >
              hi, i’m sid.
            </motion.h1>
          ) : (
            <motion.main
              key="chat"
              className="relative z-10 flex flex-col items-center justify-between w-full h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <TopBoxBar />
              <div className="w-full max-w-2xl flex flex-col p-4 bg-[#1f1f1f] shadow-xl rounded-3xl">
                <Head />
                <Chatbox />
                <Messagebar />
              </div>
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </MessageProvider>
  );
}
