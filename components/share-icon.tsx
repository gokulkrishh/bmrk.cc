'use client';

import { useState } from 'react';

import { urls } from 'config';
import { Link } from 'lucide-react';
import { toast } from 'sonner';

import { Tag } from 'types/data';

import { SharePublicIcon, SharedPublicIcon } from './icons';
import ShareModal from './modal/share';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function ShareIcon({
  className,
  tag,
}: {
  className?: string;
  tag: Tag | null;
}) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const hasShared = tag?.shared;

  if (!tag) {
    return null;
  }

  return (
    <div className="flex gap-2 mr-3">
      {hasShared ? (
        <Tooltip>
          <TooltipTrigger
            onClick={() => {
              navigator.clipboard.writeText(
                `${urls.shared}/${encodeURIComponent(tag.shared_hash ?? '')}`,
              );
              toast.success('Sharable link is copied to clipboard');
            }}
            className="rounded-full flex w-8 h-8 hover:bg-accent active:bg-accent items-center justify-center"
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
      ) : null}
      <Tooltip delayDuration={300}>
        <TooltipTrigger
          onClick={() => {
            setOpenModal(true);
          }}
          className="rounded-full flex w-8 h-8 hover:bg-accent active:bg-accent items-center justify-center"
        >
          {tag.shared ? (
            <SharedPublicIcon className="h-5 w-5 shrink-0" />
          ) : (
            <SharePublicIcon className="h-5 w-5 shrink-0" />
          )}
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-white dark:text-black max-w-[300px]"
        >
          Share this tag and its bookmarks publicly
        </TooltipContent>
      </Tooltip>
      {openModal ? (
        <ShareModal tag={tag} open={openModal} onHide={setOpenModal} />
      ) : null}
    </div>
  );
}
