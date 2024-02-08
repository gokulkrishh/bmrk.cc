import Image from 'next/image';
import Link from 'next/link';

import { BookmarkModified } from 'types/data';

const blurDataURL = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWGhoYrwEMwAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=`;

function isAbsolutePath(path: string) {
  // write a regex to check if the path is an absolute URL
  const regex = /^(http|https):\/\//;
  return regex.test(path);
}

export default function CardMedia({ data }: { data: BookmarkModified }) {
  const imageUrl = data.metadata?.ogImage ?? data.metadata?.twitterImage;

  if (!imageUrl?.length) {
    return null;
  }

  const url = new URL(data.url);
  url.searchParams.append('utm_source', 'bmrk.cc');

  return (
    <Link
      className="group w-fit mt-2 max-sm:max-w-[calc(100%-30px)] max-w-[calc(100%-16px)] max-h-[185px] mb-2 rounded-2xl"
      target="_blank"
      rel="noopener"
      href={url.href}
      prefetch={false}
    >
      <Image
        className="h-full rounded-2xl border border-border"
        src={isAbsolutePath(imageUrl) ? imageUrl : `${data.url}/${imageUrl}`}
        alt={data.title ?? ''}
        width={350}
        height={180}
        loading="lazy"
        placeholder={blurDataURL}
        style={{ maxWidth: '100%', objectFit: 'cover' }}
      />
    </Link>
  );
}
