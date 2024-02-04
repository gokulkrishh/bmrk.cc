'use client';

import { groupByDate } from 'lib/data';
import { cn } from 'lib/utils';

import { BookmarkModified, Tag } from 'types/data';

import Card from './card';

type CardListProps = {
  bookmarks: BookmarkModified[];
  tags: Tag[];
};

export default function CardList({ bookmarks, tags }: CardListProps) {
  const data = groupByDate(bookmarks);

  return (
    <div className="h-full border-border pb-24">
      {Object.keys(data).map((dateKey: string) => {
        const bookmarksData = data[dateKey];
        return (
          <div
            className={cn(`flex flex-col w-full`, {
              'border-b border-border': bookmarks.length > 0,
            })}
            key={dateKey}
          >
            {bookmarksData.map((bookmark: BookmarkModified) => (
              <Card key={bookmark.id} tags={tags} data={bookmark} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
