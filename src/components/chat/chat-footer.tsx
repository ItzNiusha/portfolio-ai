'use client';

import { ChatRequestOptions } from 'ai';
import { motion } from 'framer-motion';
import { ArrowUp, Home } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import QuickQuestionButtons from './QuickQuestionButtons';
import type { Variants, Transition } from 'framer-motion';

interface ChatBottombarProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading: boolean;
  stop: () => void;
  input: string;
  isToolInProgress: boolean;
  onQuickQuestion?: (question: string) => void;
  quickQuestionDisabled?: boolean;
}

const bottomVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween' as Transition['type'], // 👈 this cast fixes the error
      duration: 0.8,
      delay: 0.2,
    },
  },
};

function useDebouncedCallback(
  callback: (...args: any[]) => void,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function debounced(...args: any[]) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debounced;
}

export default function ChatBottombar({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
  isToolInProgress,
  onQuickQuestion,
  quickQuestionDisabled = false,
}: ChatBottombarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      !e.nativeEvent.isComposing &&
      !isToolInProgress &&
      input.trim()
    ) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const debouncedHandleQuickQuestion = useDebouncedCallback(
    (question: string, key?: string) => {
      if (quickQuestionDisabled || isLoading || isToolInProgress) return;
      router.push(`/chat?query=${encodeURIComponent(question)}&topic=${key}`);
    },
    600
  );

  // Home button handler
  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <motion.div
      variants={bottomVariants}
      initial="hidden"
      animate="visible"
      className="pointer-events-auto z-10 flex w-full flex-col items-center justify-center"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() && !isToolInProgress && !isLoading) {
            handleSubmit(e);
          }
        }}
        className="relative mx-auto w-full"
      >
        <div
          className={`relative mx-auto flex w-full max-w-[650px] flex-1 flex-col gap-3 rounded-[2rem] bg-[var(--muted)] text-base text-[var(--foreground)] shadow-2xl backdrop-blur-2xl transition-all md:gap-4 lg:gap-5`}
          style={{
            minHeight: 0,
            padding: '0.75rem 1.5rem',
            borderRadius: '2rem',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.08)',
            marginBottom: 50,
            marginTop: '-1rem',
          }}
        >
          {/* Flex row: Home button, input, submit */}
          <div className="flex w-full items-end gap-2">
            <button
              type="button"
              onClick={handleHomeClick}
              aria-label="Go to Home"
              className="flex items-center gap-2 rounded-full bg-[var(--muted)] px-3 py-2 text-base text-[var(--foreground)] shadow transition-colors hover:bg-white hover:text-black"
              style={{
                borderRadius: '9999px',
                minWidth: 44,
                minHeight: 36,
                marginRight: 4,
              }}
            >
              <Home className="h-5 w-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder={
                isToolInProgress ? 'Tool is in progress...' : 'Ask me anything'
              }
              className="flex-grow rounded-full border-none bg-[var(--muted)] py-2 pr-5 pl-4 text-lg leading-normal text-[var(--foreground)] transition-colors placeholder:text-neutral-400 focus:outline-none"
              style={{
                minHeight: 36,
                background: 'var(--muted)',
                borderRadius: '9999px',
                fontSize: '1.08rem',
                paddingLeft: 16,
                paddingRight: 16,
              }}
              autoComplete="off"
              disabled={isToolInProgress || isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isToolInProgress || isLoading}
              aria-label="Submit question"
              className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--muted)] text-[var(--foreground)] shadow transition-colors duration-200 hover:bg-white hover:text-black active:bg-white active:text-black disabled:opacity-60"
              style={{
                borderRadius: '9999px',
                minWidth: 44,
                minHeight: 44,
              }}
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
          <QuickQuestionButtons
            onClick={debouncedHandleQuickQuestion}
            disabled={quickQuestionDisabled || isLoading || isToolInProgress}
          />
        </div>
      </form>
    </motion.div>
  );
}
