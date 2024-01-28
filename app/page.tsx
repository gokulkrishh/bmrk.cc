import AddBookmarkInput from 'components/bookmark/add-input';
import Card from 'components/card';
import Header from 'components/header';

import { groupByDate, groupByKey } from 'lib/data';
import { cn } from 'lib/utils';

import { BookmarkModifiedType } from 'types/data';

import { getBookmarks } from './actions/bookmarks';
import { getTags } from './actions/tags';

export default async function Page() {
  const [bookmarks, tags] = await Promise.all([
    await getBookmarks(),
    await getTags(),
  ]);
  const bookmarksByDate = groupByDate(bookmarks);

  return (
    <>
      <Header />
      <AddBookmarkInput btnClassname="mx-2" />
      <div className="h-full border-r border-neutral-200 pb-24">
        {Object.values(bookmarksByDate)
          .reverse()
          .map((bookmarksData: BookmarkModifiedType[], index: number) => {
            return (
              <div
                className={cn(`flex flex-col w-full`, {
                  'border-b border-neutral-200': bookmarksData.length > 0,
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
