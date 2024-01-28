import { getFavBookmarks } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import Card from 'components/card';
import Header from 'components/header';

import { groupByDate } from 'lib/data';
import { cn } from 'lib/utils';

import { BookmarkModifiedType } from 'types/data';

export default async function Page() {
  const [bookmarks, tags] = await Promise.all([
    await getFavBookmarks(),
    await getTags(),
  ]);
  const groupedBookmarks = groupByDate(bookmarks);

  return (
    <>
      <Header headerText="Favorites" />
      <div className="h-full border-r border-neutral-200 pb-24">
        {Object.values(groupedBookmarks)
          .reverse()
          .map((bookmarksData: BookmarkModifiedType[], index: number) => {
            return (
              <div
                className={cn(`flex flex-col w-full`, {
                  'border-b border-neutral-200': bookmarksData.length > 1,
                })}
                key={index}
              >
                {bookmarksData.map((bookmark: BookmarkModifiedType) => (
                  <Card
                    last={index === bookmarksData.length - 1}
                    key={bookmark.id}
                    tags={tags}
                    data={bookmark}
                  />
                ))}
              </div>
            );
          })}
      </div>
    </>
  );
}
