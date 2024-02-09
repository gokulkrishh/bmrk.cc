import { cn } from 'lib/utils';

import { BookmarkModified, Tag } from 'types/data';

import CardActions from './actions';
import CardDate from './date';
import CardInfo from './info';
import CardMedia from './media';
import CardMenu from './menu';
import CardTimeline from './timeline';

type CardProps = {
  data: BookmarkModified;
  tags: Tag[];
  className?: string;
};

export default function Card({ data, tags, className }: CardProps) {
  return (
    <div
      className={cn(
        `justify-between group gap-3 transition-colors flex hover:bg-secondary/70 dark:hover:bg-secondary/20 text-primary w-full`,
        className,
      )}
    >
      <CardDate data={data} />
      <CardTimeline url={data.url} title={data.title} />
      <div className="w-full flex flex-col">
        <div className="flex w-full justify-between">
          <CardInfo data={data} />
          <div className="pr-2">
            <CardMenu data={data} />
          </div>
        </div>
        <CardMedia data={data} />
        <CardActions tags={tags} data={data} />
      </div>
    </div>
  );
}
