'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { SupabaseClient } from '@supabase/supabase-js';
import { urls } from 'config';

import createSupabaseBrowserClient from 'lib/supabase/client';

import { User } from 'types/data';

const AuthContext = createContext(null);

type AuthProviderProps = {
  children: React.ReactNode;
  user: User;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<User | undefined>(props.user);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession: any) => {
      if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
        router.refresh();
      }
      if (event == 'SIGNED_OUT') {
        window.location.href = urls.account;
      }
      if (currentSession?.user) {
        setUser(currentSession?.user as User);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return { user, supabase };
  }, [user, supabase]) as { user: User; supabase: SupabaseClient };

  return (
    <AuthContext.Provider value={value as any}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext<any>(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a Auth Context Provider.`);
  }

  return context ?? null;
};
