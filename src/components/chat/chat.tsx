'use client';

import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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

  // Auto-submit query from URL param once
  useEffect(() => {
    // Only auto-submit if there are no messages (i.e., on fresh load)
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

  return (
    <div className="container mx-auto flex h-screen max-w-3xl flex-col">
      {/* Chat content */}
      <div className="flex-1 overflow-y-auto px-2 pt-8">
        {' '}
        {/* pt-8 adds space from top */}
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
                    <SimplifiedChatView
                      message={msg}
                      isLoading={isLoading}
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
              {isLoading && (
                <motion.div
                  key="loading"
                  {...MOTION_CONFIG}
                  className="px-4 pt-18"
                >
                  <div className="bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100 w-full animate-pulse rounded px-4 py-2">
                    Loading...
                  </div>
                </motion.div>
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
