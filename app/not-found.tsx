import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const title = 'Bookmark it. | Not Found';
const description =
  'Bookmark It. is an open-source bookmark manager to organize and personalize your bookmarking experience';

export const metadata: Metadata = {
  title,
  description,
};

export default async function NotFound() {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} flex h-full bg-background`}>
        <div className="max-w-[600px] m-auto flex min-h-dvh w-full">
          <div className="flex justify-center items-center flex-col text-center w-full">
            <h2 className="text-5xl font-bold">404</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Could not find requested resource.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
