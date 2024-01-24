import Image from 'next/image';
import Link from 'next/link';

import { BookmarkModified } from 'types/data';

const blurDataURL = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWGhoYrwEMwAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=`;

export default function CardMedia({ data }: { data: BookmarkModified }) {
  const imageUrl =
    data?.metadata?.ogImageUrl ||
    data?.metadata?.twitterImageUrl ||
    data?.metadata?.imageUrl;

  if (!imageUrl?.length) {
    return null;
  }

  return (
    <Link
      className="group w-[calc(100%-16px)] max-h-[185px] mb-3 my-2"
      target="_blank"
      rel="noopener"
      href={data.url}
      prefetch={false}
    >
      <Image
        className="rounded-2xl border border-neutral-200 object-cover h-full"
        src={imageUrl.startsWith('/') ? `${data.url}${imageUrl}` : imageUrl}
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
