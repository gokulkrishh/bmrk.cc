import { SyntheticEvent, useState } from 'react';

import { DialogDescription } from '@radix-ui/react-dialog';

import Loader from 'components/loader';
import { Dialog, DialogContent, DialogHeader } from 'components/ui/dialog';
import { Input } from 'components/ui/input';

import { logoutInChromeExt } from 'lib/chrome-extension';
import { cn } from 'lib/utils';

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
      <DialogContent className="sm:max-w-md p-4 max-sm:w-[calc(100%-30px)] !top-[30%]">
        <h3 className="font-medium !space-y-0">Delete Your Account</h3>
        <div className="-mt-2 text-sm text-muted-foreground !space-y-0">
          Type this account email to delete your account and its data.
        </div>
        <form
          className="-mt-1"
          onSubmit={(event: SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (email === emailId) {
              logoutInChromeExt();
              onSubmit(email);
            }
          }}
        >
          <Input
            autoComplete="off"
            id="name"
            type="email"
            placeholder="Email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            inputMode="email"
            value={email}
            required
            data-1p-ignore
          />

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={email !== emailId || loading}
              className={cn(
                'items-center w-[85px] disabled:text-white disabled:cursor-not-allowed rounded-full focus:outline-0 disabled:bg-red-600/60 focus:bg-red-600/80 active:bg-red-600/80 border-0 text-sm flex justify-center py-2.5 px-4 text-white bg-red-600 hover:bg-red-600/80',
                {
                  '!opacity-50 cursor-not-allowed': loading,
                },
              )}
            >
              {loading ? <Loader /> : 'Confirm'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
