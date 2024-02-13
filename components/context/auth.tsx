'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { urls } from 'config';

import createClient from 'lib/supabase/client';

type AuthContextType = { user: User; supabase: SupabaseClient } | null;

const AuthContext = createContext<AuthContextType>(null);

type AuthProviderProps = {
  children: React.ReactNode;
  user: User;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<User | null>(props.user);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(
      (event, currentSession: Session | null) => {
        if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
          router.refresh();
        }
        if (event == 'SIGNED_OUT') {
          window.location.href = urls.account;
        }
        if (currentSession?.user) {
          setUser(currentSession.user);
        }
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return { user, supabase };
  }, [user, supabase]);

  return (
    <AuthContext.Provider value={value as AuthContextType}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a Auth Context Provider.`);
  }

  return context as { user: User; supabase: SupabaseClient };
};
