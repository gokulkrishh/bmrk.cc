'use client';

import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';

import { Skeleton } from 'components/ui/skeleton';

import SettingsCard from './settings-card';

export default function SettingSkeleton() {
  return (
    <SettingsCard className="h-[86px] px-3">
      <div className="flex gap-3 w-full items-center">
        <div className="font-medium text-pimary-foreground uppercase rounded-full flex  justify-center items-center h-6 w-6 p-6 text-xl bg-accent">
          G
        </div>
        <div className="grid max-w-sm w-full">
          <div className="font-medium truncate pr-4">
            <Skeleton className="w-52 h-5 bg-accent mb-1.5" />
          </div>
          <div className="text-sm truncate pr-4 text-muted-foreground">
            <Skeleton className="w-36 h-5 bg-accent" />
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}
