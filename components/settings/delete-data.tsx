'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { useAuth } from 'components/context/auth';
import { useUser } from 'components/context/user';
import { DeleteIcon } from 'components/icons';
import DeleteDataModal from 'components/modal/delete-data';
import { Skeleton } from 'components/ui/skeleton';

import { refreshInChromeExt } from 'lib/chrome-extension';

import SettingsCard from './settings-card';

export default function DeleteData() {
  const { authUser } = useAuth();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isDisabled =
    user.usage.bookmarks === 0 &&
    user.usage.tags === 0 &&
    user.usage.favorites === 0;

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/bookmarks', {
        method: 'DELETE',
        body: JSON.stringify({ email: authUser.email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast.success('All your data has been deleted.');
      refreshInChromeExt();
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error((error as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsCard className="flex flex-col items-start border-red-200 dark:border-red-500/30">
      <div className="flex flex-col p-4 pb-0">
        <div className="font-medium">
          {authUser.user_metadata?.name ? (
            'Delete My Data'
          ) : (
            <Skeleton className="w-52 h-4 bg-accent" />
          )}
        </div>
        <div className="text-sm mt-1 text-muted-foreground">
          {authUser.user_metadata?.name ? (
            `Permanently delete all your data, this action cannot be undone. Export your bookmarks before deleting your data.`
          ) : (
            <Skeleton className="w-80 h-10 bg-accent mt-1.5" />
          )}
        </div>
      </div>
      <div className="flex w-full justify-end bg-red-50 dark:bg-red-500/30 border-red-200 dark:border-red-500/30 rounded-bl-[calc(var(--radius)-1px)] rounded-br-[calc(var(--radius)-1px)] p-2 px-3.5">
        {authUser.user_metadata?.email ? (
          <button
            disabled={isDisabled}
            className="items-center h-[40px] disabled:hover:bg-background disabled:hover:dark:border-red-700 disabled:hover:dark:bg-red-600 disabled:cursor-not-allowed disabled:opacity-65  tracking-wide rounded-full text-red-700 dark:text-white dark:bg-red-600 dark:hover:bg-red-500 dark:hover:border-red-500 dark:border-red-700 border border-red-300 focus:outline-0 focus:bg-accent/80 active:bg-accent/80 text-sm flex justify-center py-2 px-3 transition-colors bg-background hover:border-red-300/80 hover:bg-red-300/80"
            onClick={() => !isDisabled && setOpen(true)}
          >
            <DeleteIcon className="w-3.5 h-3.5 mr-1.5" /> Delete
          </button>
        ) : null}
        {open ? (
          <DeleteDataModal
            loading={loading}
            open={true}
            setOpen={setOpen}
            onSubmit={onSubmit}
          />
        ) : null}
      </div>
    </SettingsCard>
  );
}
