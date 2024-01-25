import { useMemo, useState } from 'react';

import { CheckIcon } from '@radix-ui/react-icons';
import { CommandList } from 'cmdk';
import { toast } from 'sonner';

import { addTagToBookmark, createTag } from 'app/actions/tags';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'components/ui/command';

import { groupByKey } from 'lib/data';
import { cn } from 'lib/utils';

import { Bookmark, BookmarkModified, Tag, TagInsert } from 'types/data';

type TagListProps = {
  data: BookmarkModified;
  tags: Tag[];
};

export default function TagList({ data, tags }: TagListProps) {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const groupByTagName = useMemo(() => groupByKey(tags, 'name'), [tags]);

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
    setLoading(true);

    try {
      await addTagToBookmark(data.id, id, isChecked);
      toast.success(`Tag is ${!isChecked ? 'removed' : `added`}.`);
    } catch {
      toast.error(`Unable to ${!isChecked ? 'remove' : `add tag`}. Try again.`);
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
              .sort((a: any, b: any) => a?.name?.localeCompare(b?.name))
              .map((tag: Tag) => {
                const isChecked = data?.bookmarks_tags?.includes(tag.id);
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
                      {isChecked ? (
                        <CheckIcon className={cn('h-4 w-4')} />
                      ) : null}
                    </div>
                    {tag.name}
                  </CommandItem>
                );
              })}
          </CommandGroup>
        ) : (
          <CommandItem className="text-sm flex justify-center">
            No data.
          </CommandItem>
        )}
      </CommandList>
      {searchText.length && !groupByTagName[searchText] ? (
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
