import { getTags } from 'app//actions/tags';
import { getBookmarks } from 'app/actions/bookmarks';

import AddBookmarkInput from 'components/bookmark/add-input';
import CardList from 'components/card-list';
import Header from 'components/header';
import { EmptyBookmarkState } from 'components/icons';

export const revalidate = 3600;

export default async function Page() {
  const [bookmarks, tags] = await Promise.all([
    await getBookmarks(),
    await getTags(),
  ]);

  return (
    <>
      <Header />
      <AddBookmarkInput className="px-3" btnClassname="relative top-3" />
      <div className="h-full sm:border-r border-border pb-24">
        {bookmarks.length ? (
          <CardList bookmarks={bookmarks} tags={tags} />
        ) : (
          <EmptyBookmarkState />
        )}
      </div>
    </>
  );
}
