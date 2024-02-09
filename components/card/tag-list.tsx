'use client';

import { useEffect, useOptimistic, useState } from 'react';

import { CheckIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import { addTagToBookmark, createTag } from 'app/actions/tags';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'components/ui/command';

import { cn } from 'lib/utils';

import { BookmarkModified, Tag, TagInsert } from 'types/data';

type TagListProps = {
  data: BookmarkModified;
  tags: Tag[];
};

export default function TagList({ data, tags }: TagListProps) {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [optimisticData, setOptimisticData] =
    useOptimistic<BookmarkModified>(data);

  useEffect(() => {
    setOptimisticData(data);
  }, [data, setOptimisticData]);

  const onCreate = async () => {
    const payload = {
      name: searchText,
    } as TagInsert;

    try {
      setLoading(true);
      setOptimisticData(
        (prev) =>
          ({
            ...prev,
            bookmarks_tags: [...prev.bookmarks_tags, { tags: { ...payload } }],
          }) as BookmarkModified,
      );
      await createTag(data.id, payload);
      toast.success('Tag is added to bookmark.');
      setSearchText('');
    } catch (error) {
      setOptimisticData(
        (prev) =>
          ({
            ...prev,
            bookmarks_tags: prev.bookmarks_tags.filter(
              ({ tags: { name } }) => name !== payload.name,
            ),
          }) as BookmarkModified,
      );
      toast.error('Unable to create tag. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (tag: Tag, isChecked: boolean) => {
    try {
      setLoading(true);
      setOptimisticData(
        (prev) =>
          ({
            ...prev,
            bookmarks_tags: [...prev.bookmarks_tags, { tags: { ...tag } }],
          }) as BookmarkModified,
      );
      await addTagToBookmark(data.id, tag.id, isChecked);
    } catch {
      toast.error(`Unable to add/remove a tag. Try again.`);
      setOptimisticData(
        (prev) =>
          ({
            ...prev,
            bookmarks_tags: prev.bookmarks_tags.filter(
              ({ tags: { id } }) => id !== tag.id,
            ),
          }) as BookmarkModified,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Command>
      <CommandInput
        value={searchText}
        onValueChange={(value: string) => {
          setSearchText(value);
        }}
        placeholder="Create or Search tags"
      />
      <CommandList className="max-h-56 overflow-y-auto">
        {tags.length ? (
          <CommandGroup heading="All tags">
            {tags
              .sort((a: any, b: any) => a.name.localeCompare(b.name))
              .map((tag: Tag) => {
                const isChecked = Boolean(
                  optimisticData?.bookmarks_tags?.find(
                    ({ tags: { id } }) => id == tag.id,
                  ),
                );
                return (
                  <CommandItem
                    disabled={loading}
                    key={tag.id}
                    onSelect={async () => {
                      await onUpdate(tag, isChecked);
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-blue-600 dark:border-white',
                        isChecked
                          ? 'bg-blue-700 dark:bg-white text-primary-foreground'
                          : 'bg-background text-tranparent',
                      )}
                    >
                      {isChecked ? (
                        <CheckIcon className={cn('h-4 w-4')} />
                      ) : null}
                    </div>
                    <span>{tag.name}</span>
                  </CommandItem>
                );
              })}
          </CommandGroup>
        ) : (
          <div className="text-sm flex py-4 justify-center">No tags.</div>
        )}
      </CommandList>
      {searchText.length && !tags.find(({ name }) => name === searchText) ? (
        <CommandList>
          <CommandGroup heading="Click to create">
            <CommandItem
              disabled={loading}
              className="flex justify-between cursor-pointer"
              onSelect={async () => {
                await onCreate();
              }}
            >
              {searchText}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      ) : null}
    </Command>
  );
}
