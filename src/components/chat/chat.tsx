'use client';

import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import type { Easing } from 'framer-motion';

import ChatBottombar from '@/components/chat/chat-footer';
import ChatLanding from '@/components/chat/chat-landing';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
    ease: 'easeOut' as Easing,
  },
};

const Chat = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');

  // Use a ref for strict, synchronous "has submitted" guard (avoiding StrictMode double effect problem)
  const autoSubmittedRef = useRef(false);
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

  // Only append initial query ONCE, and only if there are no messages (guarded by ref)
  useEffect(() => {
    if (initialQuery && !autoSubmittedRef.current && messages.length === 0) {
      autoSubmittedRef.current = true; // Synchronously block further runs
      setAutoSubmitted(true); // For UI, if you need it
      setInput('');
      console.log('[LOG] useEffect: Appending initialQuery', initialQuery);
      append({ role: 'user', content: initialQuery.trim() });
    } else {
      console.log('[LOG] useEffect: Did NOT append', {
        initialQuery,
        autoSubmitted: autoSubmittedRef.current,
        messagesLength: messages.length,
      });
    }
  }, [initialQuery, setInput, append, messages.length]);

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
    if (!input.trim() || isToolInProgress || isLoading) return;
    console.log('[LOG] onSubmit: Appending input', input.trim());
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
    // Animate text only for new assistant messages
    messages.forEach((msg, i) => {
      if (
        msg.role === 'assistant' &&
        typeof msg.content === 'string' &&
        !animatedTexts[i]
      ) {
        let idx = 0;
        const fullText = msg.content;
        const typingSpeed = 22; // ms per char

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

    return () => {
      Object.values(typingIntervals.current).forEach(clearInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // Track when a quick question is in progress
  const [quickQuestionInProgress, setQuickQuestionInProgress] = useState(false);

  // Handler for quick question buttons (only on /chat)
  const onQuickQuestion = (question: string) => {
    if (isLoading || isToolInProgress || quickQuestionInProgress) return;
    setQuickQuestionInProgress(true);
    console.log('[LOG] onQuickQuestion: Appending quick question', question);
    append({ role: 'user', content: question });
    setInput('');
  };

  // Re-enable quick question buttons when AI finishes responding
  useEffect(() => {
    if (!isLoading && !isToolInProgress && quickQuestionInProgress) {
      setQuickQuestionInProgress(false);
    }
  }, [isLoading, isToolInProgress, quickQuestionInProgress]);

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
                submitQuery={(q) => {
                  console.log('[LOG] ChatLanding: Appending landing query', q);
                  append({ role: 'user', content: q });
                }}
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
                      message={{
                        ...msg,
                        content:
                          animatedTexts[i] !== undefined
                            ? animatedTexts[i]
                            : msg.content,
                      }}
                      isLoading={false}
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
          onQuickQuestion={onQuickQuestion}
          quickQuestionDisabled={
            quickQuestionInProgress || isLoading || isToolInProgress
          }
        />
      </div>
    </div>
  );
};

export default Chat;
