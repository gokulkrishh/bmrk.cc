'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { deleteTag } from 'app/actions/tags';
import { incrementTagUsage } from 'app/actions/user';

import { DeleteIcon } from 'components/icons';
import Loader from 'components/loader';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';

import { cn } from 'lib/utils';

import { Tag } from 'types/data';

export default function DeleteTag({
  id,
  name,
}: {
  id: Tag['id'];
  name: Tag['name'];
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onDelete = async (id: Tag['id']) => {
    try {
      setLoading(true);
      await incrementTagUsage(-1);
      await deleteTag(id);
      toast.success('Tag has been deleted.');
    } catch {
      toast.error('Unable to delete tag, try again');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <Popover open={open} onOpenChange={(opened) => setOpen(opened)}>
      <PopoverTrigger>
        <button className="flex w-7 h-7 pl-0.5 pr-1 group hover:bg-red-100 active:bg-red-100 dark:hover:bg-red-800/50 dark:active:bg-red-800/50 items-center justify-center">
          <DeleteIcon className="text-red-500 w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        className="md:w-96 w-[calc(23rem-30px)] mx-2 rounded-xl"
      >
        <p>
          Delete the <span className="font-medium">{name}</span> tag?
        </p>
        <div className=" flex gap-2.5 items-center justify-end mt-3">
          <button
            onClick={async () => {
              await onDelete(id);
            }}
            className={cn(
              'items-center rounded-full disabled:text-white disabled:cursor-not-allowed focus:outline-0 disabled:bg-red-600/60 focus:bg-red-600/80 active:bg-red-600/80 border-0 text-sm flex justify-center py-2 px-4 text-white bg-red-600 hover:bg-red-600/80',
              {
                'cursor-not-allowed': loading,
              },
            )}
            disabled={loading}
          >
            {loading ? (
              <Loader className="h-4 w-4 mx-1 my-0.5 text-white group-hover:text-white group-hover:dark:text-white dark:text-white" />
            ) : (
              'Yes'
            )}
          </button>
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="items-center rounded-full shrink-0 px-4 disabled:opacity-70 text-primary border border-border focus:outline-0 text-sm flex justify-center py-2 transition-colors"
          >
            No
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
