'use client';

import { ChatRequestOptions } from 'ai';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const questions = {
  Me: "Can you tell me more about yourself? I'm curious to learn who you are.",
  Projects:
    'What kind of projects have you been involved in lately? What are you currently building?',
  Skills:
    "Could you walk me through your main strengths? I'd love to hear both your technical and interpersonal skills.",
  Contact: 'What’s the best way to reach out to you?',
} as const;

const questionConfig = [
  { key: 'Me', emoji: '🤠' },
  { key: 'Projects', emoji: '👩🏼‍💻' },
  { key: 'Skills', emoji: '🤓' },
  { key: 'Contact', emoji: '📧' },
  { key: 'Home', emoji: '🤖' },
] as const;

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
}

const bottomVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'ease', duration: 0.8, delay: 0.2 },
  },
};

export default function ChatBottombar({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
  isToolInProgress,
  onQuickQuestion,
}: ChatBottombarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
      e.preventDefault(); // Prevent default form submission
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleQuickQuestion = (question: string, key?: string) => {
    if (key === 'Home') {
      router.push('/');
      return;
    }
    if (question) {
      // Navigate to chat with query param, append is handled in chat.tsx useEffect
      router.push(`/chat?query=${encodeURIComponent(question)}`);
    }
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
          <div className="flex w-full items-end gap-2">
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
          <div className="mt-2 flex flex-wrap justify-start gap-2 pt-2">
            {questionConfig.map(({ key, emoji }) => (
              <button
                key={key}
                type="button"
                onClick={() =>
                  handleQuickQuestion(
                    questions[key as keyof typeof questions] || '',
                    key
                  )
                }
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-base font-medium text-[var(--foreground)] shadow-sm ring-1 ring-white/20 transition-all duration-150 hover:bg-white hover:text-black hover:ring-black/10 focus:outline-none active:scale-95"
                aria-label={key}
                style={{
                  minWidth: 80,
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  letterSpacing: 0.1,
                  borderRadius: '9999px',
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 5,
                  paddingBottom: 5,
                  backdropFilter: 'blur(2px)',
                }}
              >
                <span className="text-lg">{emoji}</span>
                <span className="tracking-tight">{key}</span>
              </button>
            ))}
          </div>
        </div>
      </form>
    </motion.div>
  );
}
