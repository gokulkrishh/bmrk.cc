'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Session,
  SupabaseClient,
  User as authUser,
} from '@supabase/supabase-js';
import { urls } from 'config';

import createClient from 'lib/supabase/client';

type AuthContextType = {
  authUser: authUser;
  supabase: SupabaseClient;
} | null;

const AuthContext = createContext<AuthContextType>(null);

type AuthProviderProps = {
  children: React.ReactNode;
  authUser: authUser;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [authUser, setAuthUser] = useState<authUser | null>(props.authUser);
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
          setAuthUser(currentSession.user);
        }
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return { authUser, supabase };
  }, [authUser, supabase]);

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

  return context as {
    authUser: authUser;
    supabase: SupabaseClient;
  };
};
