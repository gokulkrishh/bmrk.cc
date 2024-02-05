import Link from 'next/link';

import { Bookmark } from 'types/data';

export default function CardInfo({ data }: { data: Bookmark }) {
  const url = new URL(data.url);
  url.searchParams.append('utm_source', 'bmrk.cc');
  return (
    <Link
      title={data.title ?? ''}
      target="_blank"
      rel="noopener"
      href={url}
      prefetch={false}
      className="group items-start justify-between flex-col py-2 mt-1 pt-1.5 gap-1 flex text-pimary-foreground w-[calc(100%-60px)]"
    >
      <p className="relative items-center text-primary inline-flex text-[15px]">
        {data.title ?? new URL(data.url)?.hostname?.replace('www.', '')}
      </p>
      <p
        className="text-muted-foreground text-sm line-clamp-3 max-w-sm"
        title={data.description ?? ''}
      >
        {data.description}
      </p>
    </Link>
  );
}
