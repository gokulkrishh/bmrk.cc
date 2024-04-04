import { useState } from 'react';

import { TagsIcon } from 'components/icons';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';

import { cn } from 'lib/utils';

import { BookmarkModified, Tag } from 'types/data';

import TagList from './tag-list';

type AddTagProps = {
  data: BookmarkModified;
  tags: Tag[];
};

export default function AddTag({ data, tags }: AddTagProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      onOpenChange={(isOpen: boolean) => {
        setOpen(isOpen);
      }}
    >
      <PopoverTrigger asChild>
        <button
          aria-label="tags"
          className={cn(
            `flex items-center -ml-1.5 border border-transparent justify-center gap-1 rounded-full shrink-0 w-9 h-9 hover:bg-blue-800/20 dark:hover:bg-blue-800/30 active:bg-blue-800/20 dark:active:bg-blue-800/30 dark:hover:border-blue-800/30 hover:border-blue-800/20`,
            { '!opacity-100': open },
          )}
        >
          <TagsIcon className="w-4 h-4 text-blue-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52 bg-background rounded-lg shadow-2xl p-0">
        <TagList tags={tags} data={data} />
      </PopoverContent>
    </Popover>
  );
}
