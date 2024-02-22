import Link from 'next/link';

import { Badge } from 'components/ui/badge';

import { cn } from 'lib/utils';

import { BookmarkModified } from 'types/data';

export default function TagBadge({
  data,
  avoidHover,
  className,
}: {
  data: BookmarkModified;
  avoidHover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-y-1.5 items-center overflow-x-scroll max-sm:max-w-[200px] max-w-[350px] w-full hidden-scrollbar mask-start-and-end ${className}`}
    >
      {data?.bookmarks_tags?.map(({ tags: { id, name } }) => {
        return (
          <Link
            className="border hover:bg-accent/80 dark:hover:bg-accent dark:active:bg-accent transition-colors focus:bg-accent/80 rounded-full mr-2"
            key={id}
            href={`/tags/${name}`}
          >
            <Badge
              className={cn(
                'font-normal transition-all bg-primary-foreground py-1 w-max',
                {
                  'hover:bg-primary-foreground cursor-default': avoidHover,
                },
              )}
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
