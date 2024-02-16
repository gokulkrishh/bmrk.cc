'use client';

import { createContext, useContext, useMemo } from 'react';

import { plans } from 'config';

import { User, UserModified } from 'types/data';

type UserContextType = {
  user: UserModified | null;
} | null;

const UserContext = createContext<UserContextType>(null);

type UserProviderProps = {
  children: React.ReactNode;

  user: User | null;
};

export const UserProvider = (props: UserProviderProps) => {
  const { user, children } = props;

  const value = useMemo(() => {
    return {
      user,
      currentPlan:
        user?.plan_status === plans.free.type ? plans.free : plans.pro,
    };
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
    user: UserModified;
    currentPlan: typeof plans.free | typeof plans.pro;
  };
};
