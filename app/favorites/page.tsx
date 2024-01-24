import { getBookmarksWithFilter } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import Card from 'components/card';
import Header from 'components/header';

import { BookmarkModified } from 'types/data';

export default async function Page() {
  const bookmarks = await getBookmarksWithFilter({ is_fav: true });
  const tags = await getTags();

  return (
    <>
      <Header headerText="Favorites" />
      <div className="min-h-dvh border-r border-neutral-200">
        {bookmarks.map((bookmark: BookmarkModified) => (
          <Card tags={tags} key={bookmark.id} data={bookmark} />
        ))}
      </div>
    </>
  );
}
