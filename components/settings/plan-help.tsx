'use client';

import { useState } from 'react';

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { TooltipTrigger } from '@radix-ui/react-tooltip';

import { Tooltip, TooltipContent } from 'components/ui/tooltip';

export default function PlanTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        onClick={() => {
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
        }}
        asChild
      >
        <QuestionMarkCircledIcon className="w-4 h-4 ml-1.5 cursor-pointer text-muted-foreground" />
      </TooltipTrigger>
      <TooltipContent side="top" className="text-white dark:text-black">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
