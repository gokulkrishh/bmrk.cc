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
        className="flex px-1 w-7 h-7 hover:bg-blue-100 active:bg-blue-100 items-center justify-center"
      >
        <EditIcon className="text-blue-500 w-3.5 h-3.5" />
      </button>
      {open ? (
        <EditTagModal open={true} setOpen={setOpen} id={id} name={name} />
      ) : null}
    </>
  );
}
