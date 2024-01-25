import { getAllFavBookmarks } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import Card from 'components/card';
import Header from 'components/header';

import { BookmarkModified } from 'types/data';

export default async function Page() {
  const bookmarks = await getAllFavBookmarks();
  const tags = await getTags();

  return (
    <>
      <Header headerText="Favorites" />
      <div className="min-h-dvh border-r border-neutral-200 pb-24">
        {bookmarks.map((bookmark: any) => (
          <Card tags={tags} key={bookmark.id} data={bookmark} />
        ))}
      </div>
    </>
  );
}
