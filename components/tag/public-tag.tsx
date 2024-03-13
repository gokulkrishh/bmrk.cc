'use client';

import { PublicIcon } from 'components/icons';

import { Tag } from 'types/data';

type PublicTagProps = {
  isPublic: Tag['public'];
};

export default function PublicTag({ isPublic }: PublicTagProps) {
  if (!isPublic) return null;

  return (
    <>
      <button
        onClick={() => {}}
        className="rounded-full ml-1 flex w-7 h-7 hover:bg-orange-100 active:bg-orange-100 max-sm:flex items-center justify-center"
      >
        <PublicIcon className="w-4 h-4" />
      </button>
    </>
  );
}
