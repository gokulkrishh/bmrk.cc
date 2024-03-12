// import { getSharedBookmarks } from 'app/actions/shared';
// import { checkSharedUser, getSharedBookmarksByTag } from 'app/actions/shared';
import Header from './header';

const title = 'Bookmark it.';
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience';

type MetadataType = {
  params: { slug: string };
};

export async function generateMetadata({ params }: MetadataType) {
  const { slug } = params;
  return {
    title: `${title} | Shared ${decodeURIComponent(slug)}`,
    description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const userId = decodeURIComponent(slug);

  return (
    <>
      <Header />
      <div className="h-full sm:border-r border-border pb-24"></div>
    </>
  );
}
