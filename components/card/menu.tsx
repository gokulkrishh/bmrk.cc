'use client';

import { useState } from 'react';

import { Edit, LinkIcon, RotateCcw, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { deleteBookmark, refreshBookmark } from 'app/actions/bookmarks';
import { getOg } from 'app/actions/og';

import { MoreIcon } from 'components/icons';
import EditBookmark from 'components/modal/edit-bookmark';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import {
  BookmarkInsertModified,
  BookmarkModifiedType,
  BookmarkUpdate,
} from 'types/data';

type CardMenuProps = {
  data: BookmarkModifiedType;
};

export default function CardMenu({ data }: CardMenuProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { url, id } = data;

  const onRefresh = async () => {
    try {
      setLoading(true);
      const ogData = await getOg(url);
      const payload: BookmarkUpdate = {
        metadata: {
          ogImageUrl: ogData['og:image'] ?? '',
          twitterImageUrl: ogData['og:twitter'] ?? '',
        },
      };
      await refreshBookmark(id, payload);
      toast.success('Bookmark refreshed.');
    } catch {
      toast.error('Unable to refresh, try again.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteBookmark(id);
      toast.success('Bookmark is deleted.');
    } catch {
      toast.error('Unable to delete, try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pr-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer h-9 w-9 mt-1 flex items-center justify-center rounded-full hover:bg-neutral-200 outline-none focus:border-none focus:outline-none active:bg-neutral-200 shrink-0">
          <MoreIcon className="fill-neutral-600 h-4 w-4 " />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 min-w-40">
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
            disabled={loading}
          >
            <Edit className="h-4 w-4  mr-2.5" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success('Link copied to clipboard.');
            }}
          >
            <LinkIcon className="h-4 w-4  mr-2.5" /> Copy link
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await onRefresh();
            }}
          >
            <RotateCcw className="h-4 w-4  mr-2.5" /> Refresh
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await onDelete();
            }}
            className="!text-red-600 focus:bg-red-100 active:bg-red-100"
          >
            <Trash className="h-4 w-4  mr-2.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {open ? <EditBookmark data={data} open={open} setOpen={setOpen} /> : null}
    </div>
  );
}
