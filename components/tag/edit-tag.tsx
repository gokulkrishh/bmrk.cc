'use client';

import { useState } from 'react';

import { Edit3 } from 'lucide-react';
import { toast } from 'sonner';

import { deleteTag } from 'app/actions/tags';

import Loader from 'components/loader';
import { Command } from 'components/ui/command';
import { Dialog, DialogContent } from 'components/ui/dialog';

import { Tag } from 'types/data';

export default function EditTag({
  id,
  name,
}: {
  id: Tag['id'];
  name: Tag['name'];
}) {
  const [loading, setLoading] = useState(false);

  const onEdit = async (id: Tag['id']) => {
    try {
      setLoading(true);
      // await deleteTag(id);
      toast.error('Tag has been updated');
    } catch {
      toast.error('Unable to update tag, try again');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => {}}
        className="rounded-full ml-1 flex w-6 h-6 hover:bg-blue-100 active:bg-blue-100 max-sm:flex items-center justify-center"
      >
        {loading ? (
          <Loader className="h-4 w-4" />
        ) : (
          <Edit3 className="text-blue-500" size={14} />
        )}
      </button>
    </>
  );
}
