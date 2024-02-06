import Link from 'next/link';

import { Badge } from 'components/ui/badge';

import { BookmarkModified, Tag } from 'types/data';

export default function TagBadge({ data }: { data: BookmarkModified }) {
  return (
    <div className="flex gap-y-1.5 items-center overflow-x-scroll max-sm:max-w-[200px] max-w-[350px] w-full hidden-scrollbar mask-start-and-end">
      {data?.bookmarks_tags?.map(({ tags: { id, name } }) => {
        return (
          <Link
            className="border transition-colors focus:bg-accent/80 hover:bg-accent/80 dark:hover:bg-accent dark:active:bg-accent rounded-full mr-2"
            key={id}
            href={`/tags/${name}`}
          >
            <Badge
              className="font-normal transition-colors bg-primary-foreground py-1 w-max"
              variant="secondary"
            >
              {name}
            </Badge>
          </Link>
        );
      })}
    </div>
  );
}
