'use client';

import { memo, useCallback, useEffect, useState } from 'react';

import { StarFilledIcon } from '@radix-ui/react-icons';
import humanizeUrl from 'humanize-url';

import { getBookmarks } from 'app/actions/bookmarks';

import CardFavicon from 'components/card/favicon';
import CardMenu from 'components/card/menu';
import TagBadge from 'components/card/tag-badge';
import Loader from 'components/loader';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
  CommandShortcut,
} from 'components/ui/command';
import { Dialog, DialogContent } from 'components/ui/dialog';

import { BookmarkModified } from 'types/data';

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 top-[30%] shadow-lg max-sm:max-w-[calc(100%-16px)]">
        <Command
          filter={(value, search, keywords) => {
            const extendValue = value + ' ' + keywords?.join(' ');
            if (
              extendValue
                ?.toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Search by bookmarks or tags" />
          <CommandList className="w-full">
            <CommandGroup heading="All Bookmarks">
              {loading ? (
                <CommandItem className="w-full justify-center flex items-center">
                  <CommandLoading>
                    <div className="flex justify-center my-6">
                      <Loader />
                    </div>
                  </CommandLoading>
                </CommandItem>
              ) : null}
              {data.map((bookmark: BookmarkModified) => {
                const tags = bookmark.bookmarks_tags.map(
                  ({ tags: { name } }) => name,
                );
                return (
                  <CommandItem
                    className="flex flex-col items-start w-full"
                    onSelect={() => {
                      openBookmark(`${bookmark.url}?utm_source=bmrk.cc`);
                    }}
                    key={`${bookmark.id}`}
                    keywords={[bookmark.title ?? '', bookmark.url, ...tags]}
                  >
                    <div className="flex gap-2 items-start text-pimary-foreground w-full">
                      <CardFavicon
                        className="bg-background w-5 h-5"
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
                        <div className="mt-2 -ml-0.5 text-xs">
                          <TagBadge
                            className="!max-sm:max-w-[300px]"
                            avoidHover
                            data={bookmark as BookmarkModified}
                          />
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
            {!loading ? <CommandEmpty>No result.</CommandEmpty> : null}
          </CommandList>
          <CommandSeparator className="max-sm:hidden" />
          <div className="py-2 px-4 max-sm:hidden flex items-center justify-between bg-popover">
            <div>
              <span className="text-xs text-muted-foreground">Navigate</span>{' '}
              <kbd className="pointer-events-none text-primary/70 h-6 w-6 px-1 pb-0.5 text-base ml-1.5 border border-input inline-flex justify-center select-none items-center rounded-md font-mono">
                ↓
              </kbd>
              <kbd className="pointer-events-none text-primary/70 h-6 w-6 px-1 pb-0.5 text-base ml-2 border border-input inline-flex justify-center select-none items-center rounded-md font-mono">
                ↑
              </kbd>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Open with</span>{' '}
              <kbd className="pointer-events-none text-primary/70 h-6 w-6 px-1 pb-1 text-base ml-1.5 border border-input inline-flex justify-center select-none items-center rounded-md font-mono">
                ↵
              </kbd>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export default memo(SearchCommand);
