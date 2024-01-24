import { BookmarkModified } from 'types/data';

import AddBookmarkInput from 'components/bookmark/add-input';
import Card from 'components/card';
import Header from 'components/header';

import { getBookmarks } from './actions/bookmarks';

export default async function Page() {
  const bookmarks = await getBookmarks();

  return (
    <>
      <Header />
      <AddBookmarkInput />
      <div className="min-h-dvh border-r border-neutral-200">
        {bookmarks.map((bookmark: BookmarkModified) => (
          <Card key={bookmark.id} data={bookmark} />
        ))}
      </div>
    </>
  );
}
