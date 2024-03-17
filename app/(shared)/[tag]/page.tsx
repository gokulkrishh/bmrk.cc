import { getSharedBookmarks } from 'app/actions/shared';

import { EmptyBookmarkSharedState, PublicIcon } from 'components/icons';

import { groupByDate } from 'lib/data';

import Card from './card';
import Header from './header';

const title = 'Bookmark it.';
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience';

type MetadataType = {
  params: { tag: string };
};

export const revalidate = 3600;

export async function generateMetadata({ params }: MetadataType) {
  const { tag } = params;
  console.log('params', params);

  return {
    title: `${title} | Shared ${decodeURIComponent(tag)}`,
    description,
  };
}

export default async function Page({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const hash = decodeURIComponent(tag);
  const bookmarks = await getSharedBookmarks(hash);
  const data = groupByDate(bookmarks);
  const tagName = bookmarks[0]?.bookmarks_tags?.map((tag) => tag.tags.name);

  return (
    <>
      <Header
        data={bookmarks}
        headerText={`Tag: ${tagName}`}
        icon={<PublicIcon className="h-3 w-3 relative -top-0.5" />}
      />
      <div className="h-full sm:border-r sm:border-border pb-24">
        {bookmarks?.length ? (
          <Card bookmarksLength={bookmarks.length} data={data} />
        ) : (
          <EmptyBookmarkSharedState />
        )}
      </div>
    </>
  );
}
