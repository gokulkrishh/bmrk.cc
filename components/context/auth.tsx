'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { urls } from 'config';

import createSupabaseBrowserClient from 'lib/supabase/client';

const AuthContext = createContext(null);

const isProduction = process.env.NODE_ENV === 'production';
const redirectUrl = `${isProduction ? 'https://' : 'http://'}${urls.home}`;

export const AuthProvider = (props: any) => {
  const { children } = props;
  const [user, setUser] = useState<any>(null);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function getActiveSession() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
      if (data?.user) {
        router.replace(pathname);
      }
    }

    getActiveSession();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event == 'SIGNED_OUT') {
        window.location.href = redirectUrl;
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return { user, supabase };
  }, [user, supabase]) as any;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext<any>(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a Auth Context Provider.`);
  }

  return context ?? null;
};
