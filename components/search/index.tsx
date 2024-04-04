'use client';

import { useState } from 'react';

import { useHotkeys } from 'react-hotkeys-hook';

import { useAuth } from 'components/context/auth';
import { SearchIcon as Search } from 'components/icons';
import AccountModal from 'components/modal/signup';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { cn } from 'lib/utils';

import SearchCommand from './command';

export default function SearchIcon({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { authUser } = useAuth();

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
      <Tooltip>
        <TooltipTrigger className="text-primary" asChild>
          <button
            aria-label="Search"
            onClick={() => setOpen(!open)}
            className={cn(
              'p-2.5 inline-block rounded-xl transition-colors text-primary/50 text-center hover:text-primary hover:bg-accent group',
              className,
            )}
          >
            <Search className="w-6 h-6 text-pimary-foreground group-hover:scale-95 duration-150 transition-transform" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side={'right'}
          className="flex items-center ml-4 text-white dark:text-black"
        >
          Search{' '}
          <kbd className="pointer-events-none ml-2 border dark:text-black text-white border-input inline-flex h-4 select-none items-center gap-1 rounded px-1 font-mono text-[10px] font-medium text-primary opacity-100">
            K
          </kbd>
        </TooltipContent>
      </Tooltip>

      {open ? (
        authUser ? (
          <SearchCommand open={true} setOpen={setOpen} />
        ) : (
          <AccountModal open={true} onHide={setOpen} />
        )
      ) : null}
    </>
  );
}
