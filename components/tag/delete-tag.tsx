'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { deleteTag } from 'app/actions/tags';
import { incrementTagUsage } from 'app/actions/user';

import { DeleteIcon } from 'components/icons';
import Loader from 'components/loader';

import { Tag } from 'types/data';

export default function DeleteTag({ id }: { id: Tag['id'] }) {
  const [loading, setLoading] = useState(false);
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
    }
  };
  return (
    <button
      onClick={async () => {
        await onDelete(id);
      }}
      className="flex w-7 h-7 pl-0.5 pr-1 group hover:bg-red-100 active:bg-red-100 dark:hover:bg-red-800/50 dark:active:bg-red-800/50 items-center justify-center"
    >
      {loading ? (
        <Loader className="h-4 w-4 text-black group-hover:text-black group-hover:dark:text-white dark:text-white" />
      ) : (
        <DeleteIcon className="text-red-500 w-4 h-4" />
      )}
    </button>
  );
}
