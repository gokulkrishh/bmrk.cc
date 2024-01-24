'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import { cn } from 'lib/utils';

import { useAuth } from './context/auth';
import AddBookmark from './modal/bookmark';
import SignupModal from './modal/signup';
import { Dialog, DialogContent } from './ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function AddIcon({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'rounded-full flex justify-center p-2.5 max-sm:p-3.5 text-white bg-blue-600 hover:bg-blue-500',
          className
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Plus className="text-white w-6 h-6" />
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center ml-4">
            Add{' '}
            <kbd className="pointer-events-none ml-1.5 border border-black inline-flex h-4 select-none items-center gap-1 rounded  px-1 font-mono text-[10px] font-medium text-black opacity-100">
              A
            </kbd>
          </TooltipContent>
        </Tooltip>
      </button>

      {user ? (
        <AddBookmark open={open} setOpen={setOpen} />
      ) : (
        <SignupModal open={open} onHide={setOpen} />
      )}
    </div>
  );
}
