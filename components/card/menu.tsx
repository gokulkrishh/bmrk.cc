'use client';

import { useState } from 'react';

import { UpdateIcon } from '@radix-ui/react-icons';
import { Edit, Link, Share, StarIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { deleteBookmark, refreshBookmark } from 'app/actions/bookmarks';
import { getOg } from 'app/actions/og';
import { incrementBookmarkUsage } from 'app/actions/user';

import { MoreIcon } from 'components/icons';
import EditBookmark from 'components/modal/edit-bookmark';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import { refreshInChromeExt } from 'lib/chrome-extension';
import { cn } from 'lib/utils';

import { BookmarkModified, BookmarkUpdate, MetaTags } from 'types/data';

type CardMenuProps = {
  data: BookmarkModified;
  className?: string;
  onDone?: () => void;
  isSearch?: boolean;
};

export default function CardMenu({
  data,
  className,
  onDone,
  isSearch,
}: CardMenuProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { url, id } = data;

  const onRefresh = async () => {
    try {
      setLoading(true);
      const ogData: MetaTags = await getOg(url);
      const payload: BookmarkUpdate = {
        metadata: {
          ...((data.metadata as object) || {}),
          image: ogData.image,
          is_fallback: ogData.is_fallback,
        },
      };
      if (!data.title) {
        payload.title = ogData.title;
      }
      if (!data.description) {
        payload.description = ogData.description;
      }
      await refreshBookmark(id, payload);
      onDone?.();
      refreshInChromeExt();
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
      await incrementBookmarkUsage(-1);
      await deleteBookmark(id);
      onDone?.();
      refreshInChromeExt();
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

  const onFav = async () => {
    try {
      setLoading(true);
      const payload: BookmarkUpdate = {
        is_fav: !data.is_fav,
      };
      await refreshBookmark(id, payload);
      onDone?.();
      toast.success(
        `Bookmark ${!data.is_fav ? 'added' : 'removed'} as favorite.`,
      );
    } catch {
      toast.error('Unable to add as favorite, try again.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Menu"
          className={cn(
            `cursor-pointer h-9 w-9 mt-1 flex items-center justify-center transition-colors rounded-full hover:bg-accent hover:border hover:border-input active:bg-accent shrink-0`,
            className,
          )}
        >
          <MoreIcon className="fill-muted-foreground !h-4 !w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 max-sm:min-w-44 min-w-40">
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
            <Link className="h-4 w-4  mr-2.5" /> Copy link
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await onRefresh();
            }}
          >
            <UpdateIcon className="h-4 w-4  mr-2.5" /> Refresh
          </DropdownMenuItem>
          {isSearch ? (
            <DropdownMenuItem
              disabled={loading}
              onClick={async () => {
                await onFav();
              }}
            >
              <StarIcon className="h-4 w-4  mr-2.5" />{' '}
              {data.is_fav ? 'Remove' : 'Add'} favorite
            </DropdownMenuItem>
          ) : null}
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
            className="!text-red-600 focus:bg-red-100 active:bg-red-100 dark:focus:bg-red-300 dark:active:bg-red-300"
          >
            <Trash2Icon className="h-4 w-4  mr-2.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {open ? (
        <EditBookmark
          onDone={onDone}
          data={data}
          open={open}
          setOpen={setOpen}
        />
      ) : null}
    </>
  );
}
