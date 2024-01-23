'use client';

import { cn } from 'lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type CardAvatarProps = {
  url: string;
  title: string;
  className?: string;
};

export default function CardAvatar({ url, title, className }: CardAvatarProps) {
  let imageUrl: any = url;

  try {
    imageUrl = new URL(url);
  } catch {
    imageUrl = url;
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage
        src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${imageUrl?.origin ?? url}&size=32`}
        alt={title}
      />
      <AvatarFallback />
    </Avatar>
  );
}
