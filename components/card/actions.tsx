'use client';

import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { BookmarkModified } from 'types/data';

import { cn } from 'lib/utils';

import Loader from '../loader';
import AddTag from './add-tag';

function FavButtonIcon({ is_fav }: { is_fav: BookmarkModified['is_fav'] }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={cn(
        `rounded-full flex w-8 h-8 hover:bg-yellow-100 max-sm:flex items-center justify-center mr-2`
      )}
    >
      {pending ? (
        <Loader className="text-neutral-500 h-4 w-4" />
      ) : is_fav ? (
        <StarFilledIcon className="h-4 w-4 text-yellow-500 " />
      ) : (
        <StarIcon className="h-4 w-4 text-neutral-500" />
      )}
    </button>
  );
}

export default function CardActions({ data }: { data: BookmarkModified }) {
  const { is_fav } = data;
  return (
    <div className="justify-between mb-2 flex items-center">
      <div className="tracking-wide items-center text-neutral-500 text-xs gap-2 flex w-full">
        <AddTag />
      </div>
      <div className="flex">
        <form className="self-end" action={() => {}}>
          <FavButtonIcon is_fav={is_fav} />
        </form>
      </div>
    </div>
  );
}
