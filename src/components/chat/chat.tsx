'use client';

import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';

import ChatBottombar from '@/components/chat/chat-footer';
import ChatLanding from '@/components/chat/chat-landing';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

const Chat = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');

  const [autoSubmitted, setAutoSubmitted] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setInput,
    append,
    reload,
    addToolResult,
  } = useChat({
    onResponse: () => {},
    onFinish: () => {},
    onError: (error) => {
      console.error('Chat error:', error.message);
      toast.error(`Error: ${error.message}`);
    },
  });

  // In your Chat component, keep this effect for initial query:
  useEffect(() => {
    if (initialQuery && !autoSubmitted && messages.length === 0) {
      setAutoSubmitted(true);
      setInput('');
      append({ role: 'user', content: initialQuery.trim() });
    }
  }, [initialQuery, autoSubmitted, setInput, append, messages.length]);

  // Tool progress state
  const isToolInProgress = messages.some(
    (m) =>
      m.role === 'assistant' &&
      m.parts?.some(
        (part) =>
          part.type === 'tool-invocation' &&
          part.toolInvocation?.state !== 'result'
      )
  );

  // Form submit handler
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isToolInProgress) return;
    append({ role: 'user', content: input.trim() });
    setInput('');
  };

  // Stop response generation
  const handleStop = () => {
    stop();
  };

  // Check if chat is empty (no messages and not loading)
  const isEmptyState = messages.length === 0 && !isLoading;

  // State for animated AI typing
  const [animatedTexts, setAnimatedTexts] = useState<Record<number, string>>(
    {}
  );
  const typingIntervals = useRef<Record<number, NodeJS.Timeout>>({});

  useEffect(() => {
    // Whenever a new assistant message appears, animate its text
    messages.forEach((msg, i) => {
      if (
        msg.role === 'assistant' &&
        typeof msg.content === 'string' &&
        !animatedTexts[i]
      ) {
        let idx = 0;
        const fullText = msg.content;
        const typingSpeed = 22; // ms per char, adjust for slower/faster

        // Clear any existing interval for this message
        if (typingIntervals.current[i]) {
          clearInterval(typingIntervals.current[i]);
        }

        setAnimatedTexts((prev) => ({ ...prev, [i]: '' }));

        typingIntervals.current[i] = setInterval(() => {
          idx++;
          setAnimatedTexts((prev) => ({
            ...prev,
            [i]: fullText.slice(0, idx),
          }));

          if (idx >= fullText.length) {
            clearInterval(typingIntervals.current[i]);
            delete typingIntervals.current[i];
          }
        }, typingSpeed);
      }
    });

    // Cleanup intervals on unmount
    return () => {
      Object.values(typingIntervals.current).forEach(clearInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div className="container mx-auto flex h-screen max-w-3xl flex-col">
      {/* Chat content */}
      <div className="flex-1 overflow-y-auto px-2 pt-8">
        <AnimatePresence mode="wait">
          {isEmptyState ? (
            <motion.div
              key="landing"
              className="flex min-h-full items-center justify-center"
              {...MOTION_CONFIG}
            >
              <ChatLanding
                submitQuery={(q) => append({ role: 'user', content: q })}
              />
            </motion.div>
          ) : (
            <>
              {messages.map((msg, i) =>
                msg.role === 'assistant' ? (
                  <motion.div
                    key={msg.id || i}
                    {...MOTION_CONFIG}
                    className="pb-4"
                  >
                    {/* AI message with animated typing */}
                    <SimplifiedChatView
                      message={{
                        ...msg,
                        // Use animated text if available, else fallback
                        content:
                          animatedTexts[i] !== undefined
                            ? animatedTexts[i]
                            : msg.content,
                      }}
                      isLoading={false} // Do not show loading on AI answer
                      reload={reload}
                      addToolResult={addToolResult}
                    />
                  </motion.div>
                ) : msg.role === 'user' ? (
                  <motion.div
                    key={msg.id || i}
                    {...MOTION_CONFIG}
                    className="flex justify-end pb-4"
                  >
                    <div
                      className="w-fit max-w-[80%] rounded-lg border border-gray-200 bg-white px-4 py-2 text-black shadow"
                      style={{ wordBreak: 'break-word' }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ) : null
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom input bar */}
      <div className="sticky bottom-0 px-2 pt-3 md:px-0 md:pb-4">
        <ChatBottombar
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={onSubmit}
          isLoading={isLoading}
          stop={handleStop}
          isToolInProgress={isToolInProgress}
        />
      </div>
    </div>
  );
};

export default Chat;
