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
    <SettingsCard className="border h-[86px] border-neutral-300 justify-between rounded-xl p-4 py-5 flex gap-4 items-center">
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
        <div className="flex flex-col w-[85%]">
          <div className="font-medium">
            {user?.user_metadata?.name ?? (
              <Skeleton className="w-52 h-5 bg-neutral-300 mb-1.5" />
            )}
          </div>
          <div className="text-sm">
            {user?.user_metadata?.email ?? (
              <Skeleton className="w-36 h-5 bg-neutral-300" />
            )}
          </div>
        </div>
      </div>
      {user?.user_metadata?.email ? (
        <button
          className="items-center w-[95px] rounded-full focus:outline-0 focus:bg-black/80 active:bg-black/80 border-0 text-sm flex justify-center py-2 px-4 text-white bg-black hover:bg-black/80"
          onClick={signOut}
        >
          <LogOut className="h-3 w-3 mr-1.5" />
          Logout
        </button>
      ) : null}
    </SettingsCard>
  );
}
