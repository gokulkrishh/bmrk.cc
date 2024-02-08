'use client';

import { useState } from 'react';

import { UpdateIcon } from '@radix-ui/react-icons';
import { Copy, Edit, LinkIcon, Share, Trash2Icon } from 'lucide-react';
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

import { BookmarkModified, BookmarkUpdate, MetaTags } from 'types/data';

type CardMenuProps = {
  data: BookmarkModified;
};

export default function CardMenu({ data }: CardMenuProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { url, id } = data;

  const onRefresh = async () => {
    try {
      setLoading(true);
      const ogData: MetaTags = await getOg(url);
      const payload: BookmarkUpdate = {
        metadata: {
          ogImage: ogData.ogImage,
          twitterImage: ogData.twitterImage,
        },
      };

      if (!payload.description) {
        payload.description =
          ogData.description ??
          ogData.ogDescription ??
          ogData.twitterDescription ??
          '';
      }
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

  const siteUrl = new URL(url);
  siteUrl.searchParams.append('utm_source', 'bmrk.cc');

  const share = async () => {
    try {
      const shareData = {
        text: data.description ?? '',
        title: data.title ?? '',
        url: siteUrl.href,
      };
      await navigator?.share(shareData);
    } catch (error) {
      console.log('Sharing failed!', error);
    }
  };

  return (
    <div className="pr-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer h-9 w-9 mt-1 flex items-center justify-center transition-colors rounded-full hover:bg-accent hover:border hover:border-input active:bg-accent shrink-0">
          <MoreIcon className="fill-muted-foreground h-4 w-4 " />
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
            <Copy className="h-4 w-4  mr-2.5" /> Copy link
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await onRefresh();
            }}
          >
            <UpdateIcon className="h-4 w-4  mr-2.5" /> Refresh
          </DropdownMenuItem>
          {typeof window !== 'undefined' && navigator && !!navigator?.share ? (
            <DropdownMenuItem
              onClick={async () => {
                await share();
              }}
            >
              <Share className="h-4 w-4  mr-2.5" /> Share
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await onDelete();
            }}
            className="!text-red-600 focus:bg-red-100 active:bg-red-100 dark:focus:bg-red-200 dark:active:bg-red-200"
          >
            <Trash2Icon className="h-4 w-4  mr-2.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {open ? <EditBookmark data={data} open={open} setOpen={setOpen} /> : null}
    </div>
  );
}
