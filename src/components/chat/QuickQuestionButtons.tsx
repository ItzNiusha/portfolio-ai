import React from 'react';
import { questions, questionConfig } from '@/components/data/quickQuestions';

interface QuickQuestionButtonsProps {
  onClick: (question: string, key?: string) => void;
  disabled?: boolean;
  className?: string;
}

const QuickQuestionButtons: React.FC<QuickQuestionButtonsProps> = ({
  onClick,
  disabled = false,
  className = '',
}) => (
  <div className={`mt-2 flex flex-wrap justify-start gap-2 pt-2 ${className}`}>
    {questionConfig.map(({ key, emoji }) => (
      <button
        key={key}
        type="button"
        disabled={disabled}
        onClick={() =>
          onClick(questions[key as keyof typeof questions] || '', key)
        }
        className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-base font-medium text-[var(--foreground)] shadow-sm ring-1 ring-white/20 transition-all duration-150 hover:bg-white hover:text-black hover:ring-black/10 focus:outline-none active:scale-95 disabled:opacity-60"
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
);

export default QuickQuestionButtons;
