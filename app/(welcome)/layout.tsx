import type { Metadata, Viewport } from 'next';
import { permanentRedirect } from 'next/navigation';

import { urls } from 'config';
import NextTopLoader from 'nextjs-toploader';

import { getUser } from 'app/actions/user';

import { AuthProvider } from 'components/context/auth';
import { ThemeProvider } from 'components/context/theme';
import { Toaster } from 'components/ui/sonner';
import { TooltipProvider } from 'components/ui/tooltip';

import '../globals.css';

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();

  if (!user) {
    permanentRedirect(urls.account);
  }

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider user={user}>
          <div className="max-w-[600px] m-auto flex min-h-dvh w-full homepage">
            <TooltipProvider delayDuration={200}>
              <main className="flex flex-col w-full min-h-[100vh] ">
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
        </AuthProvider>
      </ThemeProvider>
      <Toaster richColors />
    </>
  );
}
