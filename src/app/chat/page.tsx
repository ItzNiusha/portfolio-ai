import { Suspense } from 'react';
import Chat from '@/components/chat/chat';

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading chat...</div>}>
      <Chat />
    </Suspense>
  );
}
