'use client';

import { SyntheticEvent, useEffect, useState } from 'react';

import { toast } from 'sonner';

import { updateTag } from 'app/actions/tags';

import Loader from 'components/loader';
import { Dialog, DialogContent } from 'components/ui/dialog';
import { Input } from 'components/ui/input';

import { cn } from 'lib/utils';

import { Tag } from 'types/data';

type EditTag = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: Tag['id'];
  name: Tag['name'];
};

export default function EditBookmark({ open, setOpen, id, name }: EditTag) {
  const [loading, setLoading] = useState(false);
  const [tagName, setTagName] = useState(name);

  useEffect(() => {
    setTagName(name);
  }, [name]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await updateTag(id, tagName);
      toast.success(`Tag updated.`);
    } catch {
      toast.success(`Unable to update the tag, try again.`);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const isEdited = () => {
    return tagName !== name;
  };

  const Form = () => (
    <div className={cn('h-26 flex flex-col px-1')}>
      <form
        className="h-full flex flex-col gap-3"
        onSubmit={async (event: SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault();
          await onSubmit();
        }}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <Input
            className={cn(
              `mt-2 bg-transparent focus-visible:ring-0 w-full pt-0 px-2 pb-1 !outline-none !focus:outline-none !focus:border-none !border-none !shadow-none placeholder:text-stone-500 text-lg font-normal`,
            )}
            autoComplete="off"
            inputMode="text"
            id="name"
            type="text"
            placeholder="youtube or oss"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTagName(event.target.value);
            }}
            value={tagName ?? ''}
            required
            data-1p-ignore
          />
        </div>
        <div className={cn(`flex justify-end mx-0.5 relative bottom-1.5`)}>
          <button
            type="submit"
            disabled={loading || !tagName?.length || !isEdited()}
            className={cn(
              `rounded-full w-[86px] h-[40px] transition-colors font-medium items-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 disabled:opacity-40 disabled:active:bg-blue-600 disabled:hover:bg-blue-600 disabled:focus:bg-blue-600 border-0 flex justify-center py-2 px-5 text-white`,
              {
                '!opacity-50 cursor-not-allowed': loading,
              },
            )}
          >
            {loading ? <Loader /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={(hide) => setOpen(hide)}>
      <DialogContent className="sm:max-w-md py-2 px-2">{Form()}</DialogContent>
    </Dialog>
  );
}
