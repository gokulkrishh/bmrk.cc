'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import debounce from 'debounce';
import { motion } from 'framer-motion';

import { groupByDate } from 'lib/data';
import { cn } from 'lib/utils';

import { BookmarkModified, Tag } from 'types/data';

import Card from './card';
import CardSkeleton from './card/skeleton';

type CardListProps = {
  bookmarks: BookmarkModified[];
  tags: Tag[];
  fetcher: (
    from: number,
    to: number,
    slug?: string,
  ) => Promise<BookmarkModified[]>;
  slug?: string;
};

const PAGE_SIZE = 20;

export default function CardList({
  bookmarks: bookmarksFromProps,
  tags,
  fetcher,
  slug,
}: CardListProps) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(1);
  const [isInView, setIsInView] = useState(false);
  const [bookmarks, setBookmarks] = useState(bookmarksFromProps);
  const [loading, setLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const bookmarksGroupByDate = Object.values(groupByDate(bookmarks));

  const handleScroll = useCallback(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current as HTMLElement;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView(() => bottom - 1000 <= innerHeight);
    }
  }, []);

  const fetchAllBookmarks = async (offset: number) => {
    const from = offset * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    return await fetcher(from, to, slug);
  };

  const loadMoreBookmarks = async (offset: number) => {
    try {
      setLoading(true);
      setOffset((prev) => prev + 1);
      const data = await fetchAllBookmarks(offset);
      if (data.length < PAGE_SIZE) {
        setIsLast(true);
      }
      setBookmarks((prev) => [...prev, ...data]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInView) {
      loadMoreBookmarks(offset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  useEffect(() => {
    if (bookmarks.length < PAGE_SIZE) {
      setLoading(false);
      setIsLast(true);
    }
    setTimeout(() => setLoading(true), 1000);
    const handleDebouncedScroll = debounce(
      () => !isLast && handleScroll(),
      200,
    );
    window.addEventListener('scroll', handleDebouncedScroll);
    return () => {
      window.removeEventListener('scroll', handleDebouncedScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="h-full border-neutral-200 pb-24">
      {bookmarksGroupByDate.map((bookmarks: any, index: number) => {
        const recalculatedDelay =
          index >= PAGE_SIZE * 2
            ? (index - PAGE_SIZE * (offset - 1)) / 15
            : index / 15;

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.25, 0, 1],
              delay: recalculatedDelay,
            }}
            className={cn(`flex flex-col w-full`, {
              'border-b border-neutral-200': bookmarks.length > 0,
            })}
            key={index}
          >
            {bookmarks.map((bookmark: BookmarkModified) => (
              <Card key={bookmark.id} tags={tags} data={bookmark} />
            ))}
          </motion.div>
        );
      })}
      {loading && !isLast ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.25, 0, 1],
              delay: 0,
            }}
          >
            <CardSkeleton />
            <CardSkeleton />
          </motion.div>
        </>
      ) : null}
    </div>
  );
}
