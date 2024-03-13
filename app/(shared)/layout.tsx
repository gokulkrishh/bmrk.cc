import { Viewport } from 'next';
import Link from 'next/link';

import { urls } from 'config';
import NextTopLoader from 'nextjs-toploader';

import { ThemeProvider } from 'components/context/theme';
import { Logo } from 'components/icons';
import { Toaster } from 'components/ui/sonner';
import { TooltipProvider } from 'components/ui/tooltip';

import '../globals.css';

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
            <nav className="transition-opacity duration-150 ease-out fixed sm:top-0 max-sm:bottom-0 max-sm:dark:bg-black/60 max-sm:bg-background/50 max-sm:h-[86px] hidden sm:flex z-10 justify-center sm:justify-between max-sm:px-4 sm:flex-col sm:min-h-dvh bottom-t sm:border-r sm:w-[70px] w-full border-border">
              <div className="flex sm:flex-col items-center max-sm:pb-[calc(env(safe-area-inset-bottom)/3)] max-sm:gap-6 gap-3 text-primary">
                <a
                  href={urls.app}
                  className="active:opacity-85 mt-2 mb-2 hidden sm:block group"
                >
                  <Logo className="w-[38px] h-[38px] group-active:scale-95 duration-150 transition-transform" />
                  <span className="sr-only">Home page</span>
                </a>
              </div>
            </nav>
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
