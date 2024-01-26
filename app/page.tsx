import { useMemo } from 'react';

import AddBookmarkInput from 'components/bookmark/add-input';
import Card from 'components/card';
import Header from 'components/header';

import { groupByDate } from 'lib/data';
import { cn } from 'lib/utils';

import { Bookmark, BookmarkModifiedType } from 'types/data';

import { getBookmarks } from './actions/bookmarks';
import { getTags } from './actions/tags';

export default async function Page() {
  const bookmarks = await getBookmarks();
  const tags = await getTags();
  const groupedBookmarks = groupByDate(bookmarks);

  return (
    <>
      <Header />
      <AddBookmarkInput btnClassname="mx-2" />
      <div className="h-full border-r border-neutral-200 pb-24">
        {Object.keys(groupedBookmarks)
          .reverse()
          .map((groupKey: any, index: number) => {
            const bookmarksData: BookmarkModifiedType[] =
              groupedBookmarks[groupKey];
            return (
              <div
                className={cn(`flex flex-col w-full`, {
                  'border-b border-neutral-200': bookmarks.length > 1,
                })}
                key={index}
              >
                {bookmarksData.map((bookmark: BookmarkModifiedType) => (
                  <Card key={bookmark.id} tags={tags} data={bookmark} />
                ))}
              </div>
            );
          })}
      </div>
    </>
  );
}
