import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { AuthProvider } from 'components/context/auth';
import { BookmarkProvider } from 'components/context/bookmarks';
import { TagProvider } from 'components/context/tags';
import ThemeProvider from 'components/context/theme';
import Sidebar from 'components/sidebar';
import { Toaster } from 'components/ui/sonner';
import { TooltipProvider } from 'components/ui/tooltip';

import { getBookmarks } from './actions/bookmarks';
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
    images: ['/open-graph.jpg'],
  },
  openGraph: {
    type: 'website',
    title,
    description,
    images: ['/open-graph.jpg'],
  },
  icons: {
    icon: '/icons/icon.svg',
    shortcut: '/icons/icon.svg',
    apple: '/icons/apple-touch-icon.png',
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
  const bookmarks = await getBookmarks();

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex h-full bg-white`}>
        <AuthProvider>
          <BookmarkProvider bookmarks={bookmarks}>
            <TagProvider>
              <div className="max-w-[600px] m-auto flex min-h-dvh w-full">
                <TooltipProvider delayDuration={200}>
                  <Sidebar />
                  <main className="flex sm:ml-[69px] max-sm:pb-[69px] flex-col w-full min-h-[100vh] ">
                    {children}
                  </main>
                </TooltipProvider>
              </div>
            </TagProvider>
          </BookmarkProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
