import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Command as CommandPrimitive } from 'cmdk';
import { Bookmark } from 'types/data';

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
        <CommandGroup heading="Bookmarks">
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
              onClick={() => {
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
                  <span className="text-xs mt-0.5 text-neutral-500">
                    {new URL(bookmark.url)?.hostname?.replace('www.', '')}
                  </span>
                </div>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
