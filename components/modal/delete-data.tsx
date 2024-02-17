import { SyntheticEvent, useState } from 'react';

import { DialogDescription } from '@radix-ui/react-dialog';

import Loader from 'components/loader';
import { Dialog, DialogContent, DialogHeader } from 'components/ui/dialog';
import { Input } from 'components/ui/input';

import { logoutInChromeExt } from 'lib/chrome-extension';
import { cn } from 'lib/utils';

const phrase = 'delete my data';

type AddBookmarkProps = {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: () => void;
};

export default function DeleteDataModal({
  open,
  setOpen,
  onSubmit,
  loading,
}: AddBookmarkProps) {
  const [typed, setTyped] = useState('');
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-md p-4 max-sm:w-[calc(100%-30px)]">
        <DialogHeader className="font-medium !text-left">
          Delete Your Data
        </DialogHeader>
        <DialogDescription className="-mt-2.5 text-sm text-muted-foreground">
          Type <span className="font-medium text-primary">{phrase}</span> and
          click confirm to delete.
        </DialogDescription>
        <form
          onSubmit={(event: SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (phrase === typed) {
              logoutInChromeExt();
              onSubmit();
            }
          }}
        >
          <Input
            autoComplete="off"
            id="name"
            type="text"
            placeholder="Type the phrase to confirm"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTyped(event.target.value);
            }}
            inputMode="email"
            value={typed}
            required
            data-1p-ignore
          />

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={typed !== phrase || loading}
              className={cn(
                'items-center w-[85px] disabled:text-white/60 disabled:cursor-not-allowed rounded-full focus:outline-0 disabled:bg-red-700/60 focus:bg-red-700/80 active:bg-red-700/80 border-0 text-sm flex justify-center py-2.5 px-4 text-white bg-red-700 hover:bg-red-700/80',
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
