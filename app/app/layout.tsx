import type { Metadata, Viewport } from 'next';
import { permanentRedirect } from 'next/navigation';

import { urls } from 'config';
import NextTopLoader from 'nextjs-toploader';

import { getAuthUser, getUser } from 'app/actions/user';

import { AuthProvider } from 'components/context/auth';
import { ThemeProvider } from 'components/context/theme';
import { UserProvider } from 'components/context/user';
import Sidebar from 'components/sidebar';
import { Toaster } from 'components/ui/sonner';
import { TooltipProvider } from 'components/ui/tooltip';

import '../globals.css';

const title = 'Bookmark it. | Home';
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience.';

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
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default async function RootLayout({
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
      <NextTopLoader
        height={2}
        shadow={false}
        color="#cb0000"
        showSpinner={false}
      />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider authUser={authUser}>
          <UserProvider user={user}>
            <div className="max-w-2xl m-auto flex min-h-dvh w-full">
              <TooltipProvider delayDuration={200}>
                <Sidebar />
                <main className="flex sm:ml-[69px] max-sm:pb-[69px] flex-col w-full min-h-[100vh] ">
                  {children}
                </main>
              </TooltipProvider>
            </div>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
      <Toaster
        richColors
        expand
        visibleToasts={2}
        toastOptions={{ className: 'max-sm:mb-[4.5rem]' }}
      />
    </>
  );
}
