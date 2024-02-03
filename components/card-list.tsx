'use client';

import { motion } from 'framer-motion';

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
    <div className="h-full border-neutral-200 pb-24">
      {Object.keys(data).map((dateKey: string) => {
        const bookmarksData = data[dateKey];
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.25, 0.25, 0, 1],
            }}
            className={cn(`flex flex-col w-full`, {
              'border-b border-neutral-200': bookmarks.length > 0,
            })}
            key={dateKey}
          >
            {bookmarksData.map((bookmark: BookmarkModified) => (
              <Card key={bookmark.id} tags={tags} data={bookmark} />
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}
