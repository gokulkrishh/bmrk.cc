'use client';

import { useState } from 'react';

import { urls } from 'config';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from 'components/context/auth';
import DeleteAccountModal from 'components/modal/delete-account';
import { Skeleton } from 'components/ui/skeleton';

import { refreshInChromeExt } from 'lib/chrome-extension';

import SettingsCard from './settings-card';

export default function DeleteAccount() {
  const { authUser, supabase } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (email: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/account/delete', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error('Unable to delete your account, try again.');
      }
      refreshInChromeExt();
      await supabase.auth.signOut();
      window.location.href = urls.account;
    } catch {
      toast.error('Unable to delete your account, try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsCard className="flex flex-col items-start border-red-200 dark:border-red-500/30">
      <div className="flex flex-col p-4 pb-0">
        <div className="font-medium">
          {authUser.user_metadata?.name ? (
            'Delete My Account'
          ) : (
            <Skeleton className="w-52 h-4 bg-accent" />
          )}
        </div>
        <div className="text-sm mt-1 text-muted-foreground">
          {authUser.user_metadata?.name ? (
            `Permanently delete your account and all its associated data, this
          action cannot be undone.`
          ) : (
            <Skeleton className="w-80 h-10 bg-accent mt-1.5" />
          )}
        </div>
      </div>
      <div className="flex w-full justify-end bg-red-50 dark:bg-red-500/30 border-red-200 dark:border-red-500/30 rounded-bl-[calc(var(--radius)-1px)] rounded-br-[calc(var(--radius)-1px)] p-2 px-3.5">
        {authUser.user_metadata?.email ? (
          <button
            className="items-center h-[40px] tracking-wide rounded-full text-red-700 dark:text-white dark:bg-red-600 dark:hover:bg-red-500 dark:hover:border-red-500 dark:border-red-700 border border-red-300 focus:outline-0 focus:bg-accent/80 active:bg-accent/80 text-sm flex justify-center py-2 px-3 transition-colors bg-background hover:border-red-300/80 hover:bg-red-300/80"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
          </button>
        ) : null}
        {open ? (
          <DeleteAccountModal
            loading={loading}
            open={true}
            setOpen={setOpen}
            emailId={authUser.user_metadata?.email}
            onSubmit={onSubmit}
          />
        ) : null}
      </div>
    </SettingsCard>
  );
}
