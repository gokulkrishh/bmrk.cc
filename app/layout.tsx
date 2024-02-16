import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const title = 'Bookmark it. | Bookmark manager for the modern web.';
const description = 'Bookmark manager for the modern web.';

export const metadata: Metadata = {
  metadataBase: new URL('https://bmrk.cc'),
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    site: '@gokul_i',
    description,
    creator: '@gokul_i',
    images: [
      {
        type: 'image/jpeg',
        url: '/images/og.jpg',
        width: 1920,
        height: 1080,
        alt: 'Bookmark it.',
      },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'Bookmark it.',
    title,
    description,
    url: 'https://bmrk.cc',
    images: [
      {
        type: 'image/jpeg',
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bookmark it.',
      },
    ],
  },
  icons: {
    icon: '/icons/favicon-32x32.png',
    shortcut: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    title,
    statusBarStyle: 'default',
    startupImage: ['/icons/apple-icon.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
  userScalable: false,
  viewportFit: 'cover',
};

const GOOGLE_ANALYTICS_ID = process.env.GA4_ANALYTICS_ID;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} flex h-full bg-background`}>
        {children}
      </body>

      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GOOGLE_ANALYTICS_ID}');`}
      </Script>
    </html>
  );
}
