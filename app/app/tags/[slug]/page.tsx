import { getBookmarksForTag } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import CardList from 'components/card-list';
import Header from 'components/header';

import { filterByTagName } from 'lib/data';

const title = 'Bookmark it.';
const description = 'Bookmark manager for the modern web.';

type MetadataType = {
  params: { slug: string };
};

export async function generateMetadata({ params }: MetadataType) {
  const { slug: tagName } = params;
  return {
    title: `${title} | Tag: ${tagName}`,
    description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [bookmarks, tags] = await Promise.all([
    await getBookmarksForTag(slug),
    await getTags(),
  ]);

  const filteredBookmarks = filterByTagName(bookmarks, slug);

  return (
    <>
      <Header headerText={`Tag: ${slug}`} />
      <div className="h-full sm:border-r border-border pb-24">
        <CardList bookmarks={filteredBookmarks} tags={tags} />
      </div>
    </>
  );
}
