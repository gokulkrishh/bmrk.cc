import Link from 'next/link';

import { Bookmark } from 'types/data';

export default function CardInfo({ data }: { data: Bookmark }) {
  return (
    <Link
      title={data.title ?? ''}
      target="_blank"
      rel="noopener"
      href={`${data.url}?utm_source=bmrk.cc`}
      prefetch={false}
      className="group items-start justify-between flex-col py-2 mt-1 pt-1.5 gap-1 flex hover:bg-neutral-50 text-black w-[calc(100%-60px)]"
    >
      <p className="relative items-center inline-flex text-[15px]">
        {data.title ?? new URL(data.url)?.hostname?.replace('www.', '')}
      </p>
      <p
        className="text-neutral-500 text-sm line-clamp-3 max-w-sm"
        title={data.description ?? ''}
      >
        {data.description}
      </p>
    </Link>
  );
}
