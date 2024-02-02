import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

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
    images: ['https://bmrk.cc/images/open-graph.jpg'],
  },
  openGraph: {
    type: 'website',
    title,
    url: 'https://bmrk.cc',
    description,
    images: ['https://bmrk.cc/images/open-graph.jpg'],
  },
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/icon.svg',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    title,
    statusBarStyle: 'default',
    startupImage: ['https://bmrk.cc/icons/apple-icon.png'],
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
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex h-full bg-white`}>
        {children}
      </body>
    </html>
  );
}
