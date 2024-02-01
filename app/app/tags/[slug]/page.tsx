import { getBookmarks } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import Card from 'components/card';
import Header from 'components/header';

import { filterByTagName, groupByDate } from 'lib/data';
import { cn } from 'lib/utils';

import { BookmarkModifiedType } from 'types/data';

const title = 'Bookmark it.';
const description = 'Bookmark manager for the modern web.';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: tagName } = params;

  return {
    title: `${title} | Tag: ${tagName}`,
    description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug: tagName } = params;
  const [bookmarks, tags] = await Promise.all([
    await getBookmarks(),
    await getTags(),
  ]);

  const groupedBookmarks = groupByDate(filterByTagName(bookmarks, tagName));

  return (
    <>
      <Header headerText={`Tag: ${tagName}`} />
      <div className="h-full border-r border-neutral-200 pb-24">
        {Object.values(groupedBookmarks)
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
