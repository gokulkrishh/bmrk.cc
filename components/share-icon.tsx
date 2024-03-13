'use client';

import { useState } from 'react';

import { SharePublicIcon } from './icons';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function ShareIcon({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip delayDuration={300} open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        className="rounded-full flex w-8 h-8 hover:bg-accent active:bg-accent max-sm:flex items-center justify-center mr-3"
        onClick={() => {
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
        }}
      >
        <SharePublicIcon className="h-5 w-5 shrink-0" />
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="text-white dark:text-black max-w-[300px]"
      >
        Share this tag and its bookmarks publicly
      </TooltipContent>
    </Tooltip>
  );
}
