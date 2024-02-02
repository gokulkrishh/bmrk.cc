import Link from 'next/link';

import { Badge } from 'components/ui/badge';

import { BookmarkModified, Tag } from 'types/data';

export default function TagBadge({ data }: { data: BookmarkModified }) {
  return (
    <div className="flex gap-y-1.5 items-center overflow-x-scroll max-sm:max-w-[200px] max-w-[350px] w-full hidden-scrollbar mask-start-and-end">
      {data.bookmarks_tags
        .sort((a: any, b: any) => a.tags.name.localeCompare(b.tags.name))
        .map(({ tags: { id, name } }) => {
          return (
            <Link
              className="active:bg-neutral-300 rounded-full mr-2"
              key={id}
              href={`/tags/${name}`}
            >
              <Badge className="font-normal py-1 w-max" variant="secondary">
                {name}
              </Badge>
            </Link>
          );
        })}
    </div>
  );
}
