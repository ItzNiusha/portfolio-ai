import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Niushas Portfolio',
  description:
    'Interactive portfolio with an AI-powered Memoji that answers questions about me, my skills, and my experience',
  keywords: [
    'Niusha',
    'Portfolio',
    'Developer',
    'AI',
    'Interactive',
    'Web Development',
    'Full Stack',
    'Next.js',
    'React',
  ],
  authors: [{ name: 'Niusha', url: '' }],
  creator: 'Niusha',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '',
    title: 'Niushas Portfolio',
    description:
      'An interactive portfolio featuring an AI assistant that answers questions about me.',
    siteName: 'Niushas Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nessas Portfolio',
    description:
      'An interactive portfolio featuring an AI assistant that answers questions about me.',
    creator: '@itzniusha',
  },
  icons: {
    icon: [{ url: '/favicon.PNG', sizes: 'any' }],
    shortcut: '/favicon.PNG?v=2',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
