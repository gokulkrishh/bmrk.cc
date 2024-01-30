import { formatDate } from 'lib/date';

import { BookmarkModifiedType } from 'types/data';

export default function CardDate({ data }: { data: BookmarkModifiedType }) {
  const date = formatDate(data.created_at);
  const isToday = new Date().getDate() === new Date(data.created_at).getDate();
  return (
    <div className="w-16 pt-3.5 pl-2 shrink-0 flex flex-col font-medium text-center text-[11px] text-neutral-500 ">
      <span>{isToday ? 'Today' : date}</span>
    </div>
  );
}
