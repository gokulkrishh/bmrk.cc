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
      <div className="flex gap-3 w-full justify-between items-center">
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
            className="font-medium truncate pr-4"
            title={user?.user_metadata?.name ?? ''}
          >
            {user?.user_metadata?.name ?? (
              <Skeleton className="w-52 h-5 bg-neutral-300 mb-1.5" />
            )}
          </div>
          <div
            className="text-sm truncate pr-4 text-neutral-600"
            title={user?.user_metadata?.email ?? ''}
          >
            {user?.user_metadata?.email ?? (
              <Skeleton className="w-36 h-5 bg-neutral-300" />
            )}
          </div>
        </div>
        <div>
          {user?.user_metadata?.email ? (
            <button
              className="items-center rounded-full tracking-wide focus:outline-0 focus:bg-black/80 active:bg-black/80 border-0 text-sm flex justify-center py-2.5 px-4 text-white bg-black hover:bg-black/80 max-sm:-ml-5"
              onClick={signOut}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </SettingsCard>
  );
}
