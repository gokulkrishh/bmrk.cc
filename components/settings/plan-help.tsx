'use client';

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { TooltipTrigger } from '@radix-ui/react-tooltip';

import { Tooltip, TooltipContent } from 'components/ui/tooltip';

export default function PlanTooltip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <QuestionMarkCircledIcon className="w-4 h-4 ml-1.5 cursor-pointer text-muted-foreground" />
      </TooltipTrigger>
      <TooltipContent side="top" className="text-white dark:text-black">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
