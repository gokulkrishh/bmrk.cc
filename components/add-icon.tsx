'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import { cn } from 'lib/utils';

import { useAuth } from './context/auth';
import AddBookmark from './modal/add-bookmark';
import AccountModal from './modal/signup';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function AddIcon({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { authUser } = useAuth();

  useHotkeys(['a'], (_, handler) => {
    const keys = handler.keys?.join('');
    if (keys === 'a') setOpen(true);
  });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            aria-label="Add"
            onClick={() => setOpen(true)}
            className={cn(
              'rounded-full flex justify-center p-2 max-sm:p-3 text-white bg-blue-600 hover:bg-blue-500',
              className,
            )}
          >
            <Plus className="text-white w-6 h-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="flex items-center ml-4 font-medium text-white dark:text-black"
        >
          Add{' '}
          <kbd className="pointer-events-none ml-2 border dark:text-black text-white border-input inline-flex h-4 select-none items-center gap-1 rounded  px-1 font-mono text-[10px] font-medium text-primary opacity-100">
            A
          </kbd>
        </TooltipContent>
      </Tooltip>

      {open ? (
        authUser ? (
          <AddBookmark open={open} onHide={setOpen} />
        ) : (
          <AccountModal open={open} onHide={setOpen} />
        )
      ) : null}
    </>
  );
}
