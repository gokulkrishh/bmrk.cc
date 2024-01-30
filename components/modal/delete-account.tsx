import { useState } from 'react';

import { DialogDescription } from '@radix-ui/react-dialog';

import Loader from 'components/loader';
import { Dialog, DialogContent, DialogHeader } from 'components/ui/dialog';
import { Input } from 'components/ui/input';

type AddBookmarkProps = {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (emailId: string) => void;
  emailId: string;
};

export default function DeleteAccountModal({
  open,
  setOpen,
  onSubmit,
  loading,
  emailId,
}: AddBookmarkProps) {
  const [email, setEmail] = useState('');
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-md p-4">
        <DialogHeader className="font-medium">Delete Your Account</DialogHeader>
        <DialogDescription className="-mt-3 text-sm">
          Type this account email to delete your account and its data.
        </DialogDescription>
        <form
          className=""
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(email);
          }}
        >
          <Input
            className="-mt-1"
            type="email"
            placeholder="Email"
            value={email}
            inputMode="email"
            onChange={(event: any) => setEmail(event.target.value)}
          />
          <button
            type="submit"
            disabled={email !== emailId}
            className="items-center mt-3 disabled:pointer-events-auto rounded-lg focus:outline-0 disabled:bg-red-700/70 focus:bg-red-700/80 active:bg-red-700/80 border-0 text-sm flex w-full justify-center py-2.5 px-4 text-white bg-red-700 hover:bg-red-700/80"
          >
            {loading ? <Loader /> : 'Confirm Delete'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
