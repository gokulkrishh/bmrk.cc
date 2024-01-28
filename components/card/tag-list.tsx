'use client';

import { useState } from 'react';

import { CheckIcon } from '@radix-ui/react-icons';
import { CommandList } from 'cmdk';
import { toast } from 'sonner';

import { addTagToBookmark, createTag } from 'app/actions/tags';

import Loader from 'components/loader';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'components/ui/command';

import { cn } from 'lib/utils';

import { Bookmark, BookmarkModifiedType, Tag, TagInsert } from 'types/data';

type TagListProps = {
  data: BookmarkModifiedType;
  tags: Tag[];
};

export default function TagList({ data, tags }: TagListProps) {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    const payload = {
      name: searchText,
    } as TagInsert;

    try {
      setLoading(true);
      await createTag(data.id, payload);
      toast.success('Tag is added to bookmark.');
      setSearchText('');
    } catch (error) {
      toast.error('Unable to create tag. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (id: Tag['id'], isChecked: boolean) => {
    try {
      setLoading(true);
      await addTagToBookmark(data.id, id, isChecked);
    } catch {
      toast.error(`Unable to add/remove tag. Try again.`);
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
            {tags.map((tag: Tag) => {
              const isChecked = Boolean(
                data.bookmarks_tags?.find(({ tags: { id } }) => id == tag.id)
              );
              return (
                <CommandItem
                  disabled={loading}
                  key={tag.id}
                  onSelect={async () => {
                    await onUpdate(tag.id, isChecked);
                  }}
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-blue-600',
                      isChecked
                        ? 'bg-blue-600 text-primary-foreground'
                        : 'bg-white text-tranparent'
                    )}
                  >
                    {isChecked ? <CheckIcon className={cn('h-4 w-4')} /> : null}
                  </div>
                  {tag.name}
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
