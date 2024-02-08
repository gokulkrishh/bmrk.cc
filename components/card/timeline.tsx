import { cn } from 'lib/utils';

import { BookmarkModified } from 'types/data';

import CardFavicon from './avatar';

type CardTimelineProps = {
  url: BookmarkModified['url'];
  title: BookmarkModified['title'];
};

export default function CardTimeline({ url, title }: CardTimelineProps) {
  return (
    <div className="w-2 border-l border-border">
      <span
        className={cn(
          `w-4 h-4 shrink-0 relative left-[-8.5px] top-[12px] rounded-full bg-blue-transparent text-white inline-flex items-center justify-center`,
        )}
      >
        <CardFavicon className="bg-background" url={url} title={title ?? ''} />
      </span>
    </div>
  );
}
