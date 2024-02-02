'use client';

import { cn } from 'lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type CardAvatarProps = {
  url: string;
  title: string;
  className?: string;
};

export default function CardAvatar({ url, title, className }: CardAvatarProps) {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage
        src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=128`}
        alt={title}
      />
      <AvatarFallback />
    </Avatar>
  );
}
