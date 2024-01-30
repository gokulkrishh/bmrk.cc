'use client';

import { useState } from 'react';

import { urls } from 'config';
import { toast } from 'sonner';

import { useAuth } from 'components/context/auth';
import DeleteAccountModal from 'components/modal/delete-account';

import SettingsCard from './settings-card';

export default function DeleteAccount() {
  const { user, supabase } = useAuth();
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
      await supabase.auth.signOut();
      window.location.href = urls.account;
    } catch {
      toast.error('Unable to delete your account, try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsCard className="bg-red-50 border-red-100">
      <div className="flex flex-col">
        <h3 className="font-medium">Delete My Account</h3>
        <p className="text-sm mt-1 max-w-[350px] text-neutral-600">
          Permanently delete your account and all its associated data, this
          action cannot be undone.
        </p>
      </div>
      {user?.user_metadata?.email ? (
        <button
          className="items-center tracking-wide w-[95px] rounded-lg focus:outline-0 focus:bg-red-700/80 active:bg-red-700/80 border-0 text-sm flex justify-center py-2 px-4 text-white bg-red-700 hover:bg-red-700/80"
          onClick={() => setOpen(true)}
        >
          Delete
        </button>
      ) : null}
      {open ? (
        <DeleteAccountModal
          loading={loading}
          open={true}
          setOpen={setOpen}
          emailId={user?.user_metadata?.email}
          onSubmit={onSubmit}
        />
      ) : null}
    </SettingsCard>
  );
}
