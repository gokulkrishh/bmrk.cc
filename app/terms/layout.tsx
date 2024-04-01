import { Inter } from 'next/font/google';

import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const title = 'Bookmark it. | Terms';
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience';

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
