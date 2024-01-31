import { getTags } from 'app//actions/tags';
import { getBookmarks } from 'app/actions/bookmarks';

import AddBookmarkInput from 'components/bookmark/add-input';
import Card from 'components/card';
import Header from 'components/header';

import { groupByDate } from 'lib/data';
import { cn } from 'lib/utils';

import { BookmarkModifiedType } from 'types/data';

export default async function Page() {
  const [bookmarks, tags] = await Promise.all([
    await getBookmarks(),
    await getTags(),
  ]);
  const bookmarksByDate = groupByDate(bookmarks);

  return (
    <>
      <Header />
      <AddBookmarkInput btnClassname="mx-2" showUploadIcon />
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
