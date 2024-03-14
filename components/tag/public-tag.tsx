'use client';

import { useState } from 'react';

import { PublicIcon } from 'components/icons';
import ShareModal from 'components/modal/share';

import { Tag } from 'types/data';

type PublicTagProps = {
  tag: Tag;
};

export default function PublicTag({ tag }: PublicTagProps) {
  const [open, setOpen] = useState(false);
  if (!tag.shared) return null;

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="rounded-full ml-1 flex w-7 h-7 hover:bg-accent active:bg-accent items-center justify-center"
      >
        <PublicIcon className="w-4 h-4" />
      </button>
      {open ? <ShareModal open={open} onHide={setOpen} tag={tag} /> : null}
    </>
  );
}
