import { getBookmarks } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import CardList from 'components/card-list';
import Header from 'components/header';

import { filterByTagName } from 'lib/data';
import createSupabaseServerClient from 'lib/supabase/server';

import { BookmarkModified } from 'types/data';

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

const fetcher = async (from: number, to: number, tagName: string) => {
  'use server';
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select(`*, bookmarks_tags (tags!inner (id,name))`)
    .order('created_at', { ascending: false })
    .range(from, to)
    .returns<BookmarkModified[]>();

  if (error) {
    return [];
  }

  return filterByTagName(data, tagName);
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [bookmarks, tags] = await Promise.all([
    await getBookmarks(),
    await getTags(),
  ]);

  const filteredBookmarks = filterByTagName(bookmarks, slug);

  return (
    <>
      <Header headerText={`Tag: ${slug}`} />
      <div className="h-full border-r border-neutral-200 pb-24">
        <CardList
          slug={slug}
          bookmarks={filteredBookmarks}
          fetcher={fetcher}
          tags={tags}
        />
      </div>
    </>
  );
}
