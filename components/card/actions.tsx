'use client';

import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';

import { addToFav } from 'app/actions/bookmarks';

import { cn } from 'lib/utils';

import { BookmarkModifiedType, Tag } from 'types/data';

import Loader from '../loader';
import AddTag from './add-tag';
import TagBadge from './tag-badge';

function FavButtonIcon({ is_fav }: { is_fav: BookmarkModifiedType['is_fav'] }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={cn(
        `rounded-full flex w-9 h-9 hover:bg-yellow-100 active:bg-yellow-100 max-sm:flex items-center justify-center mr-2`
      )}
    >
      {pending ? (
        <Loader className="text-neutral-600 h-4 w-4" />
      ) : is_fav ? (
        <StarFilledIcon className="h-4 w-4 text-yellow-500 " />
      ) : (
        <StarIcon className="h-4 w-4 text-neutral-600" />
      )}
    </button>
  );
}

export default function CardActions({
  data,
  tags,
}: {
  data: BookmarkModifiedType;
  tags: Tag[];
}) {
  const { is_fav } = data;
  return (
    <div className="justify-between mb-2 flex items-center w-full">
      <div className="tracking-wide items-center text-neutral-500 text-xs gap-2 flex w-full">
        <AddTag data={data} tags={tags} />
        <TagBadge data={data} />
      </div>
      <div className="flex">
        <form
          className="self-end"
          action={async () => {
            await addToFav(data.id, !data.is_fav);
          }}
        >
          <FavButtonIcon is_fav={is_fav} />
        </form>
      </div>
    </div>
  );
}
