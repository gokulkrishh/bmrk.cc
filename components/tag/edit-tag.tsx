'use client';

import { useState } from 'react';

import { EditIcon } from 'components/icons';
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
        <EditIcon className="text-blue-500 w-4 h-4" />
      </button>
      {open ? (
        <EditTagModal open={true} setOpen={setOpen} id={id} name={name} />
      ) : null}
    </>
  );
}
