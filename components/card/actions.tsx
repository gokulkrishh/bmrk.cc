'use client';

import { startTransition, useOptimistic } from 'react';

import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import { addToFav } from 'app/actions/bookmarks';

import { useUser } from 'components/context/user';

import { cn } from 'lib/utils';

import { BookmarkModified, Tag } from 'types/data';

import AddTag from './add-tag';
import TagBadge from './tag-badge';

function FavButtonIcon({ is_fav }: { is_fav: BookmarkModified['is_fav'] }) {
  const { pending } = useFormStatus();
  return (
    <button
      aria-label="favorite"
      type="submit"
      className={cn(
        `rounded-full transition-all group/fav flex w-9 h-9 items-center justify-center mr-2`,
      )}
    >
      {is_fav ? (
        <StarFilledIcon className="h-4 w-4 text-yellow-500 animate-circle-done" />
      ) : (
        <StarIcon className="h-4 w-4 text-muted-foreground group-hover/fav:text-muted-foreground" />
      )}
    </button>
  );
}

type CardActionsType = {
  data: BookmarkModified;
  tags: Tag[];
};

export default function CardActions({ data, tags }: CardActionsType) {
  const { user, currentPlan } = useUser();
  const [optimisticData, setOptimisticData] =
    useOptimistic<BookmarkModified>(data);

  return (
    <div className="justify-between mb-2 flex items-center w-full">
      <div className="tracking-wide items-center text-muted-foreground text-xs gap-2 flex w-full">
        <AddTag data={data} tags={tags} />
        <TagBadge data={data} />
      </div>
      <div className="flex">
        <form
          className="self-end"
          action={async () => {
            if (
              user?.usage.favorites >= currentPlan.limit.favorites &&
              !optimisticData.is_fav
            ) {
              toast.error(`Favorites limit reached! Upgrade to add more.`);
              return;
            }
            startTransition(() =>
              setOptimisticData({
                ...optimisticData,
                is_fav: !optimisticData.is_fav,
              }),
            );
            await addToFav(optimisticData.id, !optimisticData.is_fav);
          }}
        >
          <FavButtonIcon is_fav={optimisticData.is_fav} />
        </form>
      </div>
    </div>
  );
}
