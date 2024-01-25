import Link from 'next/link';

import { Edit2 } from 'lucide-react';

import { getBookmarks } from 'app/actions/bookmarks';
import { getTags, getTagsWithBookmarkIds } from 'app/actions/tags';

import Card from 'components/card';
import Header from 'components/header';
import DeleteTag from 'components/tag/delete-tag';
import EditTag from 'components/tag/edit-tag';
import { Badge } from 'components/ui/badge';

import { groupByDate } from 'lib/data';
import { cn } from 'lib/utils';

import { BookmarkModifiedType } from 'types/data';

export default async function Page() {
  const tags = await getTags();
  const bookmarks = await getBookmarks();
  const groupedBookmarks = groupByDate(bookmarks);
  const groupedByTagId = await getTagsWithBookmarkIds();

  return (
    <>
      <Header headerText="Tags" />
      <div className="min-h-dvh border-r border-neutral-200 pb-24">
        <div className="flex gap-x-3 gap-y-2 items-end px-4 flex-wrap py-3">
          {tags.length
            ? tags.map(({ id, name }) => (
                <div key={id} className="inline-flex items-center">
                  <Link className="flex items-center" href={`/tags/${name}`}>
                    <Badge variant="secondary">
                      {name} ({groupedByTagId[id]?.length ?? 0})
                    </Badge>
                  </Link>
                  <EditTag id={id} name={name} />
                  <DeleteTag id={id} />
                </div>
              ))
            : null}
        </div>
        {tags.length ? (
          <div className="border-b border-neutral-200 flex w-full pt-1" />
        ) : null}
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
                {bookmarksData
                  .reverse()
                  .map((bookmark: BookmarkModifiedType) => (
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
