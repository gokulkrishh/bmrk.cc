import { useEffect, useState } from 'react';

import Link from 'next/link';

import { StarFilledIcon } from '@radix-ui/react-icons';
import { Command as CommandPrimitive } from 'cmdk';

import CardAvatar from 'components/card/avatar';
import { useBookmarks } from 'components/context/bookmarks';
import Loader from 'components/loader';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'components/ui/command';

import { Bookmark } from 'types/data';

type SearchCommandProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function SearchCommand({ open, setOpen }: SearchCommandProps) {
  const [search, setSearch] = useState('');
  const { bookmarks, loading } = useBookmarks();
  const [result, setResult] = useState<Bookmark[]>(bookmarks);

  useEffect(() => {
    setResult(bookmarks);
  }, [bookmarks]);

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
      <CommandInput
        value={search}
        onValueChange={onValueChange}
        placeholder="Search bookmarks"
      />
      <CommandList>
        {result.length === 0 && search.length ? (
          <CommandEmpty>No results found.</CommandEmpty>
        ) : null}
        <CommandGroup heading="All Bookmarks">
          {loading ? (
            <CommandPrimitive.Loading>
              <div className="flex justify-center mt-2 mb-6">
                <Loader />
              </div>
            </CommandPrimitive.Loading>
          ) : null}
          {result.map((bookmark: Bookmark) => (
            <CommandItem
              className="flex flex-col items-start w-full"
              onSelect={() => {
                openBookmark(bookmark.url);
              }}
              key={bookmark.id}
            >
              <Link
                className="flex gap-2 items-start text-black w-full"
                prefetch={false}
                target="_blank"
                rel="noopener"
                href={bookmark.url}
              >
                <CardAvatar
                  className="!w-4 !h-4 rounded-full bg-white"
                  url={bookmark.url}
                  title={bookmark.title ?? ''}
                />{' '}
                <div className="flex flex-col">
                  <p className="relative -top-0.5">{bookmark.title}</p>
                  <div className="text-xs flex items-center mt-0.5 text-neutral-600">
                    {bookmark.is_fav ? (
                      <StarFilledIcon className="!h-3 !w-3 -ml-1 text-yellow-500 mr-1" />
                    ) : null}
                    {new URL(bookmark.url)?.hostname?.replace('www.', '')}
                  </div>
                </div>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
