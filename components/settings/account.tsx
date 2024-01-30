'use client';

import { urls } from 'config';
import { LogOut } from 'lucide-react';

import { useAuth } from 'components/context/auth';
import Loader from 'components/loader';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Skeleton } from 'components/ui/skeleton';

import SettingsCard from './settings-card';

export default function SettingsAccount() {
  const { user, supabase } = useAuth();

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = urls.account;
  };

  return (
    <SettingsCard className="h-[86px]">
      <div className="flex gap-4 items-center">
        <Avatar className="h-[40px] w-[40px]">
          <AvatarImage
            src={user?.user_metadata?.avatar_url}
            alt={user?.user_metadata?.name}
          />
          <AvatarFallback className="font-medium text-black uppercase text-xl bg-neutral-300">
            {user?.user_metadata?.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="grid max-w-sm w-full">
          <div
            className="font-medium truncate pr-2"
            title={user?.user_metadata?.name ?? ''}
          >
            {user?.user_metadata?.name ?? (
              <Skeleton className="w-52 h-5 bg-neutral-300 mb-1.5" />
            )}
          </div>
          <div
            className="text-sm truncate pr-2"
            title={user?.user_metadata?.email ?? ''}
          >
            {user?.user_metadata?.email ?? (
              <Skeleton className="w-36 h-5 bg-neutral-300" />
            )}
          </div>
        </div>
      </div>
      {user?.user_metadata?.email ? (
        <button
          className="items-center rounded-full tracking-wide focus:outline-0 focus:bg-black/80 active:bg-black/80 border-0 text-sm flex justify-center py-2 px-3 text-white bg-black hover:bg-black/80 max-sm:-ml-5"
          onClick={signOut}
        >
          <LogOut className="h-3.5 w-3.5 mr-1.5" />
          Logout
        </button>
      ) : null}
    </SettingsCard>
  );
}
