'use client';

import { useState } from 'react';

import { PublicShareIcon } from './icons';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export const PublicIconWithTooltip = ({
  className,
}: {
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
        }}
      >
        <PublicShareIcon className={className} />
      </TooltipTrigger>
      <TooltipContent>This tag has been shared publically</TooltipContent>
    </Tooltip>
  );
};
