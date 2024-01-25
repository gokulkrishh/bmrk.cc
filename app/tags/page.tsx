import Link from 'next/link';

import { getBookmarks } from 'app/actions/bookmarks';
import { getTags } from 'app/actions/tags';

import Header from 'components/header';
import { Badge } from 'components/ui/badge';

export default async function Page() {
  const bookmarks = await getBookmarks();
  const tags = await getTags();
  return (
    <>
      <Header headerText="Tags" />
      <div className="min-h-dvh border-r border-neutral-200 pb-24">
        <div className="flex gap-x-3 gap-y-2 items-end px-4 flex-wrap py-3">
          {tags.length
            ? tags.map(({ id, name }) => (
                <div key={id} className="inline-flex items-center">
                  <Link className="mr-1" href={`/tags/${name}`}>
                    <Badge variant="secondary">{name}</Badge>
                  </Link>
                </div>
              ))
            : null}
        </div>
        {tags.length ? (
          <div className="border-b border-neutral-200 flex w-full pt-1" />
        ) : null}
      </div>
    </>
  );
}
