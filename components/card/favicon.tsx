'use client';

import { cn } from 'lib/utils';

type CardFaviconProps = {
  url: string;
  title: string;
  className?: string;
};

export default function CardFavicon({
  url,
  title,
  className,
}: CardFaviconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      loading="lazy"
      src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=128`}
      alt={title}
      width={16}
      height={16}
      className={cn('rounded-full w-4 h-4', className)}
    />
  );
}
