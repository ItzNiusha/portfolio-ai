'use client';

import { Message } from 'ai/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export type ChatMessageContentProps = {
  message: Message;
  isLast?: boolean;
  isLoading?: boolean;
  reload?: () => Promise<string | null | undefined>;
  addToolResult?: (args: { toolCallId: string; result: string }) => void;
  skipToolRendering?: boolean;
};

const CollapsibleCodeBlock = ({
  inline,
  className,
  children,
  ...props
}: {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Extract language from className="language-js"
  const language = className?.replace('language-', '')?.trim() || 'Code';

  const code =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
        ? children.join('')
        : '';

  if (inline) {
    // Inline code: render as usual
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  // Block code: render with collapsible
  const previewLines = code.split('\n').slice(0, 1).join('\n');
  const hasMoreLines = code.split('\n').length > 1;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="my-4 w-full overflow-hidden rounded-md"
    >
      <div className="bg-secondary text-secondary-foreground flex items-center justify-between rounded-t-md border-b px-4 py-1">
        <span className="text-xs">
          {language !== 'text' ? language : 'Code'}
        </span>
        <CollapsibleTrigger className="hover:bg-secondary/80 rounded p-1">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
      </div>
      <div className="bg-accent/80 text-accent-foreground rounded-b-md">
        {!isOpen && hasMoreLines ? (
          <pre className="px-4 py-3">
            <code className="text-sm">{previewLines + '\n...'}</code>
          </pre>
        ) : (
          <CollapsibleContent>
            <div className="custom-scrollbar" style={{ overflowX: 'auto' }}>
              <pre className="min-w-max px-4 py-3">
                <code className="text-sm whitespace-pre">{code}</code>
              </pre>
            </div>
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
};

export default function ChatMessageContent({
  message,
}: ChatMessageContentProps) {
  return (
    <div className="w-full">
      {message.parts?.map((part, partIndex) => {
        if (part.type !== 'text' || !part.text) return null;
        return (
          <div key={partIndex} className="prose dark:prose-invert w-full">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="break-words whitespace-pre-wrap">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="my-4 list-disc pl-6">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-4 list-decimal pl-6">{children}</ol>
                ),
                li: ({ children }) => <li className="my-1">{children}</li>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {children}
                  </a>
                ),
                code: CollapsibleCodeBlock,
              }}
            >
              {part.text}
            </Markdown>
          </div>
        );
      })}
    </div>
  );
}
