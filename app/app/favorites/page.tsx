import { getFavBookmarks } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import CardList from 'components/card-list';
import Header from 'components/header';

import createSupabaseServerClient from 'lib/supabase/server';

import { BookmarkModified } from 'types/data';

const title = 'Bookmark it. | Favorites';
const description = 'Bookmark manager for the modern web.';

export const metadata = {
  title,
  description,
};

const fetcher = async (from: number, to: number) => {
  'use server';
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select(`*, bookmarks_tags (tags!inner (id,name))`)
    .eq('is_fav', true)
    .range(from, to)
    .order('created_at', { ascending: false })
    .returns<BookmarkModified[]>();

  if (error) {
    return [];
  }
  return data;
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
        <CardList bookmarks={bookmarks} tags={tags} fetcher={fetcher} />
      </div>
    </>
  );
}
