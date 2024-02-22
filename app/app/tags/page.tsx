import Link from 'next/link';

import { getBookmarks } from 'app/actions/bookmarks';
import { getTags, getTagsWithBookmarkIds } from 'app/actions/tags';

import CardList from 'components/card-list';
import Header from 'components/header';
import { EmptyTagsState } from 'components/icons';
import DeleteTag from 'components/tag/delete-tag';
import EditTag from 'components/tag/edit-tag';
import { Badge } from 'components/ui/badge';

const title = 'Bookmark it. | Tags';
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience';

export const metadata = {
  title,
  description,
};

export default async function Page() {
  const [bookmarks, tags, groupedByTagId] = await Promise.all([
    await getBookmarks(),
    await getTags(),
    await getTagsWithBookmarkIds(),
  ]);

  return (
    <>
      <Header headerText="Tags" />
      <div className="min-h-dvh sm:border-r border-border pb-24">
        {tags.length ? (
          <div className="flex flex-row gap-2 items-end px-4 max-h-[8rem] overflow-y-scroll scrollbar flex-wrap py-3 border-b border-border">
            {tags.map(({ id, name }) => (
              <div key={id} className="inline-flex w-auto items-center">
                <Link
                  className="flex rounded-full items-center w-auto hover:bg-accent/80 dark:hover:bg-accent dark:active:bg-accent transition-colors focus:bg-accent/80"
                  href={`/tags/${name}`}
                >
                  <Badge className="font-normal py-1.5" variant="secondary">
                    {name}
                    <span className="font-medium ml-1">
                      ({groupedByTagId[id]?.length ?? 0})
                    </span>
                  </Badge>
                </Link>
                <EditTag id={id} name={name} />
                <DeleteTag id={id} />
              </div>
            ))}
          </div>
        ) : null}
        <>
          {bookmarks.length ? (
            <CardList bookmarks={bookmarks} tags={tags} />
          ) : (
            <EmptyTagsState />
          )}
        </>
      </div>
    </>
  );
}
