import { memo, useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

import { StarFilledIcon } from '@radix-ui/react-icons';
import { Command as CommandPrimitive } from 'cmdk';
import humanizeUrl from 'humanize-url';

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
  CommandPrimitiveLoading,
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

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div cmdk-raycast-top-shine></div>
      <CommandInput
        value={search}
        onValueChange={onValueChange}
        placeholder="Search bookmarks"
      />
      <CommandList>
        {loading ? (
          <CommandPrimitiveLoading>
            <div className="flex justify-center my-6">
              <Loader />
            </div>
          </CommandPrimitiveLoading>
        ) : (
          <>
            {result.length ? (
              <CommandGroup heading="All Bookmarks">
                {result.map((bookmark: Bookmark) => (
                  <CommandItem
                    className="flex flex-col items-start w-full"
                    onSelect={() => {
                      openBookmark(bookmark.url);
                    }}
                    key={bookmark.id}
                  >
                    <Link
                      className="flex gap-2 items-start text-pimary-foreground w-full"
                      prefetch={false}
                      target="_blank"
                      rel="noopener"
                      href={bookmark.url}
                    >
                      <CardAvatar
                        className="!w-4 !h-4 rounded-full bg-background"
                        url={bookmark.url}
                        title={bookmark.title ?? ''}
                      />{' '}
                      <div className="flex flex-col">
                        <p className="relative -top-0.5">{bookmark.title}</p>
                        <div className="text-xs flex items-center mt-0.5 text-muted-foreground">
                          {bookmark.is_fav ? (
                            <StarFilledIcon className="!h-3 !w-3 -ml-1 text-yellow-500 mr-1" />
                          ) : null}
                          {humanizeUrl(bookmark.url)}
                        </div>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No bookmarks.</CommandEmpty>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}

export default memo(SearchCommand);
