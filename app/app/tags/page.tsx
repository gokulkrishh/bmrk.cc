import Link from 'next/link';

import { getBookmarks } from 'app/actions/bookmarks';
import { getTags, getTagsWithBookmarkIds } from 'app/actions/tags';

import CardList from 'components/card-list';
import Header from 'components/header';
import { EmptyTagsState, PublicShareIcon } from 'components/icons';
import SharePopover from 'components/popover/share';
import { PublicIconWithTooltip } from 'components/public-icon-with-tooltip';
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
          <div className="flex flex-col mask-start-and-end snap-x gap-2 px-4 pr-5 max-h-40 overflow-y-hidden flex-wrap py-3 border-b border-border">
            {tags.map((tag) => {
              const { id, name } = tag;
              return (
                <Badge
                  className="font-normal min-w-20 border bg-none snap-start overflow-hidden p-0"
                  key={id}
                  variant="outline"
                >
                  <Link
                    className="flex min-w-14 w-full pl-2 pr-2 h-7 rounded-none items-center hover:bg-accent/80 dark:hover:bg-accent/50 dark:active:bg-accent transition-colors focus:bg-accent/80"
                    href={`/tags/${name}`}
                  >
                    {name}
                    <span className="font-medium ml-1">
                      ({groupedByTagId[id]?.length ?? 0})
                    </span>
                  </Link>
                  <div className="border-l border-border flex items-center">
                    {tag.shared ? (
                      <SharePopover
                        className="!py-1 px-2 !w-7 !h-7 !rounded-none text-xs mr-0"
                        tag={tag}
                      >
                        <PublicShareIcon className="w-4 h-4 shrink-0" />
                      </SharePopover>
                    ) : null}
                    <EditTag id={id} name={name} />
                    <DeleteTag id={id} name={name} />
                  </div>
                </Badge>
              );
            })}
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
