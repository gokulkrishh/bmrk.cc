'use client';

import { useState } from 'react';

import { urls } from 'config';
import { Link } from 'lucide-react';
import { toast } from 'sonner';

import { Tag } from 'types/data';

import { SharePublicIcon } from './icons';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function ShareIcon({
  className,
  tag,
}: {
  className?: string;
  tag: Tag;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2 mr-3">
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            navigator.clipboard.writeText(`${urls.shared}/${tag.public_hash}`);
            toast.success('Link copied to clipboard');
          }}
          className="rounded-full flex w-8 h-8 hover:bg-accent active:bg-accent max-sm:flex items-center justify-center"
        >
          <Link className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-400" />
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-white dark:text-black max-w-[300px]"
        >
          Copy publicly shareable link
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={300} open={open} onOpenChange={setOpen}>
        <TooltipTrigger className="rounded-full flex w-8 h-8 hover:bg-accent active:bg-accent max-sm:flex items-center justify-center">
          <SharePublicIcon className="h-5 w-5 shrink-0" />
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-white dark:text-black max-w-[300px]"
        >
          Share this tag and its bookmarks publicly
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
