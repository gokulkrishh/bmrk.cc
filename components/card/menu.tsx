'use client';

import { deleteBookmark } from 'app/actions/bookmarks';
import { Edit, LinkIcon, RotateCcw, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { BookmarkModified } from 'types/data';

import { MoreIcon } from 'components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

type CardMenuProps = {
  id: BookmarkModified['id'];
  url: BookmarkModified['url'];
};

export default function CardMenu({ url, id }: CardMenuProps) {
  return (
    <div className="pr-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer h-9 w-9 mt-1 flex items-center justify-center rounded-full hover:bg-neutral-200 outline-none focus:border-none focus:outline-none active:bg-neutral-200 shrink-0">
          <MoreIcon className="fill-neutral-500 h-4 w-4 " />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 min-w-40">
          <DropdownMenuItem>
            <Edit className="h-4 w-4  mr-2.5" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success('Link copied.');
            }}
          >
            <LinkIcon className="h-4 w-4  mr-2.5" /> Copy link
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RotateCcw className="h-4 w-4  mr-2.5" /> Refresh
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              await deleteBookmark(id);
            }}
            className="!text-red-600 focus:bg-red-100"
          >
            <Trash className="h-4 w-4  mr-2.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
