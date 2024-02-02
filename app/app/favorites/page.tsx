import { getFavBookmarks } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import CardList from 'components/card-list';
import Header from 'components/header';

const title = 'Bookmark it. | Favorites';
const description = 'Bookmark manager for the modern web.';

export const metadata = {
  title,
  description,
};

export default async function Page() {
  const [bookmarks, tags] = await Promise.all([
    await getFavBookmarks(),
    await getTags(),
  ]);

  return (
    <>
      <Header headerText="Favorites" />
      <div className="h-full border-r border-neutral-200 pb-24">
        <CardList bookmarks={bookmarks} tags={tags} />
      </div>
    </>
  );
}
