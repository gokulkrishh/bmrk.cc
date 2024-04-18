'use client';

import { startTransition, useEffect, useOptimistic, useState } from 'react';

import { toast } from 'sonner';

import { addTagToBookmark, createTag } from 'app/actions/tags';
import { incrementTagUsage } from 'app/actions/user';

import { useUser } from 'components/context/user';
import { CheckIcon } from 'components/icons';
import { PublicIconWithTooltip } from 'components/public-icon-with-tooltip';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'components/ui/command';

import { isBeforeTwoDay } from 'lib/date';
import { cn } from 'lib/utils';

import { BookmarkModified, Tag, TagInsert } from 'types/data';

type TagListProps = {
  data: BookmarkModified;
  tags: Tag[];
};

export default function TagList({ data, tags }: TagListProps) {
  const { user, currentPlan } = useUser();
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [optimisticData, setOptimisticData] =
    useOptimistic<BookmarkModified>(data);

  useEffect(() => {
    startTransition(() => setOptimisticData(data));
  }, [data, setOptimisticData]);

  const onCreate = async () => {
    const payload = {
      name: searchText,
    } as TagInsert;

    try {
      if (user?.usage.tags >= currentPlan.limit.tags) {
        toast.error(`Tag limit reached! Upgrade to create more.`);
        return;
      }
      setLoading(true);
      startTransition(() =>
        setOptimisticData(
          (prev) =>
            ({
              ...prev,
              bookmarks_tags: [
                ...prev.bookmarks_tags,
                { tags: { ...payload } },
              ],
            }) as BookmarkModified,
        ),
      );
      await incrementTagUsage();
      await createTag(data.id, payload);
      toast.success('Tag is added to bookmark.');
      setSearchText('');
    } catch (error) {
      startTransition(() =>
        setOptimisticData(
          (prev) =>
            ({
              ...prev,
              bookmarks_tags: prev.bookmarks_tags.filter(
                ({ tags: { name } }) => name !== payload.name,
              ),
            }) as BookmarkModified,
        ),
      );
      toast.error('Unable to create tag. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (tag: Tag, isChecked: boolean) => {
    try {
      setLoading(true);
      if (isChecked) {
        startTransition(() =>
          setOptimisticData(
            (prev) =>
              ({
                ...prev,
                bookmarks_tags: prev.bookmarks_tags.filter(
                  ({ tags: { id } }) => id !== tag.id,
                ),
              }) as BookmarkModified,
          ),
        );
      } else {
        startTransition(() =>
          setOptimisticData(
            (prev) =>
              ({
                ...prev,
                bookmarks_tags: [...prev.bookmarks_tags, { tags: { ...tag } }],
              }) as BookmarkModified,
          ),
        );
      }
      await addTagToBookmark(data.id, tag.id, isChecked);
    } catch {
      toast.error(`Unable to add/remove a tag. Try again.`);
      if (isChecked) {
        startTransition(() =>
          setOptimisticData(
            (prev) =>
              ({
                ...prev,
                bookmarks_tags: [...prev.bookmarks_tags, { tags: { ...tag } }],
              }) as BookmarkModified,
          ),
        );
      } else {
        startTransition(() =>
          setOptimisticData(
            (prev) =>
              ({
                ...prev,
                bookmarks_tags: prev.bookmarks_tags.filter(
                  ({ tags: { id } }) => id !== tag.id,
                ),
              }) as BookmarkModified,
          ),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const recentTagsMap = tags
    .filter(
      (tag: Tag) =>
        isBeforeTwoDay(new Date(tag.created_at)) ||
        isBeforeTwoDay(new Date(tag.updated_at)),
    )
    .slice(0, 2)
    .reduce(
      (acc, tag) => {
        if (!acc[tag.id]) {
          acc[tag.id] = tag;
        }
        return acc;
      },
      {} as Record<string, Tag>,
    );

  const recentTags = Object.values(recentTagsMap).sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );

  const otherTags = tags.filter((tag: Tag) => !recentTagsMap[tag.id]);

  return (
    <Command>
      <CommandInput
        value={searchText}
        onValueChange={setSearchText}
        placeholder="Create or Search tags"
      />

      <CommandList className="max-h-56 overflow-y-auto max-w-[250px] w-full">
        {recentTags.length ? (
          <CommandGroup heading="Recent tags">
            {recentTags.map((tag: Tag) => {
              const isChecked = Boolean(
                optimisticData?.bookmarks_tags?.find(
                  ({ tags: { id } }) => id == tag.id,
                ),
              );
              return (
                <CommandItem
                  key={tag.id}
                  onSelect={async () => {
                    await onUpdate(tag, isChecked);
                  }}
                  value={tag.name}
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
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CheckIcon className="h-4 w-4 text-transparent" />
                    )}
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span>{tag.name}</span>
                    {tag.shared ? (
                      <>
                        <PublicIconWithTooltip className="h-4 w-4" />
                        <span className="sr-only">Shared publically</span>
                      </>
                    ) : null}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ) : null}
      </CommandList>
      <CommandList className="max-h-56 overflow-y-auto max-w-[250px] w-full">
        {otherTags.length ? (
          <CommandGroup heading="All tags">
            {otherTags.map((tag: Tag) => {
              const isChecked = Boolean(
                optimisticData?.bookmarks_tags?.find(
                  ({ tags: { id } }) => id == tag.id,
                ),
              );
              return (
                <CommandItem
                  key={tag.id}
                  onSelect={async () => {
                    await onUpdate(tag, isChecked);
                  }}
                  value={tag.name}
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
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CheckIcon className="h-4 w-4 text-transparent" />
                    )}
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span>{tag.name}</span>
                    {tag.shared ? (
                      <>
                        <PublicIconWithTooltip className="h-4 w-4" />
                        <span className="sr-only">Shared publically</span>
                      </>
                    ) : null}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ) : !recentTags.length && !otherTags.length ? (
          <div className="text-sm flex py-4 justify-center">No tags.</div>
        ) : null}
      </CommandList>
      {searchText.length && !tags.find(({ name }) => name === searchText) ? (
        <CommandList>
          <CommandGroup heading="Click to create">
            <CommandItem
              className="flex justify-between cursor-pointer"
              onSelect={async () => {
                await onCreate();
              }}
              value={searchText}
            >
              {searchText}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      ) : null}
    </Command>
  );
}
