import { BookmarkModified } from 'types/data';

import CardActions from './actions';
import CardDate from './date';
import CardInfo from './info';
import CardMedia from './media';
import CardMenu from './menu';
import CardTimeline from './timeline';

export default function Card({ data }: { data: BookmarkModified }) {
  return (
    <div className="justify-between group gap-3 flex hover:bg-neutral-50 text-black w-full">
      <CardDate data={data} />
      <CardTimeline url={data.url} title={data.title} />
      <div className="w-full flex flex-col">
        <div className="flex w-full justify-between">
          <CardInfo data={data} />
          <CardMenu id={data.id} url={data.url} />
        </div>
        <CardMedia data={data} />
        <CardActions data={data} />
      </div>
    </div>
  );
}
