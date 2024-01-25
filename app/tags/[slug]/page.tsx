import { getBookmarksWithFilter } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import Card from 'components/card';
import Header from 'components/header';

import { groupByDate } from 'lib/data';
import { cn } from 'lib/utils';

import { BookmarkModified } from 'types/data';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug: tagName } = params;
  const bookmarks = await getBookmarksWithFilter(tagName);
  const tags = await getTags();
  const groupedBookmarks = groupByDate(bookmarks);

  return (
    <>
      <Header />
      <div className="h-full border-r border-neutral-200 pb-24">
        {Object.keys(groupedBookmarks)
          .reverse()
          .map((groupKey: any, index: number) => {
            const bookmarksData: BookmarkModified[] =
              groupedBookmarks[groupKey];
            return (
              <div
                className={cn(`flex flex-col w-full`, {
                  'border-b border-neutral-200': bookmarks.length > 1,
                })}
                key={index}
              >
                {bookmarksData.reverse().map((bookmark: BookmarkModified) => (
                  <Card key={bookmark.id} tags={tags} data={bookmark} />
                ))}
              </div>
            );
          })}
      </div>
    </>
  );
}
