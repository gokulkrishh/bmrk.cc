'use client';

import { useState } from 'react';

import { SearchIcon } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import { useAuth } from 'components/context/auth';
import AccountModal from 'components/modal/signup';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { cn } from 'lib/utils';

import SearchCommand from './command';

export default function Search({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useHotkeys(
    ['k'],
    (_, handler) => {
      const keys = handler.keys?.join('');
      if (keys === 'k') setOpen(true);
    },
    { keyup: true },
  );

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'p-2.5 inline-block rounded-xl transition-colors text-center hover:bg-accent-foreground/10 group',
          className,
        )}
      >
        <Tooltip>
          <TooltipTrigger className="text-primary" asChild>
            <SearchIcon className="w-6 h-6 text-pimary-foreground group-hover:scale-95 duration-150 transition-transform" />
          </TooltipTrigger>
          <TooltipContent side={'right'} className="flex items-center ml-4">
            Search{' '}
            <kbd className="pointer-events-none ml-2 border border-input inline-flex h-4 select-none items-center gap-1 rounded px-1 font-mono text-[10px] font-medium text-primary opacity-100">
              K
            </kbd>
          </TooltipContent>
        </Tooltip>
      </button>

      {open ? (
        user ? (
          <SearchCommand open={true} setOpen={setOpen} />
        ) : (
          <AccountModal open={true} onHide={setOpen} />
        )
      ) : null}
    </>
  );
}
