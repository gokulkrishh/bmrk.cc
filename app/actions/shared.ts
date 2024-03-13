'use server';

import { notFound } from 'next/navigation';

import { urls } from 'config';

import { BookmarkModified, Tag } from 'types/data';

export const getSharedBookmarks = async (hash: string) => {
  const data = await fetch(
    `${urls.nonAppApi}/shared/bookmarks?hash=${encodeURIComponent(hash)}`,
    {
      cache: 'no-cache',
    },
  );
  if (data.status === 429) {
    throw new Error('ratelimitexceeded');
  }
  if (data.status === 404) {
    notFound();
  }
  if (!data.ok) {
    return [] as BookmarkModified[];
  }
  return (await data.json()) as BookmarkModified[];
};
