'use client';

import { useState } from 'react';

import { Info } from 'lucide-react';

import { useUser } from 'components/context/user';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { isProPlanExpired } from 'lib/data';
import { cn } from 'lib/utils';

export default function FeatureToolip({
  className,
  text,
}: {
  className?: string;
  text?: string;
}) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const isPlanExpired = isProPlanExpired(user);

  if (!isPlanExpired) return null;

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        className={cn(`cursor-pointer`, className)}
        onClick={() => {
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
        }}
        asChild
      >
        <Info className="w-3.5 h-3.5 ml-2 text-muted-foreground" />
      </TooltipTrigger>
      <TooltipContent side="top" className="text-white dark:text-black">
        {text ?? 'This feature is available only in Pro plan.'}
      </TooltipContent>
    </Tooltip>
  );
  return null;
}
