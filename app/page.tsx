import AddBookmarkInput from 'components/bookmark/add-input';
import Card from 'components/card';
import Header from 'components/header';

import { BookmarkModified } from 'types/data';

import { getBookmarks } from './actions/bookmarks';
import { getTags } from './actions/tags';

export default async function Page() {
  const bookmarks = await getBookmarks();
  const tags = await getTags();

  return (
    <>
      <Header />
      <AddBookmarkInput />
      <div className="min-h-dvh border-r border-neutral-200">
        {bookmarks.map((bookmark: BookmarkModified) => (
          <Card key={bookmark.id} tags={tags} data={bookmark} />
        ))}
      </div>
    </>
  );
}
