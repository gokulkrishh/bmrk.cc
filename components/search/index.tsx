'use client';

import { useState } from 'react';

import { SearchIcon } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import { useAuth } from 'components/context/auth';
import SignupModal from 'components/modal/signup';
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
    { keyup: true }
  );

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'p-2.5 inline-block rounded-xl transition-colors text-center text-neutral-900 hover:bg-neutral-200',
          className
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <SearchIcon className="w-6 h-6 text-neutral-900" />
          </TooltipTrigger>
          <TooltipContent side={'right'} className="flex items-center ml-4">
            Search{' '}
            <kbd className="pointer-events-none ml-1.5 border border-black inline-flex h-4 select-none items-center gap-1 rounded  px-1 font-mono text-[10px] font-medium text-black opacity-100">
              K
            </kbd>
          </TooltipContent>
        </Tooltip>
      </button>

      {user ? (
        <SearchCommand open={open} setOpen={setOpen} />
      ) : (
        <SignupModal open={open} onHide={setOpen} />
      )}
    </>
  );
}
