import type { Viewport } from 'next';
import { permanentRedirect } from 'next/navigation';

import { urls } from 'config/urls';

import { getAuthUser, getUser } from 'app/actions/user';

import { AuthProvider } from 'components/context/auth';
import { UserProvider } from 'components/context/user';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
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
      <AuthProvider authUser={authUser}>
        <UserProvider user={user}>{children}</UserProvider>
      </AuthProvider>
    </>
  );
}
