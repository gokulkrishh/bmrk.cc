import { Viewport } from 'next';

import NextTopLoader from 'nextjs-toploader';

import { ThemeProvider } from 'components/context/theme';
import { Toaster } from 'components/ui/sonner';
import { TooltipProvider } from 'components/ui/tooltip';

import '../../globals.css';
import Sidebar from './sidebar';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="max-w-2xl m-auto flex min-h-dvh w-full">
          <TooltipProvider delayDuration={200}>
            <Sidebar />
            <main className="flex sm:ml-[69px] max-sm:pb-[69px] flex-col w-full min-h-[100vh]">
              <NextTopLoader
                height={2}
                shadow={false}
                color="#cb0000"
                showSpinner={false}
              />
              {children}
            </main>
          </TooltipProvider>
        </div>
      </ThemeProvider>
      <Toaster expand visibleToasts={2} richColors />
    </>
  );
}
