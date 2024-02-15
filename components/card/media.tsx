'use client';

import { useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import humanizeUrl from 'humanize-url';

import { BookmarkModified } from 'types/data';

const blurDataURL = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWGhoYrwEMwAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=`;

export default function CardMedia({ data }: { data: BookmarkModified }) {
  const ref = useRef<HTMLImageElement>(null);

  if (!data.metadata?.image) {
    return null;
  }

  const url = new URL(data.url);
  url.searchParams.append('utm_source', 'bmrk.cc');

  return (
    <Link
      className="group relative w-fit mt-2 max-sm:max-w-[calc(100%-30px)] max-w-[calc(100%-16px)] max-h-[185px] mb-2 rounded-2xl"
      target="_blank"
      rel="noopener"
      href={url.href}
      prefetch={false}
    >
      <Image
        ref={ref}
        className="h-full rounded-2xl max-sm:w-full border border-border"
        src={data.metadata?.image}
        alt={data.title ?? ''}
        width={350}
        height={180}
        loading="lazy"
        placeholder="blur"
        onLoad={() => {}}
        onError={() => {
          if (ref.current?.src) {
            ref.current.src = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${data.url}&size=128`;
            ref.current.style.objectFit = 'scale-down';
          }
        }}
        blurDataURL={blurDataURL}
        style={{
          maxWidth: '100%',
          objectFit: data.metadata?.is_fallback ? 'none' : 'cover',
        }}
      />
      <span className="bg-black/50 text-[11px] w-fit tracking-wide text-white flex p-0.5 px-1 rounded-md absolute bottom-2 left-2">
        {humanizeUrl(url.hostname)}
      </span>
    </Link>
  );
}
