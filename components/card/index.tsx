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
};

export default function Card({ data, tags }: CardProps) {
  return (
    <div
      className={cn(
        `justify-between group gap-3 flex hover:bg-neutral-50 text-black w-full`,
      )}
    >
      <CardDate data={data} />
      <CardTimeline url={data.url} title={data.title} />
      <div className="w-full flex flex-col">
        <div className="flex w-full justify-between">
          <CardInfo data={data} />
          <CardMenu data={data} />
        </div>
        <CardMedia data={data} />
        <CardActions tags={tags} data={data} />
      </div>
    </div>
  );
}
