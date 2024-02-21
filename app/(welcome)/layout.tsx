import { permanentRedirect } from 'next/navigation';

import { urls } from 'config';
import NextTopLoader from 'nextjs-toploader';

import { getAuthUser, getUser } from 'app/actions/user';

import { AuthProvider } from 'components/context/auth';
import { ThemeProvider } from 'components/context/theme';
import { UserProvider } from 'components/context/user';
import { Toaster } from 'components/ui/sonner';
import { TooltipProvider } from 'components/ui/tooltip';

import '../globals.css';

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [authUser, user] = await Promise.all([
    await getAuthUser(),
    await getUser(),
  ]);

  if (!authUser || !user) {
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
        <AuthProvider authUser={authUser}>
          <UserProvider user={user}>
            <div className="max-w-[600px] m-auto flex min-h-dvh w-full homepage-account">
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
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
      <Toaster expand visibleToasts={2} richColors />
    </>
  );
}
