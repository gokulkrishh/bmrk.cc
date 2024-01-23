import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { AuthProvider } from 'components/context/auth';
import Sidebar from 'components/sidebar';
import { Toaster } from 'components/ui/sonner';
import { TooltipProvider } from 'components/ui/tooltip';

import { getUser } from './actions/user';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const title = 'Bookmark it.';
const description = 'Bookmark manager for the modern web.';

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@gokul_i',
    images: ['/images/open-graph.jpg'],
  },
  openGraph: {
    type: 'website',
    title,
    description,
    images: ['/images/open-graph.jpg'],
  },
  icons: {
    icon: '/images/icons/icon.svg',
    shortcut: '/images/icons/icon.svg',
    apple: '/images/icons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
  userScalable: false,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex h-full bg-white`}>
        <AuthProvider user={user}>
          <div className="max-w-[600px] m-auto flex h-full w-full">
            <TooltipProvider delayDuration={200}>
              <Sidebar />
              <main className="flex sm:ml-[69px] max-sm:pb-[69px] flex-col w-full min-h-[100vh] ">
                {children}
              </main>
            </TooltipProvider>
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
