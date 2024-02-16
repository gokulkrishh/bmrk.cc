'use client';

import { createContext, useContext, useMemo } from 'react';

import { User } from 'types/data';

type UserContextType = {
  user: User;
} | null;

const UserContext = createContext<UserContextType>(null);

type UserProviderProps = {
  children: React.ReactNode;

  user: User | null;
};

export const UserProvider = (props: UserProviderProps) => {
  const { user, children } = props;

  const value = useMemo(() => {
    return { user };
  }, [user]);

  return (
    <UserContext.Provider value={value as UserContextType}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a User Context Provider.`);
  }

  return context as {
    user: User;
  };
};
