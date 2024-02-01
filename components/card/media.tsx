import Image from 'next/image';
import Link from 'next/link';

import { BookmarkModifiedType } from 'types/data';

const blurDataURL = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWGhoYrwEMwAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=`;

export default function CardMedia({ data }: { data: BookmarkModifiedType }) {
  const imageUrl =
    data?.metadata?.twitterImageUrl ||
    data?.metadata?.ogImageUrl ||
    data?.metadata?.imageUrl;

  if (!imageUrl?.length) {
    return null;
  }

  return (
    <Link
      className="group w-fit max-sm:max-w-[calc(100%-30px)] max-w-[calc(100%-16px)] max-h-[185px] mb-2 rounded-2xl"
      target="_blank"
      rel="noopener"
      href={`${data.url}?utm_source=bmrk.cc`}
      prefetch={false}
    >
      <Image
        className="h-full rounded-2xl border border-neutral-200"
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
