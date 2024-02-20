import { getBookmarksForTag } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import CardList from 'components/card-list';
import Header from 'components/header';
import { EmptyTagState } from 'components/icons';

import { filterByTagName } from 'lib/data';

const title = 'Bookmark it.';
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience';

type MetadataType = {
  params: { slug: string };
};

export async function generateMetadata({ params }: MetadataType) {
  const { slug } = params;
  return {
    title: `${title} | Tag: ${decodeURIComponent(slug)}`,
    description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const tagName = decodeURIComponent(slug);
  const [bookmarks, tags] = await Promise.all([
    await getBookmarksForTag(tagName),
    await getTags(),
  ]);

  const filteredBookmarks = filterByTagName(bookmarks, tagName);

  return (
    <>
      <Header headerText={`Tag: ${tagName}`} />
      <div className="h-full sm:border-r border-border pb-24">
        {bookmarks.length ? (
          <CardList bookmarks={filteredBookmarks} tags={tags} />
        ) : (
          <EmptyTagState />
        )}
      </div>
    </>
  );
}
