'use client';

import { memo, useCallback, useEffect, useState } from 'react';

import { StarFilledIcon } from '@radix-ui/react-icons';
import humanizeUrl from 'humanize-url';
import { Check, CopyIcon, ShareIcon } from 'lucide-react';

import { getBookmarks } from 'app/actions/bookmarks';

import CardAvatar from 'components/card/avatar';
import Loader from 'components/loader';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandShortcut,
} from 'components/ui/command';

import { Bookmark } from 'types/data';

type SearchCommandProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function SearchCommand({ open, setOpen }: SearchCommandProps) {
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [result, setResult] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<Bookmark['id'] | null>(null);

  const getAllBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBookmarks();
      setResult(data ?? []);
      setBookmarks(data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllBookmarks();
  }, [getAllBookmarks]);

  const onValueChange = (value: string) => {
    if (!value.length) {
      setResult(bookmarks);
    } else {
      const filtered = bookmarks.filter((bookmark: Bookmark) => {
        const searchValue = value.toLowerCase();
        return (
          bookmark?.title?.toLowerCase().includes(searchValue) ||
          bookmark?.url?.toLowerCase().includes(searchValue)
        );
      });
      setResult(filtered);
    }
    setSearch(value);
  };

  const openBookmark = (url: string) => {
    window.open(url, '_blank');
  };

  const share = async (bookmark: Bookmark, url: URL) => {
    try {
      const shareData = {
        text: bookmark.description ?? '',
        title: bookmark.title ?? '',
        url: url.href,
      };
      await navigator?.share(shareData);
    } catch (error) {
      console.log('Sharing failed!', error);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        value={search}
        onValueChange={onValueChange}
        placeholder="Search bookmarks"
      />
      <CommandList>
        <CommandGroup heading="All Bookmarks">
          {loading ? (
            <CommandLoading>
              <div className="flex justify-center my-6">
                <Loader />
              </div>
            </CommandLoading>
          ) : null}
          {result.map((bookmark: Bookmark) => {
            const url = new URL(bookmark.url);
            url.searchParams.append('utm_source', 'bmrk.cc');
            return (
              <CommandItem
                className="flex flex-col items-start w-full"
                onSelect={() => {
                  openBookmark(url.href);
                }}
                key={bookmark.id}
              >
                <div className="flex gap-2 items-start text-pimary-foreground w-full">
                  <CardAvatar
                    className="!w-4 !h-4 rounded-full bg-background"
                    url={url.href}
                    title={bookmark.title ?? ''}
                  />
                  <div className="flex flex-col">
                    <p className="relative -top-0.5">{bookmark.title}</p>
                    <div className="text-xs flex items-center mt-0.5 text-muted-foreground">
                      {bookmark.is_fav ? (
                        <StarFilledIcon className="!h-3 !w-3 -ml-1 text-yellow-500 mr-1" />
                      ) : null}
                      {humanizeUrl(bookmark.url)}
                    </div>
                  </div>
                  <CommandShortcut className="flex items-center justify-center gap-0 -right-1 relative -top-2">
                    <button
                      className="rounded-xl active:opacity-50 p-2"
                      onClick={async (event) => {
                        event.stopPropagation();
                        setCopiedId(bookmark.id);
                        await navigator.clipboard.writeText(url.href);
                        setTimeout(() => {
                          setCopiedId(null);
                        }, 1000);
                      }}
                    >
                      {copiedId === bookmark.id ? (
                        <Check className="!w-4 !h-4 text-green-600 dark:text-green-600" />
                      ) : (
                        <CopyIcon className="!w-4 !h-4 text-black dark:text-white" />
                      )}
                    </button>
                    {!!navigator?.share ? (
                      <button
                        className="rounded-xl active:opacity-50 p-2"
                        onClick={async (event) => {
                          event.stopPropagation();
                          await share(bookmark, url);
                        }}
                      >
                        <ShareIcon className="!w-4 !h-4 text-black dark:text-white" />
                      </button>
                    ) : null}
                  </CommandShortcut>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandEmpty>No result.</CommandEmpty>
      </CommandList>
    </CommandDialog>
  );
}

export default memo(SearchCommand);
