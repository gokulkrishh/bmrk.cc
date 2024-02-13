import { Inter } from 'next/font/google';

import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const title = 'Bookmark it. | Privacy Policy';
const description = 'Bookmark manager for the modern web.';

export const metadata = {
  title,
  description,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} flex h-full bg-background`}>
        {children}
      </body>
    </html>
  );
}
