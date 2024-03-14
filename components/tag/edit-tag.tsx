'use client';

import { useState } from 'react';

import { Edit3 } from 'lucide-react';

import EditTagModal from 'components/modal/edit-tag';

import { Tag } from 'types/data';

type EditTagProps = {
  id: Tag['id'];
  name: Tag['name'];
};

export default function EditTag({ id, name }: EditTagProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="rounded-full ml-1 flex w-7 h-7 hover:bg-blue-100 active:bg-blue-100 items-center justify-center"
      >
        <Edit3 className="text-blue-500" size={16} />
      </button>
      {open ? (
        <EditTagModal open={true} setOpen={setOpen} id={id} name={name} />
      ) : null}
    </>
  );
}
