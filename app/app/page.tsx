import { getTags } from 'app//actions/tags';
import { getBookmarks } from 'app/actions/bookmarks';

import AddBookmarkInput from 'components/bookmark/add-input';
import CardList from 'components/card-list';
import Header from 'components/header';

export default async function Page() {
  const [bookmarks, tags] = await Promise.all([
    await getBookmarks(),
    await getTags(),
  ]);

  return (
    <>
      <Header />
      <AddBookmarkInput btnClassname="mx-2" showUpload />
      <div className="h-full border-r border-neutral-200 pb-24">
        <CardList bookmarks={bookmarks} tags={tags} />
      </div>
    </>
  );
}
