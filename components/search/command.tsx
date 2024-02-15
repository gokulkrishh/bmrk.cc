'use client';

import { memo, useCallback, useEffect, useState } from 'react';

import { StarFilledIcon } from '@radix-ui/react-icons';
import humanizeUrl from 'humanize-url';

import { getBookmarks } from 'app/actions/bookmarks';

import CardFavicon from 'components/card/favicon';
import CardMenu from 'components/card/menu';
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

import { Bookmark, BookmarkModified } from 'types/data';

type SearchCommandProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function SearchCommand({ open, setOpen }: SearchCommandProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BookmarkModified[]>([]);
  const [shouldRender, setShouldRender] = useState(false);

  const getAllBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBookmarks();
      setData(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllBookmarks();
  }, [getAllBookmarks, shouldRender]);

  const openBookmark = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search bookmarks" />
      <CommandList>
        <CommandGroup heading="All Bookmarks">
          {loading ? (
            <CommandLoading>
              <div className="flex justify-center my-6">
                <Loader />
              </div>
            </CommandLoading>
          ) : null}
          {data.map((bookmark: Bookmark) => {
            return (
              <CommandItem
                className="flex flex-col items-start w-full"
                onSelect={() => {
                  openBookmark(`${bookmark.url}?utm_source=bmrk.cc`);
                }}
                key={`${bookmark.id}`}
                value={`${bookmark.title}-${bookmark.url}`}
              >
                <div className="flex gap-2 items-start text-pimary-foreground w-full">
                  <CardFavicon
                    className="bg-background"
                    url={`${bookmark.url}?utm_source=bmrk.cc`}
                    title={bookmark.title ?? ''}
                  />
                  <div className="flex flex-col">
                    <p className="relative -top-0.5">{bookmark.title}</p>
                    <div className="text-xs flex max-w-[400px] items-center mt-0.5 w-full text-muted-foreground">
                      {bookmark.is_fav ? (
                        <StarFilledIcon className="!w-3 !h-3 text-yellow-500 shrink-0 mr-1" />
                      ) : null}
                      <span className="block w-full tracking-wide max-sm:max-w-[250px] truncate">
                        {humanizeUrl(bookmark.url)}
                      </span>
                    </div>
                  </div>
                  <CommandShortcut
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    className="flex items-center flex-col justify-center gap-0 -right-1 relative -top-2"
                  >
                    <CardMenu
                      className="mt-0"
                      onDone={() => setShouldRender(!shouldRender)}
                      data={bookmark as BookmarkModified}
                      isSearch
                    />
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
