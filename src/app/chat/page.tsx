'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Chat from '@/components/chat/chat';

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  return (
    <Suspense fallback={<div>Loading the chat...</div>}>
      <Chat key={query} />
    </Suspense>
  );
}
