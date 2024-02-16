'use client';

import { useState } from 'react';

import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { deleteTag } from 'app/actions/tags';
import { incrementTagUsage } from 'app/actions/user';

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
      className="rounded-full flex w-7 h-7 hover:bg-red-100 active:bg-red-100 max-sm:flex items-center justify-center"
    >
      {loading ? (
        <Loader className="h-4 w-4 text-black dark:text-white" />
      ) : (
        <Trash2 className="text-red-500" size={16} />
      )}
    </button>
  );
}
