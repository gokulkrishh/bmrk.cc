import { getBookmarksWithFilter } from 'app/actions/bookmarks';
import { BookmarkModified } from 'types/data';

import Card from 'components/card';
import Header from 'components/header';

export default async function Page() {
  const bookmarks = await getBookmarksWithFilter({ is_fav: true });

  return (
    <>
      <Header headerText="Favorites" />
      <div className="min-h-dvh border-r border-neutral-200">
        {bookmarks.map((bookmark: BookmarkModified) => (
          <Card key={bookmark.id} data={bookmark} />
        ))}
      </div>
    </>
  );
}
