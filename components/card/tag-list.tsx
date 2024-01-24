import { useState } from 'react';

import { CheckIcon } from '@radix-ui/react-icons';
import { CommandList } from 'cmdk';
import { toast } from 'sonner';

import { addTagToBookmark } from 'app/actions/bookmarks';
import { createTag } from 'app/actions/tags';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'components/ui/command';

import { cn } from 'lib/utils';

import { Bookmark, Tag, TagInsert } from 'types/data';

type TagListProps = {
  data: Bookmark;
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
      const [tagData]: any = await createTag(payload);
      const tag_ids = [...(data.tag_ids ?? []), tagData.id];
      await addTagToBookmark(data.id, tag_ids);
      toast.success('Tag created and added to bookmark.');
      setSearchText('');
    } catch (error) {
      toast.error('Unable to create tag. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (id: Tag['id']) => {
    setLoading(true);
    let isChecked = null;
    const tag_ids = [...(data.tag_ids ?? [])];
    const index = tag_ids.indexOf(id);
    if (index > -1) {
      isChecked = true;
      tag_ids.splice(index, 1);
    } else {
      isChecked = false;
      tag_ids.push(id);
    }
    try {
      await addTagToBookmark(data.id, tag_ids);
      toast.success(`Tag is ${isChecked ? 'removed' : `added`}.`);
    } catch {
      toast.error(`Unable to ${isChecked ? 'remove' : `add tag`}. Try again.`);
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
        placeholder="Search tags"
      />
      <CommandList className="h-56 overflow-y-auto">
        <CommandGroup heading="All tags">
          {tags
            ?.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))
            ?.map((tag: Tag) => {
              const isChecked = data.tag_ids?.includes(tag.id);
              return (
                <CommandItem
                  disabled={loading}
                  key={tag.id}
                  onSelect={async () => {
                    await onUpdate(tag.id);
                  }}
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      isChecked
                        ? 'bg-primary text-primary-foreground'
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
      </CommandList>
      {searchText.length ? (
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
