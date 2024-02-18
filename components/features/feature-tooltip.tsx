'use client';

import { Info } from 'lucide-react';

import { useUser } from 'components/context/user';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { isProPlan } from 'lib/data';

export default function FeatureToolip({ className }: { className?: string }) {
  const { user } = useUser();
  const isFeatureEnabled = isProPlan(user);

  if (isFeatureEnabled) return null;

  return (
    <Tooltip>
      <TooltipTrigger className={className}>
        <Info className="w-3.5 h-3.5 ml-2" />
      </TooltipTrigger>
      <TooltipContent>This feature is available on Pro plan.</TooltipContent>
    </Tooltip>
  );
  return null;
}
