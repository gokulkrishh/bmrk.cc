import { BookmarkModified } from 'types/data';

import { formatDate } from 'lib/date';

export default function CardDate({ data }: { data: BookmarkModified }) {
  return (
    <div className="w-16 pt-2.5 pl-2 shrink-0 flex flex-col font-medium text-center text-[11px] text-neutral-500 ">
      <span>{formatDate(data.created_at)}</span>
    </div>
  );
}
